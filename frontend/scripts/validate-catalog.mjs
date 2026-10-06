import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const frontendRoot = fileURLToPath(new URL("..", import.meta.url));
const REQUIRED_STRING_FIELDS = [
  "nombre",
  "subName",
  "descripcion",
  "imagen",
  "dieta",
  "tipo",
  "longitud",
  "estado",
  "era",
];
const VALID_STATES = new Set(["EXTINTO", "VIVO"]);

const errors = [];
const warnings = [];

const error = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function printIssues(label, issues) {
  if (!issues.length) return;
  console.log(`\n${label} (${issues.length})`);
  issues.forEach((issue) => console.log(`- ${issue}`));
}

const vite = await createServer({
  root: frontendRoot,
  logLevel: "error",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const [{ allAnimals }, { DIET_CONFIG }, { ERAS }, { ANIMAL_COORDS }] = await Promise.all([
    vite.ssrLoadModule("/src/data/allData.js"),
    vite.ssrLoadModule("/src/data/dietConfig.js"),
    vite.ssrLoadModule("/src/data/timelineData.js"),
    vite.ssrLoadModule("/src/data/paleomapCoords.js"),
  ]);

  const knownPeriods = new Set(ERAS.flatMap((era) => era.periodos.map((period) => period.nombre)));
  const seenIds = new Map();
  const seenNames = new Map();
  const animalsByMapKey = new Map();

  allAnimals.forEach((animal, index) => {
    const label = animal?.nombre || `registro ${index + 1}`;

    if (!animal || typeof animal !== "object") {
      error(`Registro ${index + 1}: debe ser un objeto.`);
      return;
    }

    REQUIRED_STRING_FIELDS.forEach((field) => {
      if (!hasText(animal[field])) error(`${label}: falta el campo esencial "${field}".`);
    });

    if (!Number.isInteger(animal.id) || animal.id < 1) {
      error(`${label}: "id" debe ser un entero positivo.`);
    } else if (seenIds.has(animal.id)) {
      error(`${label}: ID duplicado ${animal.id} (también usado por ${seenIds.get(animal.id)}).`);
    } else {
      seenIds.set(animal.id, label);
    }

    const normalizedName = hasText(animal.nombre) ? animal.nombre.trim().toLocaleUpperCase("es") : null;
    if (normalizedName) {
      if (seenNames.has(normalizedName)) {
        error(`${label}: nombre duplicado (también usado por ${seenNames.get(normalizedName)}).`);
      } else {
        seenNames.set(normalizedName, label);
        animalsByMapKey.set(normalizedName, animal);
      }
    }

    if (hasText(animal.dieta) && !Object.hasOwn(DIET_CONFIG, animal.dieta)) {
      error(`${label}: dieta desconocida "${animal.dieta}".`);
    }

    if (hasText(animal.era) && !knownPeriods.has(animal.era)) {
      error(`${label}: período desconocido "${animal.era}".`);
    }

    if (hasText(animal.estado) && !VALID_STATES.has(animal.estado)) {
      error(`${label}: estado no válido "${animal.estado}".`);
    }

    const conservation = Number(animal.conservacion);
    if (hasText(animal.conservacion) && (!Number.isFinite(conservation) || conservation < 0 || conservation > 100)) {
      error(`${label}: conservación debe estar entre 0 y 100.`);
    }

    if (hasText(animal.imagen) && !hasHttpUrl(animal.imagen)) {
      error(`${label}: imagen debe usar una URL http(s) válida.`);
    }
  });

  const orderedIds = [...seenIds.keys()].sort((a, b) => a - b);
  for (let expected = 1; expected <= orderedIds.length; expected += 1) {
    if (orderedIds[expected - 1] !== expected) {
      warn(`La secuencia de IDs no es correlativa: se esperaba ${expected} y se encontró ${orderedIds[expected - 1] ?? "ningún ID"}.`);
      break;
    }
  }

  Object.entries(ANIMAL_COORDS).forEach(([name, coordinates]) => {
    const animal = animalsByMapKey.get(name.toLocaleUpperCase("es"));
    if (!animal) {
      error(`Coordenadas sin ficha correspondiente: "${name}".`);
      return;
    }

    const { lon, lat } = coordinates || {};
    if (!Number.isFinite(lon) || lon < -180 || lon > 180 || !Number.isFinite(lat) || lat < -90 || lat > 90) {
      error(`${animal.nombre}: coordenadas fuera de rango.`);
    }
  });

  const catalogWithCoordinates = allAnimals.filter((animal) => ANIMAL_COORDS[animal.nombre?.toLocaleUpperCase("es")]);
  console.log(`Catálogo validado: ${allAnimals.length} fichas, ${seenIds.size} IDs y ${catalogWithCoordinates.length} puntos cartográficos.`);
  printIssues("Advertencias", warnings);
  printIssues("Errores", errors);

  if (errors.length) process.exitCode = 1;
} finally {
  await vite.close();
}
