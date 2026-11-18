// RoninUO - motor de la web: pinta el menu, las paginas, las noticias, el plan,
// la columna lateral y los relojes, y cambia de pagina con el #ancla.
(function () {
  "use strict";

  var MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

  // Iconos
  var ICONO_DISCORD = '<svg class="ico-dc" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';
  var BANDERAS = {
    es: '<svg class="bandera" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/></svg>',
    ar: '<svg class="bandera" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#74ACDF"/><rect y="6.67" width="30" height="6.66" fill="#fff"/><circle cx="15" cy="10" r="2.3" fill="#F6B40E" stroke="#85340A" stroke-width=".4"/></svg>',
    cl: '<svg class="bandera" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#D52B1E"/><rect width="30" height="10" fill="#fff"/><rect width="10" height="10" fill="#0039A6"/><path fill="#fff" d="M5 2.2l.67 2.06h2.17l-1.75 1.27.67 2.06L5 6.32 3.24 7.59l.67-2.06-1.75-1.27h2.17z"/></svg>'
  };

  // Siluetas para los relojes
  var SILUETAS = {
    iberia: '<svg class="silueta" viewBox="0 0 40 34" aria-hidden="true"><path fill="currentColor" d="M2 6 8 3.5 18 5 26 6 30 7 34.5 9 36.5 12 33 16 31 20 30 23 28 26 25 29 17 31.5 14 30 12 27 6 28.5 3 24 4 18 2 12Z"/></svg>',
    sudamerica: '<svg class="silueta" viewBox="0 0 30 40" aria-hidden="true"><path fill="currentColor" d="M8 2 16 1 22 4 28 10 29.5 15 25 20 22 24 19 27 16 32 14 37 12 39.5 10 35 9 28 8 20 5 13 3 9 5 5Z"/></svg>'
  };

  // Iconos del menu (trazo, toman el color del texto)
  function ico(d) { return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; }
  var ICONOS = {
    "inicio": ico('<path d="M3 5.5c6 1.3 12 1.3 18 0M4.5 9h15M7 6.4V21M17 6.4V21M12 9v3.5"/>'),
    "como-jugar": ico('<path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z"/>'),
    "solicitud": ico('<path d="M15 4l5 5-9 9H6v-5z"/><path d="M4 20l2-2M13 6l5 5"/>'),
    "mundo": ico('<path d="M2 20l7-12 4 6 2.5-3L22 20z"/><path d="M8 8.5l1-2 1 2M17 4.5a2 2 0 1 0 0 .1"/>'),
    "caminos": ico('<circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M9.5 9.5l5 0-2.5 5z"/>'),
    "skills": ico('<path d="M20 4L8.5 15.5M5 19l2.5-2.5M6.5 14l3.5 3.5M4 20l1-1"/>'),
    "honor": ico('<circle cx="12" cy="12" r="9"/><path d="M12 6l3 6-3 6-3-6z"/>'),
    "vida": ico('<path d="M12 2v2M9 4h6M8 7c-2 3-2 8 0 11h8c2-3 2-8 0-11z"/><path d="M8 7h8M7.5 12.5h9M9 18v2h6v-2"/>'),
    "galeria": ico('<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 16l5-5 4 4 3-3 6 6"/><circle cx="16" cy="9" r="1.5"/>'),
    "reglas": ico('<path d="M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6zM6 3a2 2 0 0 0-2 2v1h2M6 21a2 2 0 0 1-2-2v-1h2"/><path d="M9 8h7M9 12h7M9 16h4"/>'),
    "descargas": ico('<path d="M12 3v12M7 10l5 5 5-5M4 17v3h16v-3"/>'),
    "desarrollo": ico('<path d="M14 4l6 6-3 3-6-6zM11 7l-8 8 3 3 8-8M3 21h8"/>')
  };

  function $(id) { return document.getElementById(id); }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  function fechaTexto(iso) {
    var p = iso.split("-");
    return parseInt(p[2], 10) + " " + MESES[parseInt(p[1], 10) - 1] + " " + p[0];
  }

  // ---------------------------------------------------------------- Menu
  function pintarMenu() {
    $("menu-lista").innerHTML = MENU.map(function (m) {
      return '<li><a href="#' + m.id + '">' + (ICONOS[m.id] || "") + '<span>' + m.texto + '</span></a></li>';
    }).join("");
  }

  // ---------------------------------------------------------------- Paginas
  function pintarPaginas() {
    var html = "";
    // las del menu y, detras, las que no salen en el (como #staff)
    var ids = MENU.map(function (m) { return m.id; });
    Object.keys(PAGINAS).forEach(function (k) { if (ids.indexOf(k) < 0) ids.push(k); });
    ids.forEach(function (id) {
      if (PAGINAS[id] === undefined) return;
      html += '<div data-page="' + id + '"' + (id === "inicio" ? "" : " hidden") + ">" + PAGINAS[id] + "</div>\n";
    });
    $("contenido").innerHTML = html;
    // los enlaces al Discord de las paginas salen de CONFIG
    Array.prototype.forEach.call(document.querySelectorAll('a[href*="discord.gg"]'), function (a) {
      a.href = CONFIG.discord;
    });
  }

  function pintarNoticias() {
    var caja = $("noticias");
    if (!caja) return;
    caja.innerHTML = NOTICIAS.map(function (n) {
      return '<article><time datetime="' + n.fecha + '">' + fechaTexto(n.fecha) +
        '<span class="tag">' + n.etiqueta + '</span></time><h3>' + n.titulo + '</h3><p>' + n.texto + '</p></article>';
    }).join("\n");
  }

  // Indice del proximo hito (primer paso no hecho)
  function hitoActual() {
    for (var i = 0; i < PLAN.length; i++) if (PLAN[i].estado !== "Hecho") return i;
    return PLAN.length - 1;
  }

  function pintarPlan() {
    var caja = $("plan");
    if (!caja) return;
    var h = hitoActual();
    caja.innerHTML = PLAN.map(function (p, i) {
      return '<li><span>' + p.texto + '</span><span class="st' + (i === h ? " now" : "") + '">' + p.estado + '</span></li>';
    }).join("");
  }

  // ---------------------------------------------------------------- Lateral
  function pintarLateral() {
    var e = CONFIG.estado;
    var h = hitoActual();
    var total = PLAN.length - 1;            // el primer paso (diseno) no cuenta como fase
    var fase = Math.max(h, 1);
    var pct = Math.round(((fase - 0.5) / total) * 100);
    $("lateral").innerHTML =
      '<div class="box"><div class="box-h">Capturas<span aria-hidden="true">写真</span></div>' +
        '<div class="box-b" id="capturas-lateral"><div class="cap-vacia">Cargando capturas…</div></div></div>' +
      '<div class="box"><div class="box-h">Ping estimado<span aria-hidden="true">通信</span></div><div class="box-b">' +
        '<ul class="ping">' + CONFIG.ping.map(function (p) {
          return '<li>' + BANDERAS[p.bandera] + '<span>' + p.nombre + '</span><b>' + p.ms + ' ms</b></li>';
        }).join("") + '</ul><span class="muted">Orientativo: servidor en España.</span></div></div>' +
      '<div class="box"><div class="box-h">Estado del servidor<span aria-hidden="true">状態</span></div><div class="box-b">' +
        '<div class="state-big' + (e.abierto ? " abierto" : "") + '"><span class="dot" aria-hidden="true"></span>' + e.texto + '</div>' +
        '<dl class="kv"><dt>Fase</dt><dd>' + e.fase + '</dd><dt>Edición</dt><dd>' + e.edicion + '</dd>' +
        '<dt>Apertura</dt><dd>' + e.apertura + '</dd><dt>Motor</dt><dd>' + e.motor + '</dd></dl></div></div>' +
      '<div class="box"><div class="box-h">Próximo hito<span aria-hidden="true">次</span></div><div class="box-b">' +
        '<b>' + PLAN[h].texto + '</b>' +
        '<div class="bar" role="img" aria-label="Fase ' + fase + ' de ' + total + '"><i style="width:' + pct + '%"></i></div>' +
        '<span class="muted">Fase ' + fase + ' de ' + total + ' · <a href="#desarrollo">ver el plan</a></span></div></div>' +
      '<div class="box"><div class="box-h">Comunidad<span aria-hidden="true">仲間</span></div><div class="box-b">' +
        '<p>Sigue el desarrollo, propón ideas y apúntate a las pruebas cerradas.</p>' +
        '<a class="btn primary btn-dc" href="' + CONFIG.discord + '" target="_blank" rel="noopener">' + ICONO_DISCORD + 'Entrar en el Discord</a></div></div>' +
      '<div class="box"><div class="box-h">Enlaces rápidos<span aria-hidden="true">道標</span></div><div class="box-b"><ul class="qlinks">' +
        '<li><a href="#como-jugar">Cómo empezar</a></li><li><a href="#caminos">Los ocho caminos</a></li>' +
        '<li><a href="#skills">Las 42 skills</a></li><li><a href="#honor">Escala de honor</a></li>' +
        '<li><a href="#reglas">Reglas (borrador)</a></li></ul></div></div>';
  }

  function pintarCabecera() {
    var e = CONFIG.estado;
    $("estado-cab").innerHTML = '<span class="dot" aria-hidden="true"></span>Servidor ' + e.texto.toLowerCase() + ' · ' + e.fase.toLowerCase();
    $("estado-cab").classList.toggle("abierto", !!e.abierto);
    var dc = $("discord-cab");
    dc.href = CONFIG.discord;
    dc.innerHTML = ICONO_DISCORD;
  }

  // ---------------------------------------------------------------- Relojes
  var formatos = CONFIG.relojes.map(function (r) {
    return {
      hora: new Intl.DateTimeFormat("es-ES", { timeZone: r.zona, hour: "2-digit", minute: "2-digit", hour12: false }),
      dia: new Intl.DateTimeFormat("es-ES", { timeZone: r.zona, weekday: "short", day: "numeric", month: "short" })
    };
  });

  function pintarRelojes() {
    // Cabecera: una silueta por region y sus horas (ES 11:04 | AR 07:04 CL 07:04)
    var grupos = [];
    CONFIG.relojes.forEach(function (r, i) {
      var g = grupos.length && grupos[grupos.length - 1].silueta === r.silueta ? grupos[grupos.length - 1] : null;
      if (!g) { g = { silueta: r.silueta, horas: [] }; grupos.push(g); }
      g.horas.push('<span title="Hora de ' + r.nombre + '"><span class="reloj-cod">' + r.corto + '</span> <time data-reloj="' + i + '" data-tipo="hora"></time></span>');
    });
    $("relojes-cab").innerHTML = grupos.map(function (g) {
      return '<span class="reloj">' + SILUETAS[g.silueta] + g.horas.join("") + '</span>';
    }).join("");
    var lat = $("relojes-lateral");
    if (lat) {
      lat.innerHTML = CONFIG.relojes.map(function (r, i) {
        return '<div class="reloj-fila">' + SILUETAS[r.silueta] + '<span class="reloj-nom">' + r.nombre +
          '<small data-reloj="' + i + '" data-tipo="dia"></small></span><time data-reloj="' + i + '" data-tipo="hora"></time></div>';
      }).join("");
    }
    tic();
    setInterval(tic, 15000);
  }

  function tic() {
    var ahora = new Date();
    Array.prototype.forEach.call(document.querySelectorAll("[data-reloj]"), function (el) {
      var f = formatos[+el.getAttribute("data-reloj")];
      el.textContent = f[el.getAttribute("data-tipo")].format(ahora);
    });
  }

  // ---------------------------------------------------------------- Navegacion
  function navegacion() {
    var pages = Array.prototype.slice.call(document.querySelectorAll("[data-page]"));
    var links = Array.prototype.slice.call(document.querySelectorAll("nav.main a"));
    var nav = $("menu");
    var btn = $("menu-btn");
    function show(scroll) {
      var id = (location.hash || "").replace("#", "");
      var found = pages.some(function (p) { return p.getAttribute("data-page") === id; });
      if (!found) id = "inicio";
      pages.forEach(function (p) { p.hidden = p.getAttribute("data-page") !== id; });
      links.forEach(function (a) {
        if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      if (scroll) window.scrollTo(0, 0);
    }
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    window.addEventListener("hashchange", function () { show(true); });
    show(false);
  }

  // ---------------------------------------------------------------- Galeria
  // galeria/capturas.json lo escribe la Action "Galeria desde Discord" con las
  // capturas que el staff aprueba en el canal de capturas.
  var CAPTURAS = [];
  var ICONO_FOTO = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 16l5-5 4 4 3-3 6 6"/><circle cx="16" cy="9" r="1.5"/></svg>';

  function textoVacio() {
    return '<div class="cap-vacia">' + ICONO_FOTO + '<span>Aún no hay capturas. Sube las tuyas al canal de capturas del Discord: el staff elige las mejores para la web.</span>' +
      '<a class="btn primary btn-dc" href="' + CONFIG.discord + '" target="_blank" rel="noopener">' + ICONO_DISCORD + 'Ir al Discord</a></div>';
  }

  function pintarCapturasLateral() {
    var caja = $("capturas-lateral");
    if (!caja) return;
    if (!CAPTURAS.length) { caja.innerHTML = textoVacio(); return; }
    var lista = CAPTURAS.slice(0, 6), i = 0, temporizador;
    caja.innerHTML = '<a class="cap-marco" href="#galeria" aria-label="Ver la galería"><img id="cap-img" alt=""></a>' +
      '<div class="cap-pie" aria-live="polite"><b id="cap-autor"></b><span id="cap-texto"></span></div>' +
      '<div class="cap-nav"><div class="cap-puntos">' + lista.map(function (c, n) {
        return '<button type="button" data-n="' + n + '" aria-label="Captura ' + (n + 1) + '"></button>';
      }).join("") + '</div><a href="#galeria">Ver todas ›</a></div>';
    var img = $("cap-img");
    function ver(n) {
      i = (n + lista.length) % lista.length;
      var c = lista[i];
      img.classList.add("cambia");
      setTimeout(function () {
        img.src = c.mini; img.alt = "Captura de " + c.autor + (c.texto ? ": " + c.texto : "");
        img.classList.remove("cambia");
      }, 180);
      $("cap-autor").textContent = c.autor;
      $("cap-texto").textContent = c.texto || fechaTexto(c.fecha);
      Array.prototype.forEach.call(caja.querySelectorAll(".cap-puntos button"), function (b, k) {
        b.setAttribute("aria-current", k === i ? "true" : "false");
      });
    }
    function siguiente() { ver(i + 1); }
    function arrancar() {
      clearInterval(temporizador);
      if (lista.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) temporizador = setInterval(siguiente, 6000);
    }
    caja.querySelector(".cap-puntos").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      ver(+b.getAttribute("data-n")); arrancar();
    });
    ver(0); arrancar();
  }

  function pintarGaleria() {
    var caja = $("galeria-rejilla");
    if (!caja) return;
    if (!CAPTURAS.length) { caja.innerHTML = textoVacio(); return; }
    caja.className = "gal-rejilla";
    caja.innerHTML = CAPTURAS.map(function (c, n) {
      return '<button type="button" data-n="' + n + '"><span class="cap-marco"><img loading="lazy" src="' + esc(c.mini) + '" alt="Captura de ' + esc(c.autor) + '"></span>' +
        '<b>' + esc(c.autor) + '</b><small>' + fechaTexto(c.fecha) + (c.texto ? " · " + esc(c.texto) : "") + '</small></button>';
    }).join("");
    var dlg = $("gal-ver"), actual = 0;
    function abrir(n) {
      actual = (n + CAPTURAS.length) % CAPTURAS.length;
      var c = CAPTURAS[actual];
      $("gal-img").src = c.img; $("gal-img").alt = "Captura de " + c.autor;
      $("gal-pie").innerHTML = '<span><b>' + esc(c.autor) + '</b> · ' + fechaTexto(c.fecha) + (c.texto ? '<br>' + esc(c.texto) : "") + '</span>';
      if (!dlg.open) dlg.showModal();
    }
    caja.addEventListener("click", function (e) { var b = e.target.closest("button[data-n]"); if (b) abrir(+b.getAttribute("data-n")); });
    $("gal-ant").addEventListener("click", function () { abrir(actual - 1); });
    $("gal-sig").addEventListener("click", function () { abrir(actual + 1); });
    $("gal-cerrar").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") abrir(actual - 1);
      if (e.key === "ArrowRight") abrir(actual + 1);
    });
  }

  function cargarCapturas() {
    // cambia cada 10 minutos para no quedarse con una copia vieja
    fetch("galeria/capturas.json?t=" + Math.floor(Date.now() / 600000))
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; })
      .then(function (lista) {
        CAPTURAS = Array.isArray(lista) ? lista : [];
        pintarCapturasLateral();
        pintarGaleria();
      });
  }

  pintarMenu();
  pintarPaginas();
  pintarNoticias();
  pintarPlan();
  pintarCabecera();
  pintarLateral();
  pintarRelojes();
  navegacion();
  cargarCapturas();
})();
