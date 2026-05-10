/**
 * paleomapCoords.js
 * Coordenadas modernas (lon, lat) del lugar de hallazgo fósil de cada animal.
 * GPlates Web Service las reconstruye automáticamente a la posición paleogeográfica
 * correspondiente a cada periodo.
 */

export const ANIMAL_COORDS = {
  // ── CÁMBRICO ────────────────────────────────────────────────────────────────
  "TRILOBITE":         { lon: 103,  lat: 25  }, // Chengjiang, Yunnan, China
  "ANOMALOCARIS":      { lon: 103,  lat: 25  }, // Chengjiang, China (también Burgess Shale)
  "OPABINIA":          { lon: -116, lat: 51  }, // Burgess Shale, Columbia Británica, Canadá
  "PIKAIA":            { lon: -116, lat: 51  }, // Burgess Shale, Columbia Británica, Canadá
  "MEGACHELICER AX":   { lon: 103,  lat: 25  }, // Chengjiang, Yunnan, China
  "HALLUCIGENIA":      { lon: 103,  lat: 25  }, // Chengjiang, China (también Burgess Shale)
  "WIWAXIA":           { lon: -116, lat: 51  }, // Burgess Shale, Canadá
  "MARRELLA":          { lon: -116, lat: 51  }, // Burgess Shale, Canadá (especie tipo)

  // ── ORDOVÍCICO ───────────────────────────────────────────────────────────────
  "EURYPTERIDA":       { lon: 15,   lat: 55  }, // Europa / Norteamérica
  "CAMEROCERAS":       { lon: -85,  lat: 43  }, // Ohio / Ontario
  "ASTRASPIS":         { lon: -105, lat: 40  }, // Colorado, USA
  "ORTHOCERAS":        { lon: 15,   lat: 55  }, // Escandinavia / Europa
  "SACABAMBASPIS":     { lon: -65,  lat: -17 }, // Bolivia
  "PTERYGOTUS":        { lon: -79,  lat: 43  }, // Ontario, Canadá

  // ── SILÚRICO ─────────────────────────────────────────────────────────────────
  "COOKSONIA":         { lon: -4,   lat: 52  }, // Gales, Reino Unido
  "PNEUMODESMUS":      { lon: -3,   lat: 56  }, // Escocia
  "BIRKENIA":          { lon: -4,   lat: 57  }, // Escocia
  "ENTELOGNATHUS":     { lon: 105,  lat: 42  }, // China
  "CEPHALASPIS":       { lon: -4,   lat: 52  }, // Gales, Reino Unido
  "ERKENEKOVIA":       { lon: 43,   lat: 53  }, // Rusia
  "MONOGRAPTUS":       { lon: 15,   lat: 50  }, // Europa central

  // ── DEVÓNICO ─────────────────────────────────────────────────────────────────
  "DUNKLEOSTEUS":      { lon: -82,  lat: 41  }, // Ohio, USA
  "TIKTAALIK":         { lon: -85,  lat: 75  }, // Ártico canadiense
  "ICHTHYOSTEGA":      { lon: -25,  lat: 72  }, // Groenlandia
  "BOTHRIOLEPIS":      { lon: -66,  lat: 49  }, // Quebec, Canadá
  "CLADOSELACHE":      { lon: -82,  lat: 41  }, // Ohio, USA
  "HYNERPETON":        { lon: -76,  lat: 41  }, // Pennsylvania, USA
  "EUSTHENOPTERON":    { lon: -68,  lat: 49  }, // Quebec, Canadá

  // ── CARBONÍFERO ──────────────────────────────────────────────────────────────
  "MEGANEURA":         { lon: 3,    lat: 46  }, // Francia
  "ARTHROPLEURA":      { lon: -2,   lat: 55  }, // Escocia / Norteamérica
  "HYLONOMUS":         { lon: -63,  lat: 46  }, // Nueva Escocia, Canadá
  "EDAPHOSAURUS":      { lon: -97,  lat: 35  }, // Texas, USA
  "ERYOPS":            { lon: -97,  lat: 33  }, // Texas, USA
  "PETROLACOSAURUS":   { lon: -96,  lat: 38  }, // Kansas, USA
  "PROTEROGYRINUS":    { lon: -82,  lat: 38  }, // West Virginia, USA

  // ── PÉRMICO ──────────────────────────────────────────────────────────────────
  "DIMETRODON":        { lon: -97,  lat: 35  }, // Texas / Oklahoma, USA
  "MOSCHOPS":          { lon: 25,   lat: -32 }, // Sudáfrica (Cuenca de Karoo)
  "GORGONOPS":         { lon: 24,   lat: -33 }, // Sudáfrica (Karoo)
  "LYSTROSAURUS":      { lon: 26,   lat: -31 }, // Sudáfrica / India / Antártida
  "OPHIACODON":        { lon: -96,  lat: 36  }, // Texas / New Mexico, USA
  "SCUTOSAURUS":       { lon: 54,   lat: 62  }, // Rusia (cuenca del Dvina)
  "DICYNODONT":        { lon: 25,   lat: -31 }, // Sudáfrica (Karoo)

  // ── TRIÁSICO ─────────────────────────────────────────────────────────────────
  "EORAPTOR":          { lon: -68,  lat: -30 }, // San Juan, Argentina
  "COELOPHYSIS":       { lon: -108, lat: 36  }, // Nuevo México, USA
  "POSTOSUCHUS":       { lon: -97,  lat: 32  }, // Texas, USA
  "PLATEOSAURUS":      { lon: 10,   lat: 48  }, // Alemania / Francia / Suiza

  // ── JURÁSICO ─────────────────────────────────────────────────────────────────
  "ALLOSAURUS":        { lon: -111, lat: 39  }, // Utah, USA
  "BRACHIOSAURUS":     { lon: -108, lat: 39  }, // Colorado, USA / Tanzania
  "ARCHAEOPTERYX":     { lon: 11,   lat: 49  }, // Baviera, Alemania
  "ESTEGOSAURUS":      { lon: -108, lat: 39  }, // Colorado, USA
  "DILOPHOSAURUS":     { lon: -111, lat: 35  }, // Arizona, USA
  "CHLAMYDOSELACHUSS": { lon: -10,  lat: 50  }, // Europa occidental
  "DIPLODOCUS":        { lon: -107, lat: 41  }, // Wyoming, USA
  "CERATOSAURUS":      { lon: -110, lat: 39  }, // Utah / Colorado, USA
  "PLIOSAURUS":        { lon: -1,   lat: 52  }, // Oxfordshire, Reino Unido
  "COMPSOGNATHUS":     { lon: 12,   lat: 49  }, // Alemania / Francia
  "LEEDSICHTHYS":      { lon: -1,   lat: 53  }, // Lincolnshire, Reino Unido
  "KENTROSAURUS":      { lon: 39,   lat: -9  }, // Tanzania (Tendaguru)
  "MEGALOSAURUS":      { lon: -1,   lat: 52  }, // Oxfordshire, Reino Unido

  // ── CRETÁCICO ────────────────────────────────────────────────────────────────
  "AUCASAURUS":        { lon: -68,  lat: -38 }, // Neuquén, Argentina
  "ABELISAURUS":       { lon: -68,  lat: -39 }, // Río Negro, Argentina
  "CARNOTAURUS":       { lon: -68,  lat: -40 }, // Patagonia, Argentina
  "ARGENTINOSAURUS":   { lon: -69,  lat: -39 }, // Neuquén, Argentina
  "MOSASAURUS":        { lon: 5,    lat: 51  }, // Países Bajos / Kansas, USA

  // ── PALEOCENO ────────────────────────────────────────────────────────────────
  "TITANOBOA":         { lon: -74,  lat: 11  }, // Colombia (La Guajira)
  "GASTORNIS":         { lon: 2,    lat: 49  }, // Francia / Bélgica / Alemania
  "CORYPHODON":        { lon: -105, lat: 41  }, // Wyoming, USA
  "PRISTICHAMPSUS":    { lon: 8,    lat: 48  }, // Alemania
  "CHAMPSOSAURUS":     { lon: -108, lat: 50  }, // Alberta, Canadá
  "PLESIADAPIS":       { lon: 3,    lat: 47  }, // Francia / Colorado, USA
  "PHOSPHATHERIUM":    { lon: -5,   lat: 32  }, // Marruecos

  // ── EOCENO ───────────────────────────────────────────────────────────────────
  "PAKICETUS":         { lon: 70,   lat: 30  }, // Pakistán / India
  "UINTATHERIUM":      { lon: -109, lat: 41  }, // Utah / Wyoming, USA
  "ANDREWSARCHUS":     { lon: 98,   lat: 48  }, // Mongolia
  "BASILOSAURUS":      { lon: 30,   lat: 29  }, // Egipto (Wadi Al-Hitan)
  "EMBOLOTHERIUM":     { lon: 100,  lat: 46  }, // Mongolia
  "HYRACOTHERIUM":     { lon: -110, lat: 42  }, // Wyoming, USA
  "GODINOTIA":         { lon: 8,    lat: 50  }, // Messel, Alemania

  // ── OLIGOCENO ────────────────────────────────────────────────────────────────
  "PARACERATHERIUM":   { lon: 65,   lat: 35  }, // Pakistán / China / Mongolia
  "ENTELODON":         { lon: 10,   lat: 48  }, // Europa / Asia
  "HYAENODON":         { lon: 15,   lat: 48  }, // Europa / Asia / Norteamérica
  "MESOHIPPUS":        { lon: -102, lat: 44  }, // Dakotas, USA
  "CHALICOTHERIUM":    { lon: 15,   lat: 48  }, // Europa / Asia
  "CYNODICTIS":        { lon: 2,    lat: 47  }, // Francia
  "ANTHRACOTHERIUM":   { lon: 15,   lat: 46  }, // Europa / Asia

  // ── MIOCENO ──────────────────────────────────────────────────────────────────
  "MEGALODON":         { lon: -40,  lat: 20  }, // Océanos globales
  "GIGANTOPITHECUS":   { lon: 108,  lat: 24  }, // China (Guangxi)
  "SIVATHERIUM":       { lon: 77,   lat: 20  }, // India / África oriental
  "AMPHICYON":         { lon: 2,    lat: 47  }, // Europa / Norteamérica
  "LIVYATAN":          { lon: -75,  lat: -15 }, // Perú (Formación Pisco)
  "MOROPUS":           { lon: -99,  lat: 41  }, // Nebraska, USA
  "CERATOTHERIUM PRAECOX": { lon: 37, lat: 0 }, // África oriental

  // ── PLIOCENO ─────────────────────────────────────────────────────────────────
  "MEGATHERIUM":       { lon: -65,  lat: -35 }, // Argentina / Uruguay
  "SMILODON":          { lon: -68,  lat: -35 }, // Argentina / California
  "DINOFELIS":         { lon: 37,   lat: -3  }, // África oriental / Asia
  "PHORUSRHACUS":      { lon: -65,  lat: -35 }, // Argentina (Patagonia)
  "MACRAUCHENIA":      { lon: -68,  lat: -38 }, // Patagonia, Argentina
  "TOXODON":           { lon: -64,  lat: -34 }, // Uruguay / Argentina
  "MEGANTEREON":       { lon: 36,   lat: 2   }, // África oriental / Eurasia

  // ── PLEISTOCENO ──────────────────────────────────────────────────────────────
  "MAMMUTHUS":         { lon: 100,  lat: 65  }, // Siberia / Norteamérica
  "MEGALOCEROS":       { lon: -8,   lat: 53  }, // Irlanda / Europa
  "CAVE LION":         { lon: 30,   lat: 50  }, // Europa / Siberia
  "DEINOTHERIUM":      { lon: 37,   lat: 1   }, // África oriental
  "COELODONTA":        { lon: 90,   lat: 55  }, // Siberia / Europa
  "GLYPTODON":         { lon: -64,  lat: -34 }, // Argentina / Uruguay
  "HOMO NEANDERTHALENSIS": { lon: 12, lat: 45 }, // Europa / Oriente Medio

  // ── HOLOCENO ─────────────────────────────────────────────────────────────────
  "AUK GIGANTE":       { lon: -23,  lat: 65  }, // Islandia / Atlántico Norte
  "DODO":              { lon: 57,   lat: -20 }, // Isla Mauricio
  "TIGRE DE TASMANIA": { lon: 147,  lat: -42 }, // Tasmania, Australia
  "MAMUT ENANO":       { lon: 26,   lat: 37  }, // Chipre / islas mediterráneas
  "MOA GIGANTE":       { lon: 172,  lat: -43 }, // Nueva Zelanda
  "PÁJARO ELEFANTE":   { lon: 47,   lat: -20 }, // Madagascar
  "LOBO DE FALKLAND":  { lon: -59,  lat: -51 }, // Islas Malvinas
};

/**
 * Devuelve los hallazgos de un array de animales del catálogo
 * con sus coordenadas de hallazgo modernas.
 * Los animales sin coordenadas conocidas se omiten.
 */
export function getHallazgosForAnimals(animals) {
  return animals
    .map(a => {
      const coords = ANIMAL_COORDS[a.nombre.toUpperCase()];
      if (!coords) return null;
      return {
        nombre: a.nombre,
        id: a.id,
        lon: coords.lon,
        lat: coords.lat,
      };
    })
    .filter(Boolean);
}