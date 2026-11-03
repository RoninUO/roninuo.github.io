// RoninUO - solicitud de cuenta (ficha de personaje) y revision del staff,
// con Supabase. Se entra con Discord. Paginas #solicitud y #staff.
// La seguridad la pone la base de datos (tools/supabase/esquema.sql): la web
// solo pinta y envia.
(function () {
  "use strict";

  var SB_URL = "https://kyrvbgtotzxehldqrbpd.supabase.co";
  var SB_KEY = "sb_publishable_hGYdrlhAlw3OMiDEMCO1Zw_pNvp9QnE";
  var LIBS = [
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/dist/umd/supabase.min.js",
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.4/dist/umd/supabase.min.js"
  ];
  var ESTADOS = {
    pendiente: "Pendiente de revisión",
    cambios: "El staff pide cambios",
    aprobada: "Aprobada",
    rechazada: "Rechazada"
  };
  var CONSTITUCION = ["Delgada", "Enjuta", "Normal", "Fibrosa", "Fuerte", "Robusta", "Corpulenta"];
  var sb = null, sesion = null, miFicha = null, editando = false;
  var staffFiltro = "pendiente", staffSel = null;

  function $(id) { return document.getElementById(id); }
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function guarda(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function lee(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function fecha(iso) { return iso ? new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }) : ""; }
  function nombreDiscord(u) {
    var m = (u && u.user_metadata) || {};
    return (m.custom_claims && m.custom_claims.global_name) || m.full_name || m.name || "";
  }
  function aviso(caja, texto, malo) {
    caja.innerHTML = '<p class="cu-aviso' + (malo ? " malo" : "") + '">' + esc(texto) + "</p>";
  }

  // ------------------------------------------------------------ arranque
  function cargarLib(i) {
    if (i >= LIBS.length) { pintarTodo("Sin conexión con el registro. Prueba a recargar la página."); return; }
    var s = document.createElement("script");
    s.src = LIBS[i];
    s.onload = iniciar;
    s.onerror = function () { cargarLib(i + 1); };
    document.head.appendChild(s);
  }

  function iniciar() {
    sb = window.supabase.createClient(SB_URL, SB_KEY, {
      auth: { flowType: "pkce", detectSessionInUrl: true, persistSession: true }
    });
    sb.auth.onAuthStateChange(function (ev, s) {
      var antes = sesion && sesion.user ? sesion.user.id : null;
      var ahora = s && s.user ? s.user.id : null;
      sesion = s;
      // vuelta del login de Discord: limpiar ?code= y volver a la pagina
      if (location.search.indexOf("code=") >= 0) {
        var volver = lee("rn_volver") || "solicitud";
        guarda("rn_volver", null);
        history.replaceState(null, "", location.pathname + "#" + volver);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
      // Al volver a la pestana Supabase renueva el token y avisa: si sigue siendo
      // la misma persona no se repinta (se borraba lo que estaba escribiendo).
      if (antes === ahora && ev !== "INITIAL_SESSION") return;
      pintarTodo();
    });
    sb.auth.getSession().then(function (r) { sesion = r.data.session; pintarTodo(); });
  }

  function entrar(volver) {
    guarda("rn_volver", volver);
    sb.auth.signInWithOAuth({ provider: "discord", options: { redirectTo: location.origin + location.pathname } });
  }
  function salir() { sb.auth.signOut().then(function () { miFicha = null; pintarTodo(); }); }

  function cabeceraSesion() {
    return '<div class="cu-sesion"><span>Conectado como <b>' + esc(nombreDiscord(sesion.user)) + '</b></span>' +
      '<button class="btn" type="button" data-cu="salir">Salir</button></div>';
  }
  function botonEntrar(volver) {
    return '<button class="btn primary btn-dc" type="button" data-cu="entrar" data-volver="' + volver + '">Entrar con Discord</button>';
  }

  function pintarTodo(error) {
    var a = $("cu-solicitud"), b = $("cu-staff");
    if (error) { if (a) aviso(a, error, true); if (b) aviso(b, error, true); return; }
    if (a) pintarSolicitud(a);
    if (b) pintarStaff(b);
  }

  // ------------------------------------------------------------ jugador
  function pintarSolicitud(caja) {
    if (!sesion) {
      caja.innerHTML = '<p>Entra con tu cuenta de Discord para rellenar la ficha. Solo se usa tu nombre de Discord, para que el staff pueda escribirte.</p>' + botonEntrar("solicitud");
      return;
    }
    caja.innerHTML = cabeceraSesion() + '<p class="muted">Cargando tu ficha…</p>';
    sb.from("solicitudes").select("*").eq("user_id", sesion.user.id).maybeSingle().then(function (r) {
      if (r.error) { aviso(caja, "No se pudo leer tu ficha: " + r.error.message, true); return; }
      miFicha = r.data;
      if (!miFicha || editando) pintarFormulario(caja, editando === "nueva" ? { id: miFicha.id, cuenta_deseada: miFicha.cuenta_deseada, nueva: true } : miFicha);
      else pintarEstado(caja, miFicha);
    });
  }

  function pintarEstado(caja, f) {
    var editable = f.estado === "pendiente" || f.estado === "cambios";
    var html = cabeceraSesion() +
      '<div class="cu-estado est-' + f.estado + '"><span class="cu-etq">' + esc(ESTADOS[f.estado]) + "</span>" +
      "<h3>" + esc(f.nombre) + (f.apellido ? " " + esc(f.apellido) : "") + "</h3>" +
      '<p class="muted">Enviada el ' + fecha(f.creada) + (f.actualizada !== f.creada ? " · última edición " + fecha(f.actualizada) : "") + "</p>";
    if (f.nota_staff) html += '<p class="cu-nota"><b>El staff dice:</b> ' + esc(f.nota_staff) + "</p>";
    if (f.estado === "aprobada") html += '<div class="cu-credenciales"><span>Cuenta</span><b>' + esc(f.cuenta || f.cuenta_deseada) + "</b><span>Contraseña</span><b>" + esc(f.cuenta_clave || "te la enviamos por Discord") + "</b></div>" +
      "<p>No se la des a nadie: el staff nunca te la pedirá. Descarga el lanzador y nos vemos en el templo de Hoshikawa-mura.</p>";
    else if (f.cuenta_deseada) html += '<p class="muted">Cuenta pedida: <b>' + esc(f.cuenta_deseada) + "</b></p>";
    if (f.estado === "pendiente") html += "<p>El staff la leerá en cuanto pueda. Mientras tanto puedes corregirla.</p>";
    if (f.estado === "rechazada") html += '<p>Si quieres hablarlo, abre un ticket en el <a href="' + esc(CONFIG.discord) + '" target="_blank" rel="noopener">Discord</a>.</p>';
    if (editable) html += '<button class="btn primary" type="button" data-cu="editar">Editar la ficha</button>';
    if (f.estado === "rechazada") html += '<p>Puedes presentar otro personaje con una ficha nueva.</p><button class="btn primary" type="button" data-cu="nueva">Hacer una ficha nueva</button>';
    caja.innerHTML = html + "</div>";
  }

  function campo(id, et, html, ayuda) {
    return '<div class="cu-campo"><label for="' + id + '">' + et + "</label>" + html + (ayuda ? '<small class="muted">' + ayuda + "</small>" : "") + "</div>";
  }

  function pintarFormulario(caja, f) {
    f = f || {};
    var cons = CONSTITUCION.map(function (c) { return "<option" + (f.constitucion === c ? " selected" : "") + ">" + c + "</option>"; }).join("");
    caja.innerHTML = cabeceraSesion() +
      '<form id="cu-form" class="cu-form" novalidate>' +
      '<fieldset><legend>Tu cuenta del juego</legend>' +
      campo("cu-cuentadeseada", "Nombre de cuenta *", '<input id="cu-cuentadeseada" maxlength="16" autocomplete="off" value="' + esc(f.cuenta_deseada) + '">',
        "Con el que entrarás en el lanzador: de 3 a 16 letras o números, sin espacios. No tiene por qué parecerse al del personaje. La contraseña te la damos nosotros al aprobar la ficha.") +
      "</fieldset>" +
      '<fieldset><legend>Quién es</legend>' +
      campo("cu-nombre", "Nombre del personaje *", '<input id="cu-nombre" maxlength="24" required value="' + esc(f.nombre) + '">',
        'Japonés y de la época, sin tildes (así se escribe en el juego). Ideas en el <a href="#como-jugar">generador de nombres</a>.') +
      campo("cu-apellido", "Apellido", '<input id="cu-apellido" maxlength="30" value="' + esc(f.apellido) + '">',
        "Opcional. La gente común no tiene: se la conoce por su aldea. Un apellido de familia hay que justificarlo en la historia.") +
      campo("cu-linaje", "Linaje", '<textarea id="cu-linaje" rows="2" maxlength="600">' + esc(f.linaje) + "</textarea>",
        "Opcional. Por ejemplo, descendiente de una casa samurái caída. Es solo rol: lo aprueba el staff y no da ventajas.") +
      "</fieldset>" +
      '<fieldset><legend>Cómo es</legend><div class="cu-fila">' +
      campo("cu-sexo", "Sexo", '<select id="cu-sexo"><option value="">—</option><option value="hombre"' + (f.sexo === "hombre" ? " selected" : "") + '>Hombre</option><option value="mujer"' + (f.sexo === "mujer" ? " selected" : "") + ">Mujer</option></select>") +
      campo("cu-edad", "Edad", '<input id="cu-edad" type="number" min="14" max="90" value="' + esc(f.edad) + '">') +
      campo("cu-altura", "Altura", '<input id="cu-altura" maxlength="40" placeholder="Ej.: alto para su gente" value="' + esc(f.altura) + '">') +
      campo("cu-constitucion", "Constitución", '<select id="cu-constitucion"><option value="">—</option>' + cons + "</select>") +
      "</div>" +
      campo("cu-aspecto", "Aspecto", '<textarea id="cu-aspecto" rows="2" maxlength="800">' + esc(f.aspecto) + "</textarea>", "Rasgos, cicatrices, cómo viste, cómo habla.") +
      campo("cu-rasgos", "Virtudes, defectos y momentos que le marcaron", '<textarea id="cu-rasgos" rows="4" maxlength="2000">' + esc(f.rasgos) + "</textarea>",
        "Texto libre. Ej.: se cayó al río de niño y le teme al agua; leal hasta la terquedad.") +
      "</fieldset>" +
      '<fieldset><legend>Su historia</legend>' +
      campo("cu-historia", "Historia *", '<textarea id="cu-historia" rows="9" maxlength="8000" required>' + esc(f.historia) + "</textarea>",
        'Entre 200 y 8000 caracteres. De dónde viene, qué dejó atrás y por qué llega a Haibara. <span id="cu-cuenta">0</span> caracteres.') +
      campo("cu-avatar", "Retrato (opcional)", '<input id="cu-avatar" type="file" accept="image/png,image/jpeg,image/webp">',
        "PNG, JPG o WEBP, hasta 2 MB." + (f.avatar ? " Ya tienes uno; sube otro solo si quieres cambiarlo." : "")) +
      "</fieldset>" +
      '<label class="cu-check"><input id="cu-normas" type="checkbox"' + (f.id && !f.nueva ? " checked" : "") + '> He leído las <a href="#reglas">normas</a> y las acepto. *</label>' +
      '<div class="cu-acciones"><button class="btn primary" type="submit">' + (f.id && !f.nueva ? "Guardar cambios" : "Enviar la ficha") + "</button>" +
      (f.id ? '<button class="btn" type="button" data-cu="cancelar">Cancelar</button>' : "") + "</div>" +
      '<div id="cu-msg" aria-live="polite"></div></form>';
    var h = $("cu-historia"), n = $("cu-cuenta");
    var cuenta = function () { n.textContent = h.value.length; };
    h.addEventListener("input", cuenta); cuenta();
    $("cu-form").addEventListener("submit", enviar);
    // borrador: lo escrito se guarda en este navegador hasta enviar la ficha
    var clave = "rn_borrador_" + sesion.user.id;
    var b = null;
    try { b = JSON.parse(lee(clave) || "null"); } catch (e) { b = null; }
    if (b && (!f.id || f.nueva)) {
      Object.keys(b).forEach(function (id) {
        var el = $(id);
        if (!el || el.type === "file") return;
        if (el.type === "checkbox") el.checked = !!b[id]; else el.value = b[id];
      });
      cuenta();
    }
    $("cu-form").addEventListener("input", function () {
      var d = {};
      Array.prototype.forEach.call($("cu-form").querySelectorAll("input, textarea, select"), function (el) {
        if (!el.id || el.type === "file") return;
        d[el.id] = el.type === "checkbox" ? el.checked : el.value;
      });
      guarda(clave, JSON.stringify(d));
    });
  }

  function enviar(ev) {
    ev.preventDefault();
    var msg = $("cu-msg");
    var v = function (id) { return $(id).value.trim(); };
    var nombre = v("cu-nombre"), historia = v("cu-historia");
    var cuentaDeseada = v("cu-cuentadeseada");
    if (!/^[A-Za-z0-9]{3,16}$/.test(cuentaDeseada)) return aviso(msg, "El nombre de cuenta debe tener de 3 a 16 letras o números, sin espacios.", true);
    if (!/^[A-Za-z][A-Za-z' -]{2,23}$/.test(nombre)) return aviso(msg, "El nombre debe tener entre 3 y 24 letras, sin tildes ni números.", true);
    if (historia.length < 200) return aviso(msg, "La historia necesita al menos 200 caracteres.", true);
    if (!$("cu-normas").checked) return aviso(msg, "Tienes que aceptar las normas.", true);
    var archivo = $("cu-avatar").files[0];
    if (archivo && archivo.size > 2097152) return aviso(msg, "El retrato pasa de 2 MB.", true);
    var datos = {
      cuenta_deseada: cuentaDeseada,
      nombre: nombre,
      apellido: v("cu-apellido") || null,
      linaje: v("cu-linaje") || null,
      sexo: v("cu-sexo") || null,
      edad: v("cu-edad") ? parseInt(v("cu-edad"), 10) : null,
      altura: v("cu-altura") || null,
      constitucion: v("cu-constitucion") || null,
      aspecto: v("cu-aspecto") || null,
      rasgos: v("cu-rasgos") || null,
      historia: historia
    };
    if (editando === "nueva") datos.avatar = null;   // ficha nueva: el retrato viejo no vale
    aviso(msg, "Enviando…");
    var uid = sesion.user.id;
    var paso = Promise.resolve();
    if (archivo) {
      var ext = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" }[archivo.type] || "png";
      var ruta = uid + "/retrato." + ext;
      paso = sb.storage.from("avatares").upload(ruta, archivo, { upsert: true, contentType: archivo.type }).then(function (r) {
        if (r.error) throw r.error;
        datos.avatar = ruta;
      });
    }
    paso.then(function () {
      return miFicha ? sb.from("solicitudes").update(datos).eq("id", miFicha.id) : sb.from("solicitudes").insert(datos);
    }).then(function (r) {
      if (r.error) throw r.error;
      editando = false;
      guarda("rn_borrador_" + uid, null);
      pintarTodo();
    }).catch(function (e) {
      var m = e.message || String(e);
      if (m.indexOf("cuenta_deseada_unica") >= 0) m = "Ese nombre de cuenta ya lo ha pedido otra persona. Elige otro.";
      aviso(msg, "No se pudo enviar: " + m, true);
    });
  }

  // ------------------------------------------------------------ staff
  function pintarStaff(caja) {
    if (!sesion) { caja.innerHTML = "<p>Solo para el staff.</p>" + botonEntrar("staff"); return; }
    caja.innerHTML = cabeceraSesion() + '<p class="muted">Comprobando permisos…</p>';
    sb.rpc("es_staff").then(function (r) {
      if (r.error) { aviso(caja, "Error: " + r.error.message, true); return; }
      if (!r.data) {
        caja.innerHTML = cabeceraSesion() + "<p>Esta cuenta no es del staff. Si deberías serlo, pásale este identificador a quien administra Supabase:</p><p><code>" + esc(sesion.user.id) + "</code></p>";
        return;
      }
      if (staffSel) pintarFichaStaff(caja, staffSel); else pintarListaStaff(caja);
    });
  }

  function pintarListaStaff(caja) {
    var filtros = ["pendiente", "cambios", "aprobada", "rechazada", "todas"].map(function (e) {
      return '<button type="button" class="cu-filtro" aria-pressed="' + (staffFiltro === e) + '" data-cu="filtro" data-f="' + e + '">' + (e === "todas" ? "Todas" : ESTADOS[e]) + "</button>";
    }).join("");
    caja.innerHTML = cabeceraSesion() + '<div class="cu-filtros">' + filtros + '</div><div id="cu-lista"><p class="muted">Cargando…</p></div>';
    var q = sb.from("solicitudes").select("id,nombre,apellido,discord,estado,creada,actualizada").order("actualizada", { ascending: false });
    if (staffFiltro !== "todas") q = q.eq("estado", staffFiltro);
    q.then(function (r) {
      var l = $("cu-lista");
      if (r.error) return aviso(l, r.error.message, true);
      if (!r.data.length) { l.innerHTML = '<p class="muted">No hay solicitudes aquí.</p>'; return; }
      l.innerHTML = '<table class="cu-tabla"><thead><tr><th>Personaje</th><th>Discord</th><th>Estado</th><th>Actualizada</th></tr></thead><tbody>' +
        r.data.map(function (f) {
          return '<tr><td><button type="button" class="cu-link" data-cu="ver" data-id="' + f.id + '">' + esc(f.nombre) + (f.apellido ? " " + esc(f.apellido) : "") +
            "</button></td><td>" + esc(f.discord) + '</td><td><span class="cu-etq est-' + f.estado + '">' + esc(ESTADOS[f.estado]) + "</span></td><td>" + fecha(f.actualizada) + "</td></tr>";
        }).join("") + "</tbody></table>";
    });
  }

  function pintarFichaStaff(caja, id) {
    caja.innerHTML = cabeceraSesion() + '<p class="muted">Cargando…</p>';
    sb.from("solicitudes").select("*").eq("id", id).single().then(function (r) {
      if (r.error) return aviso(caja, r.error.message, true);
      var f = r.data;
      var fila = function (et, v) { return v ? "<dt>" + et + "</dt><dd>" + esc(v) + "</dd>" : ""; };
      var opts = ["pendiente", "cambios", "aprobada", "rechazada"].map(function (e) {
        return '<option value="' + e + '"' + (f.estado === e ? " selected" : "") + ">" + ESTADOS[e] + "</option>";
      }).join("");
      caja.innerHTML = cabeceraSesion() +
        '<button type="button" class="btn" data-cu="volver">← Volver a la lista</button>' +
        '<div class="cu-ficha"><div class="cu-retrato" id="cu-retrato">' + (f.avatar ? "" : '<span class="muted">Sin retrato</span>') + "</div><div>" +
        "<h3>" + esc(f.nombre) + (f.apellido ? " " + esc(f.apellido) : "") + "</h3>" +
        '<dl class="kv cu-kv">' + fila("Discord", f.discord + (f.discord_id ? " (" + f.discord_id + ")" : "")) + fila("Cuenta pedida", f.cuenta_deseada) + fila("Sexo", f.sexo) + fila("Edad", f.edad) +
        fila("Altura", f.altura) + fila("Constitución", f.constitucion) + fila("Enviada", fecha(f.creada)) + fila("Revisada", fecha(f.revisada)) + "</dl></div></div>" +
        (f.linaje ? "<h4>Linaje</h4><p>" + esc(f.linaje) + "</p>" : "") +
        (f.aspecto ? "<h4>Aspecto</h4><p>" + esc(f.aspecto) + "</p>" : "") +
        (f.rasgos ? "<h4>Virtudes, defectos y momentos</h4><p>" + esc(f.rasgos) + "</p>" : "") +
        '<h4>Historia</h4><p class="cu-historia">' + esc(f.historia) + "</p>" +
        '<form id="cu-revisar" class="cu-form"><fieldset><legend>Decisión del staff</legend><div class="cu-fila">' +
        campo("cu-estado", "Estado", '<select id="cu-estado">' + opts + "</select>") +
        campo("cu-cuentajuego", "Cuenta del juego", '<input id="cu-cuentajuego" value="' + esc(f.cuenta || f.cuenta_deseada) + '">') +
        campo("cu-clave", "Contraseña", '<div class="cu-clave"><input id="cu-clave" value="' + esc(f.cuenta_clave) + '"><button type="button" class="btn" data-cu="generar">Generar</button></div>') +
        "</div>" +
        '<div class="cu-comando"><span class="muted">Al aprobar, en el juego:</span> <code id="cu-cmd"></code> <button type="button" class="btn" data-cu="copiar">Copiar</button></div>' + campo("cu-notastaff", "Nota para el jugador", '<textarea id="cu-notastaff" rows="3">' + esc(f.nota_staff) + "</textarea>", "La verá en su ficha. Úsala para pedir cambios o explicar un rechazo.") +
        '</fieldset><div class="cu-acciones"><button class="btn primary" type="submit">Guardar decisión</button></div><div id="cu-msg2" aria-live="polite"></div></form>';
      if (f.avatar) sb.storage.from("avatares").createSignedUrl(f.avatar, 3600).then(function (u) {
        if (u.data) $("cu-retrato").innerHTML = '<img src="' + esc(u.data.signedUrl) + '" alt="Retrato de ' + esc(f.nombre) + '">';
      });
      var cmd = function () { $("cu-cmd").textContent = ".rncuenta " + $("cu-cuentajuego").value.trim() + " " + $("cu-clave").value.trim(); };
      $("cu-cuentajuego").addEventListener("input", cmd);
      $("cu-clave").addEventListener("input", cmd);
      if (!$("cu-clave").value) $("cu-clave").value = claveNueva();
      cmd();
      $("cu-revisar").addEventListener("submit", function (ev) {
        ev.preventDefault();
        sb.from("solicitudes").update({
          estado: $("cu-estado").value,
          cuenta: $("cu-cuentajuego").value.trim() || null,
          cuenta_clave: $("cu-clave").value.trim() || null,
          nota_staff: $("cu-notastaff").value.trim() || null
        }).eq("id", f.id).then(function (r2) {
          if (r2.error) return aviso($("cu-msg2"), r2.error.message, true);
          aviso($("cu-msg2"), "Guardado.");
        });
      });
    });
  }

  // Contrasena al azar: solo letras, sin las que se confunden (l, I, O, o)
  function claveNueva() {
    var c = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", r = new Uint32Array(10), t = "";
    crypto.getRandomValues(r);
    for (var i = 0; i < r.length; i++) t += c.charAt(r[i] % c.length);
    return t;
  }

  // ------------------------------------------------------------ clics
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-cu]");
    if (!b || !sb) return;
    var a = b.getAttribute("data-cu");
    if (a === "entrar") entrar(b.getAttribute("data-volver"));
    else if (a === "salir") salir();
    else if (a === "editar") { editando = true; pintarTodo(); }
    else if (a === "nueva") { editando = "nueva"; pintarTodo(); }
    else if (a === "cancelar") { editando = false; pintarTodo(); }
    else if (a === "filtro") { staffFiltro = b.getAttribute("data-f"); staffSel = null; pintarTodo(); }
    else if (a === "ver") { staffSel = b.getAttribute("data-id"); pintarTodo(); window.scrollTo(0, 0); }
    else if (a === "volver") { staffSel = null; pintarTodo(); }
    else if (a === "generar") { $("cu-clave").value = claveNueva(); $("cu-clave").dispatchEvent(new Event("input")); }
    else if (a === "copiar") {
      var t = $("cu-cmd").textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { b.textContent = "Copiado"; setTimeout(function () { b.textContent = "Copiar"; }, 1500); });
    }
  });

  if ($("cu-solicitud") || $("cu-staff")) cargarLib(0);
})();
