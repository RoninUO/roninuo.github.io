// RoninUO - paginas de la web. Cada pagina es una plantilla HTML que app.js
// mete en <main>. Las noticias, el plan de desarrollo, el estado del servidor,
// el Discord y los relojes salen de datos.js.
var PAGINAS = {
  "inicio": `    <div class="panel">
      <div class="hero">
        <svg class="logo" viewBox="0 0 240 262" role="img" aria-label="Logotipo de RoninUO">
          <use href="#mark" x="20" y="0" width="200" height="200" style="color: var(--ink)"/>
          <rect class="seal" x="196" y="14" width="30" height="46" rx="2"/>
          <text class="sealtx" x="211" y="34" font-size="15" text-anchor="middle">浪</text>
          <text class="sealtx" x="211" y="53" font-size="15" text-anchor="middle">人</text>
          <text class="word" x="120" y="246" font-size="40" letter-spacing="5" text-anchor="middle">RONIN<tspan class="uo" font-size="24" dx="4" letter-spacing="1">UO</tspan></text>
        </svg>
        <div>
          <h1>Crónicas del Honor</h1>
          <p class="sub">Ecos del Sol Naciente <small>I Edición</small></p>
          <p class="lead">Un servidor de rol de Ultima Online en un Japón feudal con yokai, clanes en tregua y extranjeros llegados por mar. Llegas sin señor y sin nombre. Lo que seas después depende de tu honor.</p>
          <div class="btns">
            <a class="btn primary" href="#como-jugar">Cómo empezar</a>
            <a class="btn" href="#mundo">Conoce el mundo</a>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-h"><h2>Noticias</h2><span class="kj" aria-hidden="true">便り</span></div>
      <div class="panel-b news" id="noticias">
      </div>
    </div>

    <div class="panel">
      <div class="panel-h"><h2>Las islas de Hinokage</h2><span class="kj" aria-hidden="true">世界</span></div>
      <div class="panel-b preview">
        <svg class="map" viewBox="0 0 440 400" role="img" aria-label="Esquema del archipiélago: Kurogane al norte, Haibara en el centro, Shirasagi al sur, Akabane y el puerto Nanban al este">
          <path class="isle" d="M70 50C150 18 260 22 318 50C372 78 382 140 366 196C396 246 392 318 344 356C292 394 196 394 132 368C70 342 42 284 58 230C34 170 30 96 70 50Z"/>
          <path class="z1" d="M80 60C150 34 256 38 310 60C342 78 352 108 348 132L84 132C66 108 64 84 80 60Z"/>
          <path class="z2" d="M64 238C56 280 92 340 150 360C204 378 252 376 282 360L274 268C214 274 120 266 64 238Z"/>
          <path class="z3" d="M330 150C368 178 380 236 372 286C364 320 340 346 308 356L290 268C312 236 320 192 312 156Z"/>
          <ellipse class="neutral" cx="200" cy="198" rx="88" ry="58"/>
          <path class="volcano" d="M186 196 L200 170 L214 196 Z"/>
          <path class="crack" d="M160 184l7 5l-5 5l7 5M240 186l-7 5l5 5l-7 5"/>
          <text class="big" x="216" y="100" text-anchor="middle">Kurogane</text>
          <text class="big" x="200" y="222" text-anchor="middle">Haibara</text>
          <text x="200" y="240" text-anchor="middle">empiezas aquí</text>
          <text class="big" x="178" y="314" text-anchor="middle">Shirasagi</text>
          <text class="big" x="342" y="244" text-anchor="middle">Akabane</text>
          <circle class="port" cx="380" cy="300" r="6"/>
          <path class="sea" d="M386 306 C404 322 414 336 420 352"/>
          <rect class="closed" x="352" y="356" width="80" height="34" rx="4"/>
          <text x="392" y="378" text-anchor="middle">Nanban</text>
          <text class="q" x="40" y="214" text-anchor="middle">?</text>
        </svg>
        <div class="lore">
          <p>Un archipiélago nacido, dicen, de una lágrima del sol. Hace diez años el volcán sagrado despertó, murió el último Shōgun (señor militar supremo) sin heredero y de las grietas empezaron a salir yokai (criaturas sobrenaturales).</p>
          <p>Hoy tres clanes se vigilan bajo la Tregua del Arroz, y tú llegas a Haibara (llanura de ceniza), la tierra de nadie del centro.</p>
          <div class="btns"><a class="btn" href="#mundo">Leer la historia</a></div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-h"><h2>Elige a quién servir</h2><span class="kj" aria-hidden="true">氏族</span></div>
      <div class="panel-b">
        <div class="mons">
          <a href="#mundo"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" style="stroke:var(--ai)" stroke-width="2"/><path d="M12 30 L22 12 L32 30 Z" style="fill:var(--ai)"/></svg><b>Kurogane</b><small>hierro negro</small></a>
          <a href="#mundo"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" style="stroke:var(--kin)" stroke-width="2"/><path d="M10 26 Q22 8 34 26 Q22 20 10 26 Z" style="fill:var(--kin)"/></svg><b>Shirasagi</b><small>garza blanca</small></a>
          <a href="#mundo"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" style="stroke:var(--shu)" stroke-width="2"/><path d="M22 8 C30 16 30 28 22 36 C24 26 20 18 22 8 Z" style="fill:var(--shu)"/></svg><b>Akabane</b><small>pluma roja</small></a>
          <a href="#mundo"><svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" style="stroke:var(--muted)" stroke-width="2" stroke-dasharray="4 4"/><text x="22" y="29" text-anchor="middle" font-size="20" style="fill:var(--muted)" font-family="serif">?</text></svg><b>Ryu shinobi</b><small>clan ninja</small></a>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-h"><h2>Un año en Hinokage</h2><span class="kj" aria-hidden="true">四季</span></div>
      <div class="panel-b">
        <div class="kstrip">
          <div><span class="k" aria-hidden="true">春</span><b>Haru</b><small>primavera · siembra</small></div>
          <div><span class="k" aria-hidden="true">夏</span><b>Natsu</b><small>verano · lluvias</small></div>
          <div><span class="k" aria-hidden="true">秋</span><b>Aki</b><small>otoño · cosecha</small></div>
          <div><span class="k" aria-hidden="true">冬</span><b>Fuyu</b><small>invierno · año nuevo</small></div>
        </div>
        <p class="muted">Cada estación dura mes y medio real. <a href="#vida">Ver la vida en Hinokage</a></p>
      </div>
    </div>

    <div class="panel">
      <div class="panel-h"><h2>¿Por qué RoninUO?</h2><span class="kj" aria-hidden="true">理由</span></div>
      <div class="panel-b grid3">
        <div class="feature"><h3>Rol de verdad</h3><p>Nadie elige clase al crear el personaje: el camino se gana por rol, ante un maestro.</p></div>
        <div class="feature"><h3>El honor importa</h3><p>Abre tutores, ascensos y técnicas secretas. Perderlo te cierra puertas y te convierte en ronin.</p></div>
        <div class="feature"><h3>Todos se necesitan</h3><p>Nadie puede hacerlo todo. Una casa necesita cuatro oficios; una katana, al herrero y al carpintero.</p></div>
        <div class="feature"><h3>Un mundo vivo</h3><p>Estaciones, cosechas, tributo de arroz, hambrunas y festivales que cambian la vida de las islas.</p></div>
        <div class="feature"><h3>Yokai y misterio</h3><p>Criaturas que salen de las grietas del volcán, zonas selladas y un mundo de espíritus por descubrir.</p></div>
        <div class="feature"><h3>Combate con consecuencias</h3><p>No hay muertes absurdas, pero cada derrota deja heridas que alguien tiene que curar.</p></div>
      </div>
    </div>
`,
  "como-jugar": `    <div class="panel">
      <div class="panel-h"><h2>Cómo jugar</h2><span class="kj" aria-hidden="true">始め</span></div>
      <div class="panel-b">
        <p class="draft">El servidor aún no está abierto. Estos son los pasos que seguirás cuando abra.</p>
        <ol class="steps">
          <li><div><b>Descarga el lanzador</b><span class="muted">Desde la sección <a href="#descargas">Descargas</a>. Instala el juego con el arte japonés y lo mantiene al día. Es la única forma de entrar en RoninUO.</span></div></li>
          <li><div><b>Crea tu personaje</b><span class="muted">Piensa su nombre (japonés y de la época; más abajo tienes ideas), de dónde viene y una historia breve. El staff la lee y la aprueba antes de que entres.</span></div></li>
          <li><div><b>Crea tu cuenta</b><span class="muted">Abre un ticket en el <a href="https://discord.gg/KMvqtdeKM" target="_blank" rel="noopener">Discord</a> con tus datos, el nombre del personaje y su historia. Cada cuenta tiene un solo personaje, y no se puede borrar desde el juego: solo se retira con seppuku (suicidio ritual).</span></div></li>
          <li><div><b>Llega a Haibara</b><span class="muted">Despiertas en el templo de Hoshikawa-mura (aldea del río de las estrellas), en Haibara (llanura de ceniza), sin ropa y sin nada. Un monje anciano te recibe, te cuenta lo que pasa en las islas y te pregunta tu nombre, de dónde vienes y quién eras. Después te da ropa, algo de comida y unos mon (monedas de cobre), y sales por la puerta del templo.</span></div></li>
          <li><div><b>Busca tu camino</b><span class="muted">Empiezas como Heimin (gente común). Tai (cuerpo), Gi (técnica) y Shin (mente) suben entrenando, hasta 225 entre las tres y 125 en cada una; con las flechas de cada una decides cuál sube, cuál cede puntos y cuál se queda fija. Trabaja, aprende con tutores, gana honor y pide a un maestro que te acepte. Ningún clan te espera: tendrás que ganártelo.</span></div></li>
        </ol>
      </div>
    </div>
    <div class="panel" id="nombres">
      <div class="panel-h"><h2>Ideas de nombre</h2><span class="kj" aria-hidden="true">名</span></div>
      <div class="panel-b">
        <p>Sugerencias según el camino que quieras seguir. Cada propuesta lleva sus kanji y su significado. Pulsa una tira para copiar el nombre tal como se escribe en el juego, sin tildes.</p>
        <div class="nb-grupo"><span class="nb-et" id="nb-et-clase">Camino</span><div class="nb-opciones" id="nb-clases" role="group" aria-labelledby="nb-et-clase"></div></div>
        <div class="nb-grupo"><span class="nb-et" id="nb-et-sexo">Sexo</span><div class="nb-opciones" id="nb-sexos" role="group" aria-labelledby="nb-et-sexo"></div></div>
        <div class="nb-fila"><p class="muted" id="nb-regla"></p><button class="btn primary" id="nb-generar" type="button">Otros nombres</button></div>
        <div class="nb-tiras" id="nb-tiras" aria-live="polite" aria-label="Nombres propuestos"></div>
        <h3 class="nb-h">Cómo se llamaba la gente</h3>
        <ul class="nb-leyenda">
          <li>El apellido va delante del nombre: Kuroki Hyōgo es Hyōgo, de la casa Kuroki.</li>
          <li>La gente corriente no tenía apellido oficial: se la conocía por su aldea (Gonbei de Kawaguchi) o por el nombre de su tienda.</li>
          <li>Los comerciantes usaban el nombre de la casa, terminado en -ya (tienda), delante del suyo: Kameya Denbei.</li>
          <li>A una mujer del pueblo se la llamaba con o- delante, por cortesía: O-Kiku.</li>
          <li>Los Yamabushi (monjes de montaña) toman un nombre budista y suelen añadir -bō (celda del monje).</li>
          <li>Los Biwa hoshi (bardos ciegos) llevaban nombres terminados en -ichi.</li>
          <li>Un Shinobi (ninja) tiene un alias para su ryu (clan) y una tapadera para el mundo; en el juego se le ve con la tapadera.</li>
        </ul>
      </div>
    </div>
`,
  "mundo": `    <div class="panel">
      <div class="panel-h"><h2>Las islas de Hinokage</h2><span class="kj" aria-hidden="true">世界</span></div>
      <div class="panel-b">
        <p class="lead">Hinokage (sombra del sol) es un archipiélago inspirado en el Japón feudal. Durante trescientos años vivió en paz bajo un Shōgun (señor militar supremo). Hace diez años todo ardió.</p>
        <div class="world">
          <div class="lore">
            <p><b>La lágrima del sol</b>Cuando Amaterasu (diosa del sol) se encerró en su cueva, lloró una sola lágrima. Cayó al mar, se enfrió y fue tierra. Por eso aquí el velo entre los vivos y el mundo oculto es fino, y los kami (dioses), los muertos y los yokai (criaturas sobrenaturales) caminan cerca.</p>
            <p><b>Homusubi, el corazón de fuego</b>En el centro de las islas duerme Homura-yama (la montaña de la llama), y dentro, Homusubi (el que hace nacer el fuego). Dormido, su ceniza hace la tierra fértil. Despierto, lo quema todo.</p>
            <p><b>Takamori y las Cuatro Casas</b>Hace trescientos años, Takamori subió solo a la boca del volcán, pactó con el kami y bajó con el pelo blanco. Unió las islas y fue el primer Shōgun. Le juraron lealtad Kurogane, Shirasagi, Akabane y una cuarta casa cuyo nombre ya nadie pronuncia.</p>
            <p><b>Los Tres Tesoros</b>La espada del sol, el espejo de sombra y la joya del alba. Quien reúna los tres será Shōgun. Hoy nadie sabe dónde están.</p>
          </div>
          <svg class="map" viewBox="0 0 440 400" role="img" aria-label="Esquema del archipiélago: Kurogane al norte, Haibara en el centro, Shirasagi al sur, Akabane y el puerto Nanban al este">
            <path class="isle" d="M70 50C150 18 260 22 318 50C372 78 382 140 366 196C396 246 392 318 344 356C292 394 196 394 132 368C70 342 42 284 58 230C34 170 30 96 70 50Z"/>
            <path class="z1" d="M80 60C150 34 256 38 310 60C342 78 352 108 348 132L84 132C66 108 64 84 80 60Z"/>
            <path class="z2" d="M64 238C56 280 92 340 150 360C204 378 252 376 282 360L274 268C214 274 120 266 64 238Z"/>
            <path class="z3" d="M330 150C368 178 380 236 372 286C364 320 340 346 308 356L290 268C312 236 320 192 312 156Z"/>
            <ellipse class="neutral" cx="200" cy="198" rx="88" ry="58"/>
            <path class="volcano" d="M186 196 L200 170 L214 196 Z"/>
            <path class="crack" d="M160 184l7 5l-5 5l7 5M240 186l-7 5l5 5l-7 5"/>
            <text class="big" x="216" y="100" text-anchor="middle">Kurogane</text>
            <text x="216" y="118" text-anchor="middle">hierro negro · montañas</text>
            <text class="big" x="200" y="222" text-anchor="middle">Haibara</text>
            <text x="200" y="240" text-anchor="middle">empiezas aquí</text>
            <text class="big" x="178" y="314" text-anchor="middle">Shirasagi</text>
            <text x="178" y="332" text-anchor="middle">garza blanca · arrozales</text>
            <text class="big" x="342" y="244" text-anchor="middle">Akabane</text>
            <text x="342" y="262" text-anchor="middle">pluma roja</text>
            <circle class="port" cx="380" cy="300" r="6"/>
            <path class="sea" d="M386 306 C404 322 414 336 420 352"/>
            <rect class="closed" x="352" y="356" width="80" height="34" rx="4"/>
            <text x="392" y="378" text-anchor="middle">Nanban</text>
            <text class="q" x="40" y="206" text-anchor="middle">?</text>
            <text class="q" x="40" y="222" text-anchor="middle">shinobi</text>
          </svg>
        </div>
        <div class="grid2" style="align-items:start">
          <div class="lore">
            <p><b>La Gran Ceniza</b>Hace diez años, en la noche del rito, la montaña despertó. La ceniza cayó cuarenta días sobre la capital, el último Shōgun murió sin heredero, los Tres Tesoros se perdieron y la tierra se abrió en grietas.</p>
            <p><b>La guerra del triple remolino</b>Las casas se lanzaron a por el trono vacío. Dos años de batallas sin vencedor, y una casa borrada de las crónicas.</p>
          </div>
          <div class="lore">
            <p><b>El Año de los Espíritus Hambrientos</b>En el segundo invierno ardieron los almacenes de arroz del Shōgun. Murió uno de cada cinco habitantes de las islas, y los gaki (espíritus hambrientos) vagaban por los campos.</p>
            <p><b>La Tregua del Arroz</b>Los tres clanes la firmaron en el Gran Santuario del Sol: nadie será Shōgun sin los Tres Tesoros, Haibara no es de nadie y el arroz se reparte. Dura ya ocho años. Nadie la ha roto en público. Nadie la cumple del todo.</p>
          </div>
        </div>
        <p><b>Haibara (llanura de ceniza)</b>, antes Kazanbara (llanura del volcán), la tierra más fértil de las islas, vuelve a dar arroz. Ningún clan puede ocuparla. Aquí empiezas, y los tres clanes quieren tu lealtad.</p>
      </div>
    </div>
    <div class="panel">
      <div class="panel-h"><h2>Clanes</h2><span class="kj" aria-hidden="true">氏族</span></div>
      <div class="panel-b">
        <p>Sus señores los lleva el staff. Puedes servirlos y ascender por rol y honor, o vivir libre y sin protección.</p>
        <div class="grid2">
          <article class="card clan">
            <svg class="mon" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" style="stroke:var(--ai)" stroke-width="2"/><path d="M12 30 L22 12 L32 30 Z" style="fill:var(--ai)"/></svg>
            <h3>Kurogane <span class="tr">(hierro negro)</span></h3>
            <p class="tr">Montañas del norte</p>
            <p>Militar y estricto. Vive de sus minas y sus forjas, y desprecia a los extranjeros.</p>
          </article>
          <article class="card clan">
            <svg class="mon" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" style="stroke:var(--kin)" stroke-width="2"/><path d="M10 26 Q22 8 34 26 Q22 20 10 26 Z" style="fill:var(--kin)"/></svg>
            <h3>Shirasagi <span class="tr">(garza blanca)</span></h3>
            <p class="tr">Llanuras y arrozales del sur</p>
            <p>Culto y diplomático. Protege templos y artes, y desconfía de los Nanban.</p>
          </article>
          <article class="card clan">
            <svg class="mon" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" style="stroke:var(--shu)" stroke-width="2"/><path d="M22 8 C30 16 30 28 22 36 C24 26 20 18 22 8 Z" style="fill:var(--shu)"/></svg>
            <h3>Akabane <span class="tr">(pluma roja)</span></h3>
            <p class="tr">Costa este y puerto Nanban</p>
            <p>Ambicioso y comerciante. Abrió su puerto a los extranjeros y se enriquece con ellos.</p>
          </article>
          <article class="card clan hidden">
            <svg class="mon" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" style="stroke:var(--muted)" stroke-width="2" stroke-dasharray="4 4"/><text x="22" y="29" text-anchor="middle" font-size="20" style="fill:var(--muted)" font-family="serif">?</text></svg>
            <h3>Ryu shinobi <span class="tr">(clan ninja)</span></h3>
            <p class="tr">Paradero desconocido</p>
            <p>Oficialmente no existe. Sirve al mejor postor, y sus miembros viven bajo una identidad falsa.</p>
          </article>
        </div>
      </div>
    </div>
`,
  "caminos": `    <div class="panel">
      <div class="panel-h"><h2>Ocho caminos para dejar de ser nadie</h2><span class="kj" aria-hidden="true">道</span></div>
      <div class="panel-b">
        <p>Todos empiezan como <b>Heimin (gente común)</b>, sin clase, y pueden aprender un poco de todo: cualquier skill hasta 50, salvo Envenenar y Onmyodo, que son saber secreto. Cada camino lleva sus siete skills propias hasta 100. La plantilla suma 700: tú eliges cómo repartirla. Nadie puede hacerlo todo.</p>
        <div class="grid2">
          <article class="card"><h3>Bushi <span class="tr">(guerrero)</span></h3><p class="role">Combate y mando</p><p class="skills">Kenjutsu (esgrima), Sojutsu (armas de asta), Kyujutsu (arco), Heiho (tácticas), Bajutsu (monta), Liderazgo, Etiqueta</p></article>
          <article class="card"><h3>Yamabushi <span class="tr">(monje guerrero)</span></h3><p class="role">Lucha y sanación</p><p class="skills">Bojutsu (contundentes), Jujutsu (lucha sin armas), Devoción, Curación, Anatomía, Medicina, Rastrear</p></article>
          <article class="card"><h3>Shinobi <span class="tr">(ninja)</span></h3><p class="role">Infiltración</p><p class="skills">Sigilo, Esconderse, Disfraz, Espionaje, Cerrajería, Shurikenjutsu (arrojadizas), Robar</p></article>
          <article class="card"><h3>Gakusha <span class="tr">(erudito, onmyoji)</span></h3><p class="role">Magia y remedios</p><p class="skills">Onmyodo (magia y adivinación), Medicina, Envenenar, Caligrafía, Anatomía, Tasación, Cartografía</p></article>
          <article class="card"><h3>Biwa hoshi <span class="tr">(bardo)</span></h3><p class="role">Información y vida social</p><p class="skills">Música, Etiqueta, Espionaje, Disfraz, Detectar, Medicina (el gremio de los ciegos unía a bardos, masajistas y acupuntores), y Caligrafía o Cerrajería a elegir</p></article>
          <article class="card"><h3>Shokunin <span class="tr">(artesano)</span></h3><p class="role">Producción</p><p class="skills">Un solo oficio a 100: herrería, carpintería, sastrería, alfarería o construcción (y otro a 70), más sus skills de apoyo y Bajutsu (monta) para carros y animales de tiro</p></article>
          <article class="card"><h3>Ryoshi <span class="tr">(cazador)</span></h3><p class="role">Exploración y caza</p><p class="skills">Kyujutsu (arco), Rastrear, Detectar, Doma, Cocina, Pesca, Navegación</p></article>
          <article class="card"><h3>Hyakusho <span class="tr">(campesino)</span></h3><p class="role">Comida y tributo</p><p class="skills">Agricultura, Pesca, Cocina, Doma, Construcción, Tala, Bojutsu (bastón y hoz)</p></article>
        </div>
        <p class="muted">Desde 50, quien entrena con un sensei (maestro) avanza cuatro veces más rápido, pero las lecciones se pagan. Los mejores pueden pasar de 100 a 120 en sus skills propias, y la plantilla de 700 a 800: eso no se compra, se gana por rol.</p>
      </div>
    </div>
`,
  "skills": `    <div class="panel">
      <div class="panel-h"><h2>Las 42 skills</h2><span class="kj" aria-hidden="true">技</span></div>
      <div class="panel-b">
        <div class="sk-hero">
          <svg viewBox="0 0 160 160" role="img" aria-label="Enso, el circulo zen, con el kanji de tecnica">
            <defs><filter id="sk-pincel" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter></defs>
            <path d="M118 30 C150 55 148 115 108 136 C68 156 22 132 18 90 C14 52 46 22 84 22 C96 22 104 24 112 28" fill="none" style="stroke:var(--ink)" stroke-width="13" stroke-linecap="round" filter="url(#sk-pincel)"/>
            <text x="80" y="102" text-anchor="middle" font-size="52" style="fill:var(--shu);font-family:var(--f-display);font-weight:800">技</text>
          </svg>
          <div><p class="lema">Waza (técnica): lo que sabes hacer.</p><p>Qué hace cada skill, qué clases la llevan a 100 y en qué punto del desarrollo está. Esta lista se irá actualizando con cada lote. Mampostería se unió a Construcción en el lote 3. En el lote 4, Venenos pasó a llamarse Envenenar y Herboristería desapareció: cualquiera recoge plantas con la vara de zahorí, pero solo quien sabe Medicina o Envenenar reconoce lo que coge.</p></div>
        </div>
        <div class="sk-recuento" id="sk-recuento" aria-label="Recuento por estado"></div>
        <div class="sk-filtros">
          <div class="sk-fila"><span class="sk-et" id="sk-et-estado">Estado</span><span id="sk-f-estado" role="group" aria-labelledby="sk-et-estado" style="display:contents"></span></div>
          <div class="sk-fila"><span class="sk-et" id="sk-et-grupo">Grupo</span><span id="sk-f-grupo" role="group" aria-labelledby="sk-et-grupo" style="display:contents"></span></div>
          <div class="sk-fila"><label class="sk-et" for="sk-buscar">Buscar</label><input id="sk-buscar" type="search" placeholder="Skill, clase o efecto (Shinobi, casas, yokai...)"></div>
        </div>
        <div id="sk-lista"></div>
        <p class="muted" style="font-size:13.5px">«A 100»: clases que llegan al máximo. «A 50»: todos los demás pueden aprenderla hasta 50; la plantilla (700) decide cuánto repartes. Envenenar y Onmyodo son saber secreto: solo su clase o alguien iniciado en secreto por un maestro. Los oficios: el Shokunin (artesano) elige uno a 100 y otro a 70. En todo lo que enfrenta una skill contra otra (disfraz contra detectar, robar contra vigilar) se hace una tirada enfrentada: skill + la mitad de la stat + un dado de 1 a 50 por cada lado.</p>
      </div>
    </div>
`,
  "honor": `    <div class="panel">
      <div class="panel-h"><h2>Honor y fama</h2><span class="kj" aria-hidden="true">名誉</span></div>
      <div class="panel-b">
        <p>Todos empiezan en 0. Cada camino tiene su código: a un shinobi una emboscada no le quita honor; a un samurái, huir de un duelo sí.</p>
        <div>
          <div class="scale" role="img" aria-label="Escala de honor de menos 100 a más 100 dividida en seis niveles"><span class="s1"></span><span class="s2"></span><span class="s3"></span><span class="s4"></span><span class="s5"></span><span class="s6"></span></div>
          <div class="ticks"><span>−100</span><span>−60</span><span>−20</span><span>+20</span><span>+60</span><span>+90</span><span>+100</span></div>
        </div>
        <div class="grid3">
          <div class="level"><span class="pts">−100 a −61</span><h4>Deshonrado</h4><p>Expulsado del gremio, nadie te enseña y un bushi cae a ronin.</p></div>
          <div class="level"><span class="pts">−60 a −21</span><h4>Mal visto</h4><p>Los tutores te cobran el doble y no asciendes.</p></div>
          <div class="level"><span class="pts">−20 a +20</span><h4>Neutral</h4><p>Donde empieza todo el mundo.</p></div>
          <div class="level"><span class="pts">+21 a +60</span><h4>Honorable</h4><p>Aprendes los tramos altos y asciendes en tu gremio.</p></div>
          <div class="level"><span class="pts">+61 a +90</span><h4>Ejemplar</h4><p>Optas al primer densho y enseñas a otros.</p></div>
          <div class="level"><span class="pts">+91 a +100</span><h4>Leyenda</h4><p>Segundo densho y los cargos más altos.</p></div>
        </div>
        <h3>La fama</h3>
        <p>La fama dice cuánto te conocen; el honor, por qué. Las hazañas solo cuentan si hay testigos.</p>
        <div class="tablebox">
          <table>
            <thead><tr><th scope="col">Fama</th><th scope="col">Con honor</th><th scope="col">Sin honor</th></tr></thead>
            <tbody>
              <tr><td>Desconocido</td><td>Nadie te conoce</td><td>Nadie te conoce</td></tr>
              <tr><td>Conocido</td><td class="good">Respetado</td><td class="bad">Sospechoso</td></tr>
              <tr><td>Famoso</td><td class="good">Admirado</td><td class="bad">Temido</td></tr>
              <tr><td>Legendario</td><td class="good">Héroe</td><td class="bad">Infame</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
`,
  "vida": `    <div class="panel">
      <div class="panel-h"><h2>Vida en Hinokage</h2><span class="kj" aria-hidden="true">暮らし</span></div>
      <div class="panel-b">
        <p>Cada estación dura mes y medio real: un año natural son dos años en Hinokage.</p>
        <div class="grid4">
          <div class="card season"><span class="k" aria-hidden="true">春</span><h3>Haru <span class="tr">(primavera)</span></h3><p>Siembra del arroz. Hanami (contemplar los cerezos en flor).</p></div>
          <div class="card season"><span class="k" aria-hidden="true">夏</span><h3>Natsu <span class="tr">(verano)</span></h3><p>Lluvias y la mejor pesca. Obon (festival de los difuntos).</p></div>
          <div class="card season"><span class="k" aria-hidden="true">秋</span><h3>Aki <span class="tr">(otoño)</span></h3><p>Cosecha y tributo de arroz. Tsukimi (contemplar la luna).</p></div>
          <div class="card season"><span class="k" aria-hidden="true">冬</span><h3>Fuyu <span class="tr">(invierno)</span></h3><p>Se vive de conservas. Shogatsu (año nuevo): saldar deudas.</p></div>
        </div>
        <div class="grid3">
          <div class="feature"><h3>Arroz, tributo y paga</h3><p>Los campesinos pagan el nengu (tributo de arroz) al clan, y el señor paga a sus samuráis en arroz.</p></div>
          <div class="feature"><h3>Casas pieza a pieza</h3><p>Construcción y Carpintería hacen muros, suelos y tejados. El dueño y su constructor los colocan con el Sashigane (escuadra) en su solar. Pesan, así que hay que acarrearlas con bueyes. Quien no paga el impuesto, la pierde.</p></div>
          <div class="feature"><h3>Magia de papel y fe</h3><p>Ofuda (talismanes) que se escriben y se gastan, shikigami (espíritus sirvientes) y la fe de los monjes.</p></div>
          <div class="feature"><h3>Yokai</h3><p>Oni, kitsune, tengu, kappa. A algunos se les combate; a otros conviene respetarlos, o su maldición te perseguirá.</p></div>
          <div class="feature"><h3>Heridas que dejan huella</h3><p>Caes desmayado con un corte, una fractura o una quemadura, y otro tiene que curarte. La muerte definitiva, solo con pacto.</p></div>
          <div class="feature"><h3>Minas, mar y tesoros</h3><p>Minas que se derrumban por zonas, barcos de pesca y de guerra, buceo a pulmón en busca de perlas y pecios, y pergaminos de tesoro.</p></div>
        </div>
      </div>
    </div>
`,
  "reglas": `    <div class="panel">
      <div class="panel-h"><h2>Reglas</h2><span class="kj" aria-hidden="true">掟</span></div>
      <div class="panel-b">
        <p class="draft">Borrador. Las reglas definitivas se publicarán antes de la apertura.</p>
        <ul class="rules">
          <li>Nombre japonés y de rol. Nada de nombres de broma, de famosos ni de otros personajes conocidos.</li>
          <li>Un personaje por cuenta. La historia del personaje la aprueba el staff antes de entrar.</li>
          <li>Los personajes no se borran desde el cliente: quien quiera retirar el suyo lo hace con seppuku (suicidio ritual) dentro del juego, sin pedir permiso a nadie.</li>
          <li>Dentro del juego se habla y se actúa como el personaje. Lo que sabe el jugador no lo sabe el personaje.</li>
          <li>La muerte definitiva solo es posible con un pacto aceptado por los dos jugadores y aprobado por el staff.</li>
          <li>Un shinobi puede ocultar su verdadero camino. Descubrirlo es cosa del rol, no de preguntar fuera del juego.</li>
          <li>Un edificio por personaje para vivir. Talleres y tiendas, aparte y con su impuesto.</li>
          <li>No hay herederos: quien muere de verdad pierde su casa, su dinero y sus objetos. Solo los altos cargos pasan a su sucesor lo que va con el cargo.</li>
          <li>El staff lleva a los señores de los clanes y decide guerras, treguas y eventos.</li>
        </ul>
      </div>
    </div>
`,
  "descargas": `    <div class="panel">
      <div class="panel-h"><h2>Descargas</h2><span class="kj" aria-hidden="true">入手</span></div>
      <div class="panel-b">
        <p class="draft">Aún no hay descargas disponibles. Se publicarán aquí cuando empiecen las pruebas cerradas.</p>
        <div class="grid3">
          <div class="card"><h3>Lanzador RoninUO</h3><p class="muted">Lo único que necesitas: instala el juego con el arte japonés, lo mantiene al día y te conecta al servidor. No se puede entrar de otra forma.</p><span class="btn" aria-disabled="true">Próximamente</span></div>
        </div>
      </div>
    </div>
`,
  "desarrollo": `    <div class="panel">
      <div class="panel-h"><h2>En qué punto estamos</h2><span class="kj" aria-hidden="true">進捗</span></div>
      <div class="panel-b">
        <p>El servidor se construye por lotes: se diseñan cinco puntos, se programan juntos y se prueban en un servidor de pruebas antes de pasar al siguiente.</p>
        <ol class="steps road" id="plan"></ol>
      </div>
    </div>
`,
};
