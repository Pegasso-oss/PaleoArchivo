# Gestión de Datos

## Estructura de un animal

Cada animal es un objeto JavaScript dentro del array `dinosaurios` de su archivo de periodo correspondiente.

```js
{
  id: 10,                          // Número único, correlativo al total del catálogo
  nombre: "ALLOSAURUS",            // Mayúsculas, sin acentos en el id de URL
  subName: "Lagarto extraño",      // Apodo o traducción literal
  tipo: "Theropod",                // Ver lista de tipos válidos más abajo
  dieta: "Carnívoro",              // Debe coincidir exactamente con una key de dietConfig.js
  longitud: "8.5 metros",          // String libre — el parser acepta cm, rangos y decimales
  altura: "4 metros",
  estado: "EXTINTO",               // "EXTINTO" o "VIVO"
  era: "Jurásico",                 // Nombre del periodo geológico
  conservacion: "88",              // Porcentaje de 0 a 100 (string o número)
  metodo: "Permineralización",     // Opcional
  material: "Arenisca",            // Opcional
  extincion: "145 m.a.",           // Opcional — "---" si sigue vivo
  imagen: "https://...",           // URL pública de imagen
  descripcion: "...",              // Texto largo en español (las traducciones van en translations.js)

  // Opcional — solo si tiene rivales confirmados
  rival: [
    { id: 13, rol: "presa" },      // rol: "presa" | "depredador" | "competidor"
    { id: 17, rol: "competidor" },
  ],
}
```

---

## Añadir un animal nuevo

1. **Elige el archivo de periodo** (`jurasico.js`, `cretacico.js`, etc.).
2. **Asigna un `id`** — debe ser el siguiente número correlativo al mayor existente en los archivos de `src/data/`. No presupongas el último ID indicado en documentación antigua: compruébalo antes de añadir la ficha.
3. **Comprueba que `dieta`** coincide exactamente con una key de `dietConfig.js` (con tilde si la tiene: `"Carnívoro"`, `"Herbívoro"`...).
4. **Comprueba que `tipo`** está en la lista de tipos válidos (ver sección más abajo). Si es un tipo nuevo, añádelo también en `typeLabels` de `translations.js`.
5. **Añade la imagen** — URL pública directa a un `.jpg` o `.png`.
6. **`allData.js` no necesita tocarse** — ya importa todos los archivos de periodo con spread.

---

## Revisión del catálogo desde administración

La pestaña **Animales** de `/admin` permite buscar las fichas publicadas, filtrarlas por período, detectar campos esenciales pendientes y abrir cada ficha en la vista pública.

En la versión actual es una herramienta de **revisión editorial**: los datos siguen viviendo en los archivos de `frontend/src/data/` y se publican en la compilación del frontend. Por tanto, una edición persistente desde el panel requiere una migración previa y completa del catálogo a la API y a MongoDB; no se debe guardar una edición parcial en el panel porque no se reflejaría en las páginas públicas.

---

## Mapa de hallazgos

Las coordenadas modernas de cada ficha viven en `frontend/src/data/paleomapCoords.js`. Representan el yacimiento o la localidad fosilífera de referencia —no la posición de un espécimen individual— y el mapa las usa únicamente para situar los hallazgos en la Tierra actual.

Para las fichas del Ediacárico se han usado localidades documentadas por fuentes científicas o institucionales:

- **Dickinsonia, Spriggina y Tribrachidium:** Ediacara Hills / Flinders Ranges, Australia; [Departamento australiano de Cambio Climático, Energía, Medio Ambiente y Agua](https://www.dcceew.gov.au/parks-heritage/heritage/places/national/ediacara) y Botha & García-Bellido (2024), *Journal of Paleontology*, para *Tribrachidium*.
- **Charnia:** Bradgate Park, Charnwood Forest, Reino Unido; [British Geological Survey](https://www.bgs.ac.uk/discovering-geology/maps-and-resources/office-geology/bradgate-park-leicestershire/).
- **Kimberella y Yelovichnus:** Zimnie Gory / Yelovy Creek, costa del Mar Blanco, Rusia; Fedonkin *et al.* (2007), guía de campo de Zimnie Gory, y Popov *et al.* (2002), *Journal of Geophysical Research*.
- **Pteridinium:** Seilacher block, Nama Group, Namibia; [IUGS Geological Heritage Site 132](https://iugs-geoheritage.org/publications-dl/IUGS-SECOND-100-SITES-WEB-BOOK.pdf).
- **Cloudina:** Driedoornvlakte, Nama Group, Namibia; Elliott *et al.* (2024), *Journal of Paleontology*, con coordenadas de la localidad publicadas.

Al añadir coordenadas, usa un yacimiento publicado y deja un comentario con la localidad. Si la identificación o la localidad de referencia es incierta, no añadas el punto hasta verificarla.

---

## Lista de tipos válidos

| Key | Label ES |
|---|---|
| `Theropod` | Terópodo |
| `Sauropod` | Saurópodo |
| `Avialae` | Ave primitiva |
| `Thyreophoran` | Tireoforo |
| `Plesiosaur` | Plesiosaurio |
| `Chondrichthyes` | Condrictio |
| `Basal_arthropod` | Artrópodo basal |
| `Basal_chordate` | Cordado basal |
| `Mollusca` | Molusco |
| `Arthropoda` | Artrópodo |
| `Agnatha` | Agnato |
| `Saurischia` | Saurisquio |
| `Abelisauridae` | Abelisáurido |
| `Squamata` | Escamoso |
| `Mammalia` | Mamífero |
| `Crocodylomorpha` | Crocodilomorfo |
| `Synapsida` | Sinápsido |
| `Therapsida` | Terápside |
| `Reptilia` | Reptil |
| `Placodermi` | Placoderme |
| `Tetrapoda` | Tetrápodo |
| `Meganisoptera` | Meganisóptero |
| `Diplopoda` | Diplopodo |
| `Elpistostegalia` | Elpistostegalia |
| `Sarcopterygii` | Sarcopterigio |
| `Anaspida` | Anáspido |
| `Rhyniopsida` | Rinoipsida |
| `Graptolithina` | Graptolito |

Si añades un tipo nuevo, recuerda añadir su traducción en las 4 secciones `typeLabels` de `translations.js`.

---

## Añadir una dieta nueva

Las dietas viven exclusivamente en `src/data/dietConfig.js`. El formato es:

```js
"NombreDieta": {
  emoji: "🌿",
  fill: "#color_hex",
  color: {
    text:   "text-color-400",
    bg:     "bg-color-400/10",
    border: "border-color-400/40",
    // ... variantes hover para filtros
  },
  labels: {
    es: "Nombre en español",
    en: "Name in English",
    fr: "Nom en français",
    it: "Nome in italiano",
  },
}
```

Después añade la descripción en `translations.js` → sección `archivo.diets` en los 4 idiomas.

> ⚠️ La key de la dieta debe coincidir **exactamente** con el valor del campo `dieta` en los objetos de animal, incluyendo tildes (`"Carnívoro"`, no `"Carnivoro"`).

---

## Añadir rivales a un animal

El campo `rival` es un array de objetos con `id` y `rol`:

```js
rival: [
  { id: 13, rol: "presa" },       // Este animal es presa del animal con id 13
  { id: 17, rol: "competidor" },  // Compite por recursos con el id 17
]
```

Los roles posibles son:

| Rol | Significado | Color en badge |
|---|---|---|
| `"presa"` | Este animal es la presa | 🔴 Rojo |
| `"depredador"` | Este animal es el depredador | 🔵 Azul |
| `"competidor"` | Rivalidad sin jerarquía | 🟡 Ámbar |

**Regla de consistencia:** si el animal A tiene `{ id: B, rol: "presa" }`, entonces el animal B debe tener `{ id: A, rol: "depredador" }`. Los competidores son siempre mutuos.

---

## Filtro de tamaño — rangos

El campo `longitud` se parsea automáticamente para clasificar a los animales por tamaño. Los rangos son:

| Categoría | Rango |
|---|---|
| Pequeño | < 1 metro |
| Mediano | 1 — 5 metros |
| Grande | 5 — 12 metros |
| Gigante | > 12 metros |

El parser acepta los siguientes formatos en el campo `longitud`:

- `"8.5 metros"` → 8.5 m
- `"30 cm"` → 0.30 m
- `"5 - 10 cm"` → toma el mayor valor → 0.10 m
- `"7.4 - 9 metros"` → toma el mayor valor → 9 m

---

## Páginas de archivo

Cuando el usuario activa un filtro en la LandingPage, aparece un shortcut que lleva a `/archivo` con un parámetro:

| Filtro | URL |
|---|---|
| Dieta | `/archivo?diet=Carnívoro` |
| Tipo | `/archivo?tipo=Theropod` |
| Tamaño | `/archivo?size=gigante` |

La página `ArchivoPage.jsx` lee el parámetro y filtra `allAnimals` en consecuencia. Las descripciones de cada categoría se leen de `translations.js` → `archivo.diets`, `archivo.types` o `archivo.sizes`.
