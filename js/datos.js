// RoninUO - datos de la web. Para actualizar la web basta con tocar este archivo:
// noticias (la primera es la mas reciente), plan de desarrollo, estado del
// servidor, enlace de Discord y relojes.

var CONFIG = {
  discord: "https://discord.gg/KMvqtdeKM",
  estado: {
    abierto: false,          // true cuando el servidor abra
    texto: "Cerrado",
    fase: "En desarrollo",
    edicion: "I · Ecos del Sol Naciente",
    apertura: "Por anunciar",
    motor: "Source-X"
  },
  // Relojes en tiempo real: zona horaria IANA, silueta (iberia o sudamerica)
  // y abreviatura para la cabecera. Chile cambia de hora en invierno y
  // Argentina no, por eso van separados aunque compartan silueta.
  relojes: [
    { nombre: "España", zona: "Europe/Madrid", silueta: "iberia", corto: "ES" },
    { nombre: "Argentina", zona: "America/Argentina/Buenos_Aires", silueta: "sudamerica", corto: "AR" },
    { nombre: "Chile", zona: "America/Santiago", silueta: "sudamerica", corto: "CL" }
  ],
  // Ping estimado al servidor (alojado en España). Son rangos orientativos,
  // no una medida real: se cambian aqui si el servidor se muda.
  ping: [
    { nombre: "España", bandera: "es", ms: "10-40" },
    { nombre: "Argentina", bandera: "ar", ms: "190-240" },
    { nombre: "Chile", bandera: "cl", ms: "210-260" }
  ]
};

// Menu principal: id de la pagina y texto
var MENU = [
  {
    "id": "inicio",
    "texto": "Inicio"
  },
  {
    "id": "como-jugar",
    "texto": "Cómo jugar"
  },
  {
    "id": "solicitud",
    "texto": "Solicitar cuenta"
  },
  {
    "id": "mundo",
    "texto": "El mundo"
  },
  {
    "id": "caminos",
    "texto": "Caminos"
  },
  {
    "id": "skills",
    "texto": "Skills"
  },
  {
    "id": "honor",
    "texto": "Honor y fama"
  },
  {
    "id": "vida",
    "texto": "Vida en Hinokage"
  },
  {
    "id": "reglas",
    "texto": "Reglas"
  },
  {
    "id": "descargas",
    "texto": "Descargas"
  },
  {
    "id": "desarrollo",
    "texto": "Desarrollo"
  }
];

// Noticias. etiqueta: Diario de desarrollo, Comunidad, Lore, Anuncio...
// fecha en formato AAAA-MM-DD; el texto admite HTML (enlaces, negritas).
var NOTICIAS = [
  {
    "fecha": "2026-11-02",
    "etiqueta": "Diario de desarrollo",
    "titulo": "Hinokage ya tiene mapa",
    "texto": "Las islas ya se pueden recorrer: las tierras de los tres clanes, Haibara en el centro, arrozales inundados, playas, el volcán y sus grietas de lava, y los sekisho (puestos de control) en las fronteras. Además, cada cuenta tendrá un único personaje, que solo se retira con seppuku (suicidio ritual), y las stats se entrenan hasta 225 entre Tai, Gi y Shin, con un máximo de 125 en cada una: cada jugador decide hacia dónde las lleva."
  },
  {
    "fecha": "2026-10-31",
    "etiqueta": "Diario de desarrollo",
    "titulo": "Sexto lote: etiqueta y maldiciones",
    "texto": "Ofender a un yokai trae tatari (maldición) hasta que un kannushi (sacerdote) te purifica. Las audiencias piden reverencia y Etiqueta, se puede pedir perdón con .owabi, la ceremonia del té calma el cuerpo y el shisha (mensajero) no se toca. El staff ya lleva desde un panel los pactos, los clanes, las regiones y los edificios."
  },
  {
    "fecha": "2026-10-31",
    "etiqueta": "Diario de desarrollo",
    "titulo": "Todos saben un poco de todo",
    "texto": "Cualquier personaje puede aprender cualquier skill hasta 50, y su camino lleva las propias a 100 dentro de una plantilla de 700. Desde 50, los sensei (maestros) cobran sus lecciones y quien entrena con ellos avanza más rápido. Envenenar y Onmyodo pasan a ser saber secreto, que solo se transmite por iniciación. Y rezar en los santuarios ya hace que las plegarias te lleguen con más fuerza."
  },
  {
    "fecha": "2026-10-30",
    "etiqueta": "Diario de desarrollo",
    "titulo": "Quinto lote: repaso de skills",
    "texto": "Emplastos y huesos rotos que hay que entablillar, campamentos de curación, monta con caballos de temperamento, el mozo de cuadras que cría y entrena, perros de caza, el ojo del tasador para lo robado y lo falso, la daga lanzada y el polvo cegador, informantes que escuchan en cualquier parte y cartas lacradas."
  },
  {
    "fecha": "2026-10-30",
    "etiqueta": "Comunidad",
    "titulo": "Ya tenemos Discord",
    "texto": "Abrimos el servidor de Discord de RoninUO: sigue el desarrollo, propón ideas y apúntate a las pruebas cerradas. <a href=\"https://discord.gg/KMvqtdeKM\" target=\"_blank\" rel=\"noopener\">Entrar en el Discord</a>."
  },
  {
    "fecha": "2026-10-30",
    "etiqueta": "Diario de desarrollo",
    "titulo": "Cuarto lote programado",
    "texto": "Venenos de época que nunca matan, plantas que solo reconoce quien sabe, anatomía para leer cuerpos y heridas, tintes prohibidos, cuencos de té famosos, mapas que pueden mentir, huellas que seguir y el carro de buey. Herboristería desaparece y Venenos pasa a llamarse Envenenar."
  },
  {
    "fecha": "2026-10-30",
    "etiqueta": "Diario de desarrollo",
    "titulo": "Tercer lote programado",
    "texto": "Ya están en el servidor de pruebas las casas pieza a pieza, los barcos y el buceo, los siete disfraces, el liderazgo con sus arengas y Ashigaru, la nueva música del bardo y los documentos, testigos y rumores con los que se irá destapando el lore."
  },
  {
    "fecha": "2026-10-30",
    "etiqueta": "Lore",
    "titulo": "La Crónica de Hinokage",
    "texto": "De la lágrima del sol a la Tregua del Arroz: la historia de las islas ya está escrita. Puedes leerla en <a href=\"#mundo\">El mundo</a>."
  },
  {
    "fecha": "2026-10-28",
    "etiqueta": "Anuncio",
    "titulo": "Nace RoninUO",
    "texto": "Presentamos el proyecto: un servidor 100 % rol ambientado en las islas de Hinokage. Esta web irá creciendo a medida que avance el desarrollo."
  },
  {
    "fecha": "2026-10-28",
    "etiqueta": "Diario de desarrollo",
    "titulo": "El diseño, casi cerrado",
    "texto": "Ya están definidos el mundo, los clanes, los ocho caminos, el honor y la fama, la economía del arroz y la mayoría de sistemas. Siguiente paso: la base técnica del servidor."
  },
  {
    "fecha": "2026-10-28",
    "etiqueta": "Comunidad",
    "titulo": "Pronto, el Discord",
    "texto": "Abriremos un servidor de Discord para seguir el desarrollo, proponer ideas y formar parte de las pruebas cerradas. <b>Actualización:</b> ya está abierto, <a href=\"https://discord.gg/KMvqtdeKM\" target=\"_blank\" rel=\"noopener\">entra aquí</a>."
  }
];

// Plan de desarrollo. estado: Hecho, Siguiente o Pendiente. El primero que no
// este Hecho es el proximo hito (sale en la columna de la derecha).
var PLAN = [
  {
    "texto": "Diseño del mundo, caminos, honor y sistemas",
    "estado": "Hecho"
  },
  {
    "texto": "Lote 1: base técnica, personaje, skills, armas y oficios, heridas, comida, economía y magia",
    "estado": "Hecho"
  },
  {
    "texto": "Lote 2: posturas y técnicas, yokai y NPC, regiones, recolección y campo, clanes y pactos",
    "estado": "Hecho"
  },
  {
    "texto": "Lote 3: revelación del lore, casas, barcos y buceo, disfraz, liderazgo y música",
    "estado": "Hecho"
  },
  {
    "texto": "Lote 4: venenos, anatomía, tintorería, alfarería, cartografía, rastreo y carro de buey",
    "estado": "Hecho"
  },
  {
    "texto": "Lote 5: repaso de skills (medicina, monta, establo, tasación, curación, arrojadizas y espionaje)",
    "estado": "Hecho"
  },
  {
    "texto": "Lote 6: tatari (maldiciones de yokai), etiqueta y audiencias, registros y panel del staff",
    "estado": "Hecho"
  },
  {
    "texto": "Mapa nuevo y arte japonés",
    "estado": "Siguiente"
  },
  {
    "texto": "Pruebas cerradas y apertura",
    "estado": "Pendiente"
  }
];
