// RoninUO - generador de nombres (pagina Como jugar). Nombres: [romaji, kanji, significado]
(function () {
"use strict";

// Nombres: [romaji, kanji, significado]
const HOMBRE = [
  ["Tarō","太郎","primer hijo"],["Jirō","次郎","segundo hijo"],["Saburō","三郎","tercer hijo"],["Shirō","四郎","cuarto hijo"],
  ["Gorō","五郎","quinto hijo"],["Hachirō","八郎","octavo hijo"],["Kenji","健二","segundo hijo, fuerte"],["Takeshi","武","guerrero"],
  ["Hiroshi","寛","generoso"],["Masaru","勝","victoria"],["Isamu","勇","valor"],["Makoto","誠","sinceridad"],
  ["Tadashi","正","recto"],["Kiyoshi","清","puro"],["Akira","明","claridad"],["Osamu","修","disciplina"],
  ["Minoru","実","fruto"],["Shigeru","茂","frondoso"],["Yoshio","良雄","hombre bueno"],["Kazuo","和夫","hombre de armonía"],
  ["Tetsuo","鉄雄","hombre de hierro"],["Nobuo","信夫","hombre leal"],["Hideo","英雄","hombre excelente"],["Haruki","春樹","árbol de primavera"]
];
const HOMBRE_PUEBLO = [
  ["Gonbei","権兵衛","el de la guardia"],["Chōbei","長兵衛","el guardián mayor"],["Kihei","喜平","alegría y paz"],["Yohei","与平","el que da paz"],
  ["Denbei","伝兵衛","el que transmite"],["Kyūbei","久兵衛","el que perdura"],["Tokubei","徳兵衛","virtud"],["Sukezō","助蔵","el que ayuda en el almacén"],
  ["Genzō","源蔵","manantial y almacén"],["Heihachi","平八","paz y ocho"],["Kansuke","勘助","intuición y ayuda"],["Matazō","又蔵","otra vez el almacén"]
];
const HOMBRE_BUSHI = [
  ["Hyōgo","兵庫","arsenal"],["Sakon","左近","guardia de la izquierda"],["Ukon","右近","guardia de la derecha"],["Kuranosuke","内蔵助","ayudante del tesoro"],
  ["Shinnosuke","新之助","nuevo ayudante"],["Gennosuke","源之助","ayudante del manantial"],["Kazuma","一馬","un solo caballo"],["Hayato","隼人","hombre halcón"],
  ["Kagetora","景虎","tigre del paisaje"],["Jūbei","十兵衛","décimo guardián"],["Tatewaki","帯刀","el que lleva la espada"],["Kunai","宮内","del palacio"]
];
const MUJER = [
  ["Hana","花","flor"],["Yuki","雪","nieve"],["Sakura","桜","cerezo"],["Kiku","菊","crisantemo"],["Ume","梅","ciruelo"],
  ["Matsu","松","pino"],["Take","竹","bambú"],["Tsuru","鶴","grulla"],["Kame","亀","tortuga, larga vida"],["Chiyo","千代","mil generaciones"],
  ["Haru","春","primavera"],["Natsu","夏","verano"],["Aki","秋","otoño"],["Kaede","楓","arce"],["Sayo","小夜","noche breve"],
  ["Shizuka","静","tranquila"],["Tomoe","巴","remolino"],["Fuji","藤","glicina"],["Ran","蘭","orquídea"],["Ai","藍","índigo"],
  ["Mitsu","光","luz"],["Yae","八重","flor de ocho pétalos"],["Toyo","豊","abundancia"],["Ine","稲","planta de arroz"],
  ["Kiyo","清","pura"],["Sen","千","mil"],["Tama","玉","joya"],["Rin","凛","digna"],["Asa","朝","mañana"]
];
const APELLIDO = [
  ["Kuroki","黒木","árbol negro"],["Shiraishi","白石","piedra blanca"],["Akagi","赤城","castillo rojo"],["Hayashi","林","bosque"],
  ["Mori","森","arboleda"],["Yamamoto","山本","al pie de la montaña"],["Nakamura","中村","aldea del medio"],["Kawaguchi","川口","boca del río"],
  ["Matsuda","松田","arrozal de los pinos"],["Takahashi","高橋","puente alto"],["Kobayashi","小林","bosquecillo"],["Inoue","井上","sobre el pozo"],
  ["Kimura","木村","aldea de los árboles"],["Shimizu","清水","agua clara"],["Ishikawa","石川","río de piedras"],["Okada","岡田","arrozal de la colina"],
  ["Ueda","上田","arrozal de arriba"],["Mizuno","水野","campo de agua"],["Kaneko","金子","hijo del metal"],
  ["Hoshino","星野","campo de estrellas"],["Tsukishima","月島","isla de la luna"],["Kagami","鏡","espejo"],["Tachibana","橘","naranjo silvestre"],
  ["Ogawa","小川","arroyo"],["Arai","新井","pozo nuevo"],["Hirano","平野","llanura"],["Kuribayashi","栗林","bosque de castaños"],
  ["Aoyama","青山","montaña azul"],["Shirakawa","白川","río blanco"],["Akiyama","秋山","montaña de otoño"],["Kitano","北野","campo del norte"],
  ["Nishimura","西村","aldea del oeste"],["Higashiyama","東山","montaña del este"]
];
const APELLIDO_SANTUARIO = [
  ["Kamiya","神谷","valle de los kami"],["Miyazaki","宮崎","cabo del santuario"],["Torii","鳥居","pórtico del santuario"],["Kannushi","神主","guardián del kami"],
  ["Ōmiwa","大三輪","los tres grandes anillos"],["Hafuri","祝","bendición"],["Sakaki","榊","árbol sagrado"],["Mitarai","御手洗","fuente de purificación"]
];
const ALDEA = [
  ["Kawaguchi","川口","boca del río"],["Hirano","平野","llanura"],["Kitano","北野","campo del norte"],["Mizuhara","水原","prado de agua"],
  ["Takeuchi","竹内","dentro del bambú"],["Sakamoto","坂本","al pie de la cuesta"],["Ishida","石田","arrozal de piedras"],["Haibara","灰原","llanura de ceniza"]
];
const TIENDA = [
  ["Kameya","亀屋","tienda de la tortuga"],["Tsuruya","鶴屋","tienda de la grulla"],["Masuya","升屋","tienda de la medida de arroz"],
  ["Daikokuya","大黒屋","tienda de Daikoku, dios de la riqueza"],["Izumiya","和泉屋","tienda de Izumi"],["Ebisuya","恵比寿屋","tienda de Ebisu"],
  ["Komeya","米屋","tienda del arroz"],["Shioya","塩屋","tienda de la sal"],["Kagiya","鍵屋","tienda de la llave"],["Fujiya","藤屋","tienda de la glicina"]
];
const OFICIO = [
  ["kaji","鍛冶","herrero"],["daiku","大工","carpintero"],["shitateya","仕立屋","sastre"],["sekkō","石工","cantero"],["tōkō","陶工","alfarero"],["somemono","染物","tintorero"]
];
const BUDISTA = [
  ["Ryōkan","良寛","bondad y amplitud"],["Ekai","慧海","mar de sabiduría"],["Jōkai","浄海","mar puro"],["Ryūzen","竜禅","dragón en meditación"],
  ["Sōen","宗円","círculo de la escuela"],["Kōen","光円","círculo de luz"],["Zenkai","禅海","mar de meditación"],["Kakuzen","覚禅","meditación despierta"],
  ["Eishun","栄春","primavera próspera"],["Gyōkū","行空","camino del vacío"],["Shōun","松雲","nube entre pinos"],["Tetsugen","鉄眼","ojo de hierro"]
];
const BIWA = [
  ["Jōichi","城一","uno del castillo"],["Shin'ichi","真一","uno verdadero"],["Seiichi","清一","uno puro"],["Gen'ichi","源一","uno del manantial"],
  ["Ryōichi","良一","uno bueno"],["Kōichi","光一","uno de luz"],["Sōichi","宗一","uno de la escuela"],["Tokuichi","徳一","uno virtuoso"]
];
const GOZE = [
  ["Haru","春","primavera"],["Sayo","小夜","noche breve"],["Kiku","菊","crisantemo"],["Tsuyu","露","rocío"],["Kaze","風","viento"],["Fumi","文","escrito"]
];
const ALIAS = [
  ["Kage","影","sombra"],["Kasumi","霞","neblina"],["Kiri","霧","niebla"],["Hayate","疾風","viento veloz"],["Tsumuji","旋風","torbellino"],
  ["Yami","闇","oscuridad"],["Karasu","烏","cuervo"],["Mozu","百舌","alcaudón"],["Itachi","鼬","comadreja"],["Mujina","狢","tejón"],
  ["Nezumi","鼠","ratón"],["Tobi","鳶","milano"],["Hotaru","蛍","luciérnaga"],["Shiranui","不知火","fuego fantasma"]
];

const CLASES = [
  {id:"heimin", nom:"Heimin (gente común)", regla:"Así empieza todo el mundo: sin apellido oficial, se le conoce por su aldea."},
  {id:"bushi", nom:"Bushi (guerrero)", regla:"Apellido de su casa y, en los hombres, un nombre de adulto de samurái."},
  {id:"ronin", nom:"Ronin (samurái sin señor)", regla:"Conserva el apellido de su antigua casa."},
  {id:"yamabushi", nom:"Yamabushi (monje de montaña)", regla:"Nombre budista con -bō (celda del monje) detrás."},
  {id:"shinobi", nom:"Shinobi (ninja)", regla:"Un alias para el ryu y un nombre de tapadera para el mundo."},
  {id:"gakusha", nom:"Gakusha (erudito)", regla:"Apellido de familia letrada y nombre."},
  {id:"biwahoshi", nom:"Biwa hoshi (bardo)", regla:"Los bardos ciegos llevaban nombres terminados en -ichi; las goze (músicas ciegas), un nombre sencillo."},
  {id:"shokunin", nom:"Shokunin (artesano)", regla:"Se le conoce por su nombre y su oficio, o por su aldea."},
  {id:"ryoshi", nom:"Ryoshi (cazador, explorador)", regla:"Gente del campo: nombre y aldea."},
  {id:"hyakusho", nom:"Hyakusho (campesino)", regla:"Gente del campo: nombre y aldea."},
  {id:"kannushi", nom:"Kannushi (sacerdote sintoísta)", regla:"Apellido de familia de santuario y nombre."},
  {id:"shonin", nom:"Shonin (mercader)", regla:"El nombre de la casa (-ya, tienda) va delante del suyo."}
];

let clase = "heimin", sexo = "hombre";
try { const c = localStorage.getItem("rn_clase"); if (CLASES.some(x => x.id === c)) clase = c; const s = localStorage.getItem("rn_sexo"); if (s === "hombre" || s === "mujer") sexo = s; } catch (e) {}

const elige = a => a[Math.floor(Math.random() * a.length)];
const nombreDe = (sx) => sx === "mujer" ? elige(MUJER) : elige(HOMBRE);
// El juego solo admite letras sin tildes: Hyōgo -> Hyogo, Shin'ichi -> Shinichi
const sinTildes = t => t.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/'/g, "");
function junta(partes, sep = " ") {
  return { romaji: partes.map(p => p[0]).join(sep), kanji: partes.map(p => p[1]).join(""), sig: partes.map(p => p[2]).join(" · ") };
}
function propuesta() {
  const m = sexo === "mujer";
  switch (clase) {
    case "bushi": return junta([elige(APELLIDO), m ? elige(MUJER) : (Math.random() < .6 ? elige(HOMBRE_BUSHI) : elige(HOMBRE))]);
    case "ronin": { const r = junta([elige(APELLIDO), m ? elige(MUJER) : elige(HOMBRE_BUSHI.concat(HOMBRE))]); r.sig += " · sin señor"; return r; }
    case "gakusha": return junta([elige(APELLIDO), nombreDe(sexo)]);
    case "kannushi": return junta([elige(APELLIDO_SANTUARIO), nombreDe(sexo)]);
    case "yamabushi": { const b = elige(BUDISTA); return { romaji: b[0] + "-bō", kanji: b[1] + "坊", sig: b[2] + " · celda del monje" }; }
    case "biwahoshi": { if (m) { const g = elige(GOZE); return { romaji: g[0], kanji: g[1], sig: g[2] + " · goze, música ciega" }; } return junta([elige(BIWA)]); }
    case "shinobi": {
      const a = elige(ALIAS), t = m ? elige(MUJER) : elige(HOMBRE_PUEBLO);
      return { romaji: a[0] + " (tapadera: " + t[0] + ")", copia: t[0], kanji: a[1], sig: "alias: " + a[2] + " · tapadera: " + t[2] };
    }
    case "shonin": { const t = elige(TIENDA), n = m ? elige(MUJER) : elige(HOMBRE_PUEBLO); return junta([t, n]); }
    case "shokunin": {
      const n = m ? elige(MUJER) : elige(HOMBRE_PUEBLO);
      if (Math.random() < .5) { const o = elige(OFICIO); return { romaji: n[0] + " el " + o[2], kanji: n[1] + "・" + o[1], sig: n[2] + " · " + o[2] + " (" + o[0] + ")" }; }
      const a = elige(ALDEA); return { romaji: n[0] + " de " + a[0], kanji: a[1] + "の" + n[1], sig: n[2] + " · de " + a[2] };
    }
    default: {
      const a = elige(ALDEA);
      if (m) { const n = elige(MUJER); return { romaji: "O-" + n[0] + " de " + a[0], kanji: a[1] + "の" + "お" + n[1], sig: n[2] + " · de " + a[2] }; }
      const n = elige(HOMBRE_PUEBLO.concat(HOMBRE));
      return { romaji: n[0] + " de " + a[0], kanji: a[1] + "の" + n[1], sig: n[2] + " · de " + a[2] };
    }
  }
}

function nbBotones() {
  const cb = document.getElementById("nb-clases");
  cb.innerHTML = "";
  CLASES.forEach(c => {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = c.nom;
    b.setAttribute("aria-pressed", String(c.id === clase));
    b.addEventListener("click", () => { clase = c.id; nbGuarda(); nbBotones(); nbGenera(); });
    cb.appendChild(b);
  });
  const sb = document.getElementById("nb-sexos");
  sb.innerHTML = "";
  [["hombre", "Hombre"], ["mujer", "Mujer"]].forEach(([id, t]) => {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = t;
    b.setAttribute("aria-pressed", String(id === sexo));
    b.addEventListener("click", () => { sexo = id; nbGuarda(); nbBotones(); nbGenera(); });
    sb.appendChild(b);
  });
  document.getElementById("nb-regla").textContent = CLASES.find(c => c.id === clase).regla;
}
function nbGuarda() { try { localStorage.setItem("rn_clase", clase); localStorage.setItem("rn_sexo", sexo); } catch (e) {} }
function nbGenera() {
  const cont = document.getElementById("nb-tiras");
  cont.innerHTML = "";
  const vistos = new Set();
  let intentos = 0;
  while (vistos.size < 6 && intentos < 60) {
    intentos++;
    const p = propuesta();
    if (vistos.has(p.romaji)) continue;
    vistos.add(p.romaji);
    const juego = sinTildes(p.copia || p.romaji);
    const t = document.createElement("button");
    t.type = "button"; t.className = "tanzaku"; t.title = "Copiar " + juego;
    t.innerHTML = '<span class="nb-kanji"></span><span class="nb-romaji"></span><span class="nb-sig"></span><span class="nb-juego"></span>';
    const k = t.querySelector(".nb-kanji");
    k.setAttribute("lang", "ja");
    Array.from(p.kanji).forEach(ch => { const c = document.createElement("span"); c.textContent = ch === "・" ? "︙" : ch; k.appendChild(c); });
    t.querySelector(".nb-romaji").textContent = p.romaji;
    t.querySelector(".nb-sig").textContent = p.sig;
    t.querySelector(".nb-juego").textContent = "En el juego: " + juego;
    t.addEventListener("click", () => nbCopia(t, juego));
    cont.appendChild(t);
  }
}
function nbCopia(el, texto) {
  const avisa = (msg) => { let s = el.querySelector(".nb-copiado"); if (!s) { s = document.createElement("span"); s.className = "nb-copiado"; el.appendChild(s); } s.textContent = msg; setTimeout(() => s.remove(), 1600); };
  const selecciona = () => { const r = document.createRange(); r.selectNodeContents(el.querySelector(".nb-juego")); const s = window.getSelection(); s.removeAllRanges(); s.addRange(r); };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(() => avisa("Copiado"), () => { selecciona(); avisa("Selecciónalo y cópialo"); });
  } else { selecciona(); avisa("Selecciónalo y cópialo"); }
}
if (document.getElementById("nb-tiras")) {
  document.getElementById("nb-generar").addEventListener("click", nbGenera);
  nbBotones();
  nbGenera();
}
})();
