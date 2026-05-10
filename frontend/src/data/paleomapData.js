/**
 * paleomapData.js
 * 
 * Datos paleogeográficos para el mapa interactivo de PaleoArchivo.
 * 
 * Coordenadas [x, y] en porcentaje (0-100) sobre la imagen del mapa de cada periodo.
 * Las imágenes son mapas paleogeográficos de dominio público de la PALEOMAP Project
 * y similares, que muestran la posición de los continentes en cada era.
 * 
 * Fuentes de mapas: https://www.scotese.com/newpage12.htm (PALEOMAP Project)
 */

export const PALEOMAP_PERIODS = [
  // ── PALEOZOICO ─────────────────────────────────────────────────────────────
  {
    id: "cambrico",
    nombre: "Cámbrico",
    ma: "538–485 Ma",
    era: "Paleozoico",
    acento: "#5fc49a",
    // Mapa del Cámbrico: Gondwana domina el hemisferio sur, Laurentia al norte
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Cambrian_540ma.jpg/1280px-Cambrian_540ma.jpg",
    descripcion: "La mayor parte de la vida se concentra en los mares cálidos y someros alrededor de Gondwana. Laurentia (Norteamérica) está separada y girada.",
    hallazgos: [
      { nombre: "ANOMALOCARIS",    x: 55, y: 62, pais: "Canadá (Burgess Shale)" },
      { nombre: "HALLUCIGENIA",    x: 54, y: 61, pais: "Canadá (Burgess Shale)" },
      { nombre: "OPABINIA",        x: 54, y: 60, pais: "Canadá (Burgess Shale)" },
      { nombre: "PIKAIA",          x: 54, y: 62, pais: "Canadá (Burgess Shale)" },
      { nombre: "WIWAXIA",         x: 55, y: 63, pais: "Canadá / China" },
    ],
  },
  {
    id: "ordovicico",
    nombre: "Ordovícico",
    ma: "485–444 Ma",
    era: "Paleozoico",
    acento: "#6aafc5",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ordovician_490ma.jpg/1280px-Ordovician_490ma.jpg",
    descripcion: "Gondwana se desplaza hacia el polo sur provocando una glaciación masiva al final del periodo. Los mares epicontinentales son muy ricos en vida.",
    hallazgos: [
      { nombre: "ORTHOCERAS",      x: 52, y: 55, pais: "Europa / Norteamérica" },
      { nombre: "SACABAMBASPIS",   x: 38, y: 72, pais: "Bolivia (paleotropical)" },
      { nombre: "CAMEROCERAS",     x: 53, y: 54, pais: "Norteamérica / Europa" },
      { nombre: "ASTRASPIS",       x: 48, y: 48, pais: "Norteamérica" },
    ],
  },
  {
    id: "silurico",
    nombre: "Silúrico",
    ma: "444–419 Ma",
    era: "Paleozoico",
    acento: "#7a9fbf",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Silurian_430ma.jpg/1280px-Silurian_430ma.jpg",
    descripcion: "Las glaciaciones remiten. Laurentia y Báltica colisionan formando Laurussia. Las primeras plantas vasculares colonizan tierra firme.",
    hallazgos: [
      { nombre: "EURYPTERUS",      x: 50, y: 42, pais: "Laurussia (Europa-Norteamérica)" },
      { nombre: "PTERYGOTUS",      x: 50, y: 43, pais: "Laurussia" },
      { nombre: "BIRKENIA",        x: 51, y: 40, pais: "Escocia" },
      { nombre: "COOKSONIA",       x: 49, y: 41, pais: "Gales / Irlanda" },
    ],
  },
  {
    id: "devonico",
    nombre: "Devónico",
    ma: "419–359 Ma",
    era: "Paleozoico",
    acento: "#ab8ccf",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Devonian_400ma.jpg/1280px-Devonian_400ma.jpg",
    descripcion: "La edad de los peces. Los continentes del norte se fusionan. Los bosques primitivos aparecen en tierra y los primeros tetrápodos dan sus primeros pasos.",
    hallazgos: [
      { nombre: "DUNKLEOSTEUS",    x: 47, y: 38, pais: "Ohio, USA / Europa" },
      { nombre: "TIKTAALIK",       x: 52, y: 32, pais: "Ártico canadiense" },
      { nombre: "EUSTHENOPTERON",  x: 50, y: 35, pais: "Canadá / Europa" },
      { nombre: "HYNERPETON",      x: 48, y: 39, pais: "Pennsylvania, USA" },
      { nombre: "STETHACANTHUS",   x: 46, y: 40, pais: "Europa / Norteamérica" },
    ],
  },
  {
    id: "carbonifero",
    nombre: "Carbonífero",
    ma: "359–299 Ma",
    era: "Paleozoico",
    acento: "#c09a6a",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Carboniferous_300ma.jpg/1280px-Carboniferous_300ma.jpg",
    descripcion: "Euramerica y Gondwana comienzan a fusionarse. Bosques tropicales de licopodios cubren el ecuador. El CO₂ cae y el O₂ sube al 35%.",
    hallazgos: [
      { nombre: "MEGANEURA",       x: 48, y: 40, pais: "Francia / Reino Unido" },
      { nombre: "ARTHROPLEURA",    x: 47, y: 39, pais: "Europa / Norteamérica" },
      { nombre: "ERYOPS",          x: 45, y: 42, pais: "Texas, USA" },
      { nombre: "EDAPHOSAURUS",    x: 46, y: 43, pais: "Texas, USA / Europa" },
      { nombre: "PULMONOSCORPIUS", x: 48, y: 38, pais: "Escocia" },
    ],
  },
  {
    id: "permico",
    nombre: "Pérmico",
    ma: "299–252 Ma",
    era: "Paleozoico",
    acento: "#cf8888",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Permian_260ma.jpg/1280px-Permian_260ma.jpg",
    descripcion: "Pangea está completamente formada. El interior es extremadamente árido. Los sinápsidos dominan antes de la mayor extinción de la historia.",
    hallazgos: [
      { nombre: "DIMETRODON",      x: 45, y: 42, pais: "Texas / Oklahoma, USA" },
      { nombre: "INOSTRANCEVIA",   x: 55, y: 30, pais: "Rusia (cuenca del Dvina)" },
      { nombre: "ESTEMMENOSUCHUS", x: 55, y: 31, pais: "Rusia" },
      { nombre: "SCUTOSAURUS",     x: 54, y: 32, pais: "Rusia" },
      { nombre: "MOSCHOPS",        x: 52, y: 70, pais: "Sudáfrica (Cuenca de Karoo)" },
    ],
  },

  // ── MESOZOICO ───────────────────────────────────────────────────────────────
  {
    id: "triasico",
    nombre: "Triásico",
    ma: "252–201 Ma",
    era: "Mesozoico",
    acento: "#cfaa4a",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Triassic_220ma.jpg/1280px-Triassic_220ma.jpg",
    descripcion: "Pangea comienza a fracturarse. El clima es extremadamente cálido y seco. Los primeros dinosaurios y mamíferos aparecen en Gondwana.",
    hallazgos: [
      { nombre: "EORAPTOR",        x: 38, y: 62, pais: "Argentina (Valle de la Luna)" },
      { nombre: "HERRERASAURUS",   x: 38, y: 63, pais: "Argentina" },
      { nombre: "PLATEOSAURUS",    x: 50, y: 38, pais: "Alemania / Francia / Suiza" },
      { nombre: "POSTOSUCHUS",     x: 44, y: 42, pais: "Texas, USA" },
      { nombre: "NOTHOSAURUS",     x: 52, y: 40, pais: "Europa central / Oriente Medio" },
    ],
  },
  {
    id: "jurasico",
    nombre: "Jurásico",
    ma: "201–145 Ma",
    era: "Mesozoico",
    acento: "#6abf6a",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Jurassic_150ma.jpg/1280px-Jurassic_150ma.jpg",
    descripcion: "Pangea se divide en Laurasia (norte) y Gondwana (sur). El mar de Tethys se expande. Los dinosaurios dominan todos los continentes.",
    hallazgos: [
      { nombre: "BRACHIOSAURUS",   x: 42, y: 42, pais: "Colorado, USA / Tanzania" },
      { nombre: "STEGOSAURUS",     x: 41, y: 41, pais: "Colorado / Wyoming, USA" },
      { nombre: "ALLOSAURUS",      x: 40, y: 42, pais: "Utah / Colorado, USA" },
      { nombre: "DIPLODOCUS",      x: 41, y: 43, pais: "Wyoming / Colorado, USA" },
      { nombre: "ARCHAEOPTERYX",   x: 51, y: 37, pais: "Baviera, Alemania" },
    ],
  },
  {
    id: "cretacico",
    nombre: "Cretácico",
    ma: "145–66 Ma",
    era: "Mesozoico",
    acento: "#cf6a6a",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cretaceous_094ma.jpg/1280px-Cretaceous_094ma.jpg",
    descripcion: "Los continentes se aproximan a sus posiciones actuales. El nivel del mar es muy alto. Diversidad dinosauriana máxima antes del impacto de Chicxulub.",
    hallazgos: [
      { nombre: "TYRANNOSAURUS",   x: 35, y: 38, pais: "Montana / Dakota, USA" },
      { nombre: "TRICERATOPS",     x: 35, y: 39, pais: "Montana / Wyoming, USA" },
      { nombre: "SPINOSAURUS",     x: 52, y: 48, pais: "Egipto / Marruecos" },
      { nombre: "VELOCIRAPTOR",    x: 65, y: 38, pais: "Mongolia (desierto de Gobi)" },
      { nombre: "CARNOTAURUS",     x: 38, y: 68, pais: "Patagonia, Argentina" },
      { nombre: "ARGENTINOSAURUS", x: 37, y: 67, pais: "Patagonia, Argentina" },
      { nombre: "MOSASAURUS",      x: 48, y: 38, pais: "Países Bajos / Kansas, USA" },
    ],
  },

  // ── CENOZOICO ───────────────────────────────────────────────────────────────
  {
    id: "paleoceno",
    nombre: "Paleoceno",
    ma: "66–56 Ma",
    era: "Cenozoico",
    acento: "#cf9a5a",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Paleocene_60ma.jpg/1280px-Paleocene_60ma.jpg",
    descripcion: "Los continentes se aproximan rápidamente a su posición actual. Los mamíferos ocupan los nichos dejados por los dinosaurios no avianos.",
    hallazgos: [
      { nombre: "GASTORNIS",       x: 49, y: 38, pais: "Europa / Norteamérica" },
      { nombre: "PLESIADAPIS",     x: 48, y: 37, pais: "Francia / Colorado, USA" },
      { nombre: "CORYPHODON",      x: 42, y: 38, pais: "Norteamérica / Europa" },
      { nombre: "BARYLAMBDA",      x: 40, y: 40, pais: "Norteamérica" },
    ],
  },
  {
    id: "eoceno",
    nombre: "Eoceno",
    ma: "56–34 Ma",
    era: "Cenozoico",
    acento: "#9abf5a",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Eocene_50ma.jpg/1280px-Eocene_50ma.jpg",
    descripcion: "Máximo térmico del Cenozoico. La India colisiona con Asia formando el Himalaya. Los cetáceos regresan al mar desde tierra firme.",
    hallazgos: [
      { nombre: "BASILOSAURUS",    x: 50, y: 45, pais: "Egipto / Louisiana, USA" },
      { nombre: "PAKICETUS",       x: 62, y: 43, pais: "Pakistán / India" },
      { nombre: "ANDREWSARCHUS",   x: 63, y: 37, pais: "Mongolia" },
      { nombre: "UINTATHERIUM",    x: 38, y: 38, pais: "Utah / Wyoming, USA" },
    ],
  },
  {
    id: "oligoceno",
    nombre: "Oligoceno",
    ma: "34–23 Ma",
    era: "Cenozoico",
    acento: "#5a8abf",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Oligocene_30ma.jpg/1280px-Oligocene_30ma.jpg",
    descripcion: "La Antártida se congela definitivamente. Los pastizales se expanden. Aparece el mayor mamífero terrestre conocido.",
    hallazgos: [
      { nombre: "PARACERATHERIUM", x: 60, y: 40, pais: "Asia central / Pakistán" },
      { nombre: "MESOHIPPUS",      x: 38, y: 40, pais: "Dakotas, USA" },
      { nombre: "ENTELODON",       x: 55, y: 38, pais: "Europa / Asia" },
      { nombre: "HYAENODON",       x: 52, y: 40, pais: "Europa / Asia / Norteamérica" },
    ],
  },
  {
    id: "mioceno",
    nombre: "Mioceno",
    ma: "23–5.3 Ma",
    era: "Cenozoico",
    acento: "#bf5a8a",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Miocene_14ma.jpg/1280px-Miocene_14ma.jpg",
    descripcion: "Los pastizales dominan los continentes. Megalodon reina en los océanos. Los grandes primates africanos evolucionan hacia linajes que incluyen al ser humano.",
    hallazgos: [
      { nombre: "MEGALODON",       x: 45, y: 45, pais: "Océanos globales (dientes en todos los continentes)" },
      { nombre: "MOROPUS",         x: 40, y: 40, pais: "Nebraska, USA" },
      { nombre: "AMEBELODON",      x: 41, y: 41, pais: "Norteamérica / África" },
      { nombre: "SIVATHERIUM",     x: 57, y: 48, pais: "India / África oriental" },
    ],
  },
  {
    id: "plioceno",
    nombre: "Plioceno",
    ma: "5.3–2.6 Ma",
    era: "Cenozoico",
    acento: "#8a5abf",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Pliocene_3ma.jpg/1280px-Pliocene_3ma.jpg",
    descripcion: "Los continentes están casi en su posición actual. El Gran Intercambio Americano conecta las dos Américas. Los homínidos bípedos prosperan.",
    hallazgos: [
      { nombre: "AUSTRALOPITHECUS", x: 54, y: 57, pais: "Etiopía / Tanzania / Sudáfrica" },
      { nombre: "MACRAUCHENIA",     x: 38, y: 68, pais: "Argentina / Chile" },
      { nombre: "PHORUSRHACUS",     x: 37, y: 67, pais: "Argentina" },
      { nombre: "GIGANTOPITHECUS",  x: 68, y: 45, pais: "China / India" },
    ],
  },
  {
    id: "pleistoceno",
    nombre: "Pleistoceno",
    ma: "2.6 Ma–11.700 a",
    era: "Cenozoico",
    acento: "#5abfbf",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Pleistocene_glaciation.jpg/1280px-Pleistocene_glaciation.jpg",
    descripcion: "Las glaciaciones cubren el norte con kilómetros de hielo. La megafauna domina cada ecosistema hasta la expansión de Homo sapiens.",
    hallazgos: [
      { nombre: "MAMMUTHUS",        x: 50, y: 30, pais: "Siberia / Norteamérica / Europa" },
      { nombre: "SMILODON",         x: 36, y: 45, pais: "California / Sudamérica" },
      { nombre: "MEGATHERIUM",      x: 37, y: 65, pais: "Argentina / Patagonia" },
      { nombre: "DOEDICURUS",       x: 38, y: 66, pais: "Argentina" },
      { nombre: "ARCTODUS",         x: 38, y: 36, pais: "Norteamérica" },
    ],
  },
  {
    id: "holoceno",
    nombre: "Holoceno",
    ma: "11.700 a–presente",
    era: "Cenozoico",
    acento: "#bfbf5a",
    mapa: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Physical_World_Map_2004.jpg/1280px-Physical_World_Map_2004.jpg",
    descripcion: "El mundo tal como lo conocemos. La civilización humana transforma el planeta y acelera la tasa de extinción hasta 1000 veces la media geológica.",
    hallazgos: [
      { nombre: "DODO",             x: 67, y: 60, pais: "Isla Mauricio (océano Índico)" },
      { nombre: "TIGRE DE TASMANIA",x: 82, y: 72, pais: "Tasmania, Australia" },
      { nombre: "ALCA GIGANTE",     x: 43, y: 30, pais: "Atlántico Norte / Islandia" },
    ],
  },
];

// Helper para buscar datos de mapa por id de periodo
export function getMapByPeriod(periodId) {
  return PALEOMAP_PERIODS.find(p => p.id === periodId) || null;
}