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

  function $(id) { return document.getElementById(id); }

  function fechaTexto(iso) {
    var p = iso.split("-");
    return parseInt(p[2], 10) + " " + MESES[parseInt(p[1], 10) - 1] + " " + p[0];
  }

  // ---------------------------------------------------------------- Menu
  function pintarMenu() {
    $("menu-lista").innerHTML = MENU.map(function (m) {
      return '<li><a href="#' + m.id + '">' + m.texto + '</a></li>';
    }).join("");
  }

  // ---------------------------------------------------------------- Paginas
  function pintarPaginas() {
    var html = "";
    MENU.forEach(function (m) {
      if (PAGINAS[m.id] === undefined) return;
      html += '<div data-page="' + m.id + '"' + (m.id === "inicio" ? "" : " hidden") + ">" + PAGINAS[m.id] + "</div>\n";
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
      '<div class="box"><div class="box-h">Hora en el mundo<span aria-hidden="true">時刻</span></div>' +
        '<div class="box-b"><div class="relojes" id="relojes-lateral"></div></div></div>' +
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
    var cab = CONFIG.relojes.map(function (r, i) {
      return '<span class="reloj" title="Hora de ' + r.nombre + '">' + BANDERAS[r.bandera] +
        '<span class="sr">' + r.nombre + ' </span><time data-reloj="' + i + '" data-tipo="hora"></time></span>';
    }).join("");
    $("relojes-cab").innerHTML = cab;
    var lat = $("relojes-lateral");
    if (lat) {
      lat.innerHTML = CONFIG.relojes.map(function (r, i) {
        return '<div class="reloj-fila">' + BANDERAS[r.bandera] + '<span class="reloj-nom">' + r.nombre +
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

  pintarMenu();
  pintarPaginas();
  pintarNoticias();
  pintarPlan();
  pintarCabecera();
  pintarLateral();
  pintarRelojes();
  navegacion();
})();
