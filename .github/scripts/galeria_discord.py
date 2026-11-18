#!/usr/bin/env python3
"""RoninUO - galeria de capturas: Discord -> web.

Lee el canal de capturas de Discord y publica en la web las imagenes que
alguien del staff ha aprobado con la reaccion de aprobar (por defecto ✅).

  - Copia cada imagen aprobada a galeria/img/<id>.webp (max. 1600 px) y una
    miniatura a galeria/mini/<id>.webp (480 px): los enlaces de Discord caducan.
  - Escribe galeria/capturas.json (la mas nueva primero), que lee la web.
  - Si el staff quita su ✅ o se borra el mensaje, la captura sale de la web.
  - Pone 🌸 en el mensaje cuando la captura ya esta en la web.

Variables (secretos de GitHub):
  DISCORD_BOT_TOKEN        token del bot
  DISCORD_CANAL_CAPTURAS   id del canal de capturas
  DISCORD_ROL_STAFF        id del rol del staff (quien puede aprobar)
Opcionales: EMOJI_APROBAR (✅), EMOJI_PUBLICADA (🌸), DISCORD_API (para pruebas)

Uso: python3 galeria_discord.py <carpeta de la web>
"""
import io
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

from PIL import Image, ImageOps

API = os.environ.get("DISCORD_API", "https://discord.com/api/v10").rstrip("/")
TOKEN = os.environ.get("DISCORD_BOT_TOKEN", "")
CANAL = os.environ.get("DISCORD_CANAL_CAPTURAS", "")
ROL_STAFF = os.environ.get("DISCORD_ROL_STAFF", "")
APROBAR = os.environ.get("EMOJI_APROBAR", "✅")
PUBLICADA = os.environ.get("EMOJI_PUBLICADA", "🌸")
MAX_MENSAJES = 2000          # cuantos mensajes del canal se revisan como mucho
LADO_GRANDE, LADO_MINI = 1600, 480
TIPOS = (".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp")
UA = "DiscordBot (https://roninuo.github.io, 1.0) RoninUO-galeria"


def api(metodo, ruta, datos=None):
    url = API + ruta
    for _ in range(5):
        req = urllib.request.Request(url, method=metodo, headers={
            "Authorization": "Bot " + TOKEN, "User-Agent": UA,
            "Content-Type": "application/json"})
        if datos is not None:
            req.data = json.dumps(datos).encode()
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                cuerpo = r.read()
                return json.loads(cuerpo) if cuerpo else None
        except urllib.error.HTTPError as e:
            if e.code == 429:  # Discord pide esperar
                try:
                    espera = float(json.loads(e.read()).get("retry_after", 1))
                except Exception:
                    espera = 1.0
                time.sleep(espera + 0.2)
                continue
            if e.code == 404:
                return None
            raise RuntimeError(f"Discord {metodo} {ruta}: {e.code} {e.read()[:200]!r}")
    raise RuntimeError(f"Discord {metodo} {ruta}: demasiados reintentos")


def mensajes(canal):
    todos, antes = [], None
    while len(todos) < MAX_MENSAJES:
        q = "?limit=100" + (f"&before={antes}" if antes else "")
        lote = api("GET", f"/channels/{canal}/messages{q}") or []
        if not lote:
            break
        todos += lote
        antes = lote[-1]["id"]
        if len(lote) < 100:
            break
    return todos


_staff = {}


def es_staff(guild, usuario):
    if usuario not in _staff:
        m = api("GET", f"/guilds/{guild}/members/{usuario}")
        _staff[usuario] = bool(m) and ROL_STAFF in (m.get("roles") or [])
    return _staff[usuario]


def aprobada(guild, msg):
    if not any(r.get("emoji", {}).get("name") == APROBAR for r in msg.get("reactions") or []):
        return False
    emo = urllib.parse.quote(APROBAR)
    usuarios = api("GET", f"/channels/{CANAL}/messages/{msg['id']}/reactions/{emo}?limit=100") or []
    return any(es_staff(guild, u["id"]) for u in usuarios)


_nombres = {}


def nombre_autor(guild, autor):
    """El apodo en el servidor (suele ser el nombre del personaje) o su nombre de Discord."""
    uid = autor["id"]
    if uid not in _nombres:
        m = api("GET", f"/guilds/{guild}/members/{uid}") or {}
        _nombres[uid] = m.get("nick") or autor.get("global_name") or autor.get("username") or "Anónimo"
    return _nombres[uid]


def limpiar_texto(t):
    t = re.sub(r"<a?:\w+:\d+>", "", t or "")          # emojis propios del servidor
    t = re.sub(r"<[@#][!&]?\d+>", "", t)              # menciones
    t = re.sub(r"https?://\S+", "", t)                # enlaces
    t = re.sub(r"[*_~`|>]+", "", t)                   # formato de Discord
    t = re.sub(r"\s+", " ", t).strip()
    return t[:280]


def bajar(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def guardar(datos, destino, lado):
    im = Image.open(io.BytesIO(datos))
    im = ImageOps.exif_transpose(im)
    if getattr(im, "is_animated", False):
        im.seek(0)
    im = im.convert("RGB")
    im.thumbnail((lado, lado), Image.LANCZOS)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    im.save(destino, "WEBP", quality=82, method=6)
    return im.size


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    if not (TOKEN and CANAL and ROL_STAFF):
        print("Faltan DISCORD_BOT_TOKEN, DISCORD_CANAL_CAPTURAS o DISCORD_ROL_STAFF: no se hace nada.")
        return
    web = sys.argv[1]
    carpeta = os.path.join(web, "galeria")
    ruta_json = os.path.join(carpeta, "capturas.json")
    try:
        antes = {c["id"]: c for c in json.load(open(ruta_json, encoding="utf-8"))}
    except (FileNotFoundError, ValueError):
        antes = {}

    canal = api("GET", f"/channels/{CANAL}")
    if not canal:
        sys.exit("No encuentro el canal de capturas (¿id correcto? ¿el bot puede verlo?)")
    guild = canal["guild_id"]

    nuevas, lista = 0, []
    for msg in mensajes(CANAL):
        imgs = [a for a in msg.get("attachments") or []
                if (a.get("content_type") or "").startswith("image/")
                or a.get("filename", "").lower().endswith(TIPOS)]
        if not imgs or not aprobada(guild, msg):
            continue
        for a in imgs:
            cid = a["id"]
            if cid in antes and os.path.exists(os.path.join(web, antes[cid]["img"])):
                lista.append(antes[cid])
                continue
            datos = bajar(a["url"])
            img = f"galeria/img/{cid}.webp"
            mini = f"galeria/mini/{cid}.webp"
            w, h = guardar(datos, os.path.join(web, img), LADO_GRANDE)
            guardar(datos, os.path.join(web, mini), LADO_MINI)
            lista.append({
                "id": cid,
                "mensaje": msg["id"],
                "fecha": msg["timestamp"][:10],
                "autor": nombre_autor(guild, msg["author"]),
                "texto": limpiar_texto(msg.get("content")),
                "img": img, "mini": mini, "ancho": w, "alto": h,
            })
            nuevas += 1
            print("Nueva:", cid, "de", lista[-1]["autor"])
        # aviso en Discord de que ya esta en la web
        if not any(r.get("emoji", {}).get("name") == PUBLICADA and r.get("me")
                   for r in msg.get("reactions") or []):
            try:
                api("PUT", f"/channels/{CANAL}/messages/{msg['id']}/reactions/"
                    f"{urllib.parse.quote(PUBLICADA)}/@me")
            except RuntimeError as e:
                print("No pude poner la reaccion de publicada:", e)

    # las que ya no estan aprobadas (o se borraron) salen de la web
    quedan = {c["id"] for c in lista}
    quitadas = 0
    for cid, c in antes.items():
        if cid not in quedan:
            for k in ("img", "mini"):
                try:
                    os.remove(os.path.join(web, c[k]))
                except FileNotFoundError:
                    pass
            quitadas += 1
            print("Quitada:", cid)
            try:  # fuera la 🌸 (si el mensaje se borro, no pasa nada)
                api("DELETE", f"/channels/{CANAL}/messages/{c['mensaje']}/reactions/"
                    f"{urllib.parse.quote(PUBLICADA)}/@me")
            except RuntimeError as e:
                print("No pude quitar la reaccion de publicada:", e)

    lista.sort(key=lambda c: (c["fecha"], int(c["mensaje"])), reverse=True)
    os.makedirs(carpeta, exist_ok=True)
    with open(ruta_json, "w", encoding="utf-8") as f:
        json.dump(lista, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"Galeria: {len(lista)} capturas ({nuevas} nuevas, {quitadas} quitadas).")


if __name__ == "__main__":
    main()
