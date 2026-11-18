// RoninUO - publica en Discord las noticias nuevas de js/datos.js.
//
// Lo lanza la Action .github/workflows/noticias-discord.yml en cada push que
// cambie js/datos.js. Compara la lista NOTICIAS de ahora con la del push
// anterior y manda a Discord (webhook) solo las que no estaban. Editar una
// noticia ya publicada no la vuelve a mandar.
//
// Uso: node noticias_discord.js <datos.js actual> [<datos.js anterior>]
//   Variables: DISCORD_WEBHOOK (la URL del webhook; sin ella solo lo enseña),
//              WEB_URL (por defecto https://roninuo.github.io/)
"use strict";
const fs = require("fs");
const vm = require("vm");

const WEB = process.env.WEB_URL || "https://roninuo.github.io/";
const WEBHOOK = process.env.DISCORD_WEBHOOK || "";
const COLOR = 0xb8371f; // rojo bermellon de la web

// Colores por etiqueta (si no esta, el rojo)
const COLORES = {
  "Diario de desarrollo": 0xb8371f,
  "Anuncio": 0xd4a017,
  "Lore": 0x3b5b7a,
  "Comunidad": 0x4a7a3b,
};

function leerNoticias(ruta) {
  if (!ruta || !fs.existsSync(ruta)) return [];
  const codigo = fs.readFileSync(ruta, "utf8");
  const ctx = {};
  try {
    vm.runInNewContext(codigo + "\n;this.__n = (typeof NOTICIAS !== 'undefined') ? NOTICIAS : [];", ctx, { timeout: 2000 });
  } catch (e) {
    console.error("No se pudo leer", ruta, "-", e.message);
    return null;
  }
  return Array.isArray(ctx.__n) ? ctx.__n : [];
}

const clave = (n) => `${n.fecha}|${(n.titulo || "").trim().toLowerCase()}`;

// El texto de la web admite HTML: lo pasamos al formato de Discord
function aDiscord(html) {
  let t = String(html || "");
  t = t.replace(/<a\s[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gis, (_, url, txt) => {
    const abs = /^https?:/i.test(url) ? url : new URL(url, WEB).href;
    return `[${txt}](${abs})`;
  });
  t = t.replace(/<\/?(strong|b)>/gi, "**").replace(/<\/?(em|i)>/gi, "*");
  t = t.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>\s*<p[^>]*>/gi, "\n\n");
  t = t.replace(/<[^>]+>/g, "");
  t = t.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<")
       .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return t.length > 4000 ? t.slice(0, 3990) + "…" : t;
}

function mensaje(n) {
  const fecha = /^\d{4}-\d{2}-\d{2}$/.test(n.fecha) ? `${n.fecha}T12:00:00.000Z` : undefined;
  return {
    username: "RoninUO",
    embeds: [{
      title: n.titulo,
      url: WEB,
      description: aDiscord(n.texto),
      color: COLORES[n.etiqueta] || COLOR,
      footer: { text: `${n.etiqueta || "Noticias"} · roninuo.github.io` },
      timestamp: fecha,
    }],
  };
}

async function enviar(cuerpo) {
  for (let intento = 0; intento < 3; intento++) {
    const r = await fetch(WEBHOOK + (WEBHOOK.includes("?") ? "&" : "?") + "wait=true", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    });
    if (r.ok) return;
    if (r.status === 429) { // demasiado rapido: Discord dice cuanto esperar
      const j = await r.json().catch(() => ({}));
      await new Promise((ok) => setTimeout(ok, Math.ceil((j.retry_after || 2) * 1000)));
      continue;
    }
    throw new Error(`Discord respondio ${r.status}: ${await r.text()}`);
  }
  throw new Error("Discord no acepto el mensaje tras 3 intentos");
}

async function main() {
  const [actual, anterior] = process.argv.slice(2);
  const ahora = leerNoticias(actual);
  const antes = leerNoticias(anterior);
  if (ahora === null || antes === null) process.exit(1);
  if (!anterior) {
    console.log("Sin version anterior: no se publica nada (para no repetir todas las noticias).");
    return;
  }
  const vistas = new Set(antes.map(clave));
  // en datos.js la primera es la mas reciente: se publican de la mas antigua a la mas nueva
  const nuevas = ahora.filter((n) => !vistas.has(clave(n))).reverse();
  if (!nuevas.length) { console.log("No hay noticias nuevas."); return; }
  for (const n of nuevas) {
    const cuerpo = mensaje(n);
    if (!WEBHOOK) {
      console.log("[sin DISCORD_WEBHOOK, no se envia]\n" + JSON.stringify(cuerpo, null, 2));
      continue;
    }
    await enviar(cuerpo);
    console.log("Publicada en Discord:", n.titulo);
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); });
