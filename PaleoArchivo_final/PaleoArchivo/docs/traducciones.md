# Sistema de Traducciones

PaleoArchivo soporta **4 idiomas**: Español (`es`), Inglés (`en`), Francés (`fr`) e Italiano (`it`).

---

## Arquitectura

El sistema se compone de tres piezas:

| Archivo | Rol |
|---|---|
| `src/data/translations.js` | Fuente de verdad de todas las cadenas de texto |
| `src/context/UserContext.jsx` | Almacena el idioma activo (`language`) |
| `src/hooks/useTranslation.js` | Expone las funciones de traducción a los componentes |

El idioma activo se persiste en `localStorage` bajo la key `language` y se puede cambiar desde la página de perfil.

---

## Hook `useTranslation`

```js
const { t, tSection } = useTranslation();
```

### `tSection(seccion)`

Devuelve el objeto completo de una sección para el idioma activo.

```js
const lnd = tSection("landing");
// lnd.heroTitle → "Explora" (en español)
// lnd.heroTitle → "Explore" (en inglés)
```

### `t(key, params?)`

Para claves anidadas con notación de punto (uso menos frecuente).

```js
t("header.login") // → "Iniciar Sesión"
```

---

## Estructura de `translations.js`

```js
export const translations = {
  es: {
    header:    { ... },
    landing:   { eras: { paleozoico: { desc: "..." }, ... }, ... },
    eraPage:   { mesozoico: { triasico: { desc: "..." }, ... }, ... },
    dinoCard:  { ... },
    dinoDetail:{ ... },
    favorites: { ... },
    profile:   { ... },
    login:     { ... },
    register:  { ... },
    toast:     { ... },
    typeLabels:{ Theropod: "Terópodo", ... },
    archivo: {
      diets: { "Carnívoro": "...", ... },
      types: { Theropod: "...", ... },
      sizes: { pequeño: "...", mediano: "...", grande: "...", gigante: "..." },
    },
  },
  en: { /* misma estructura */ },
  fr: { /* misma estructura */ },
  it: { /* misma estructura */ },
}
```

---

## Secciones disponibles

| Sección | Usado en |
|---|---|
| `header` | `Header.jsx` |
| `landing` | `LandingPage.jsx` |
| `eraPage` | Páginas de era y periodo |
| `dinoCard` | `DinoCard.jsx` |
| `dinoDetail` | `DinoDetailPage.jsx` |
| `favorites` | `FavoritesPage.jsx` |
| `profile` | `ProfilePage.jsx` |
| `login` | `Login.jsx` |
| `register` | `Register.jsx` |
| `toast` | `Toast.jsx` |
| `typeLabels` | Filtros, `FavoritesPage`, `DinoDetailPage` |
| `archivo.diets` | `ArchivoPage.jsx` — descripción de dietas |
| `archivo.types` | `ArchivoPage.jsx` — descripción de tipos |
| `archivo.sizes` | `ArchivoPage.jsx` — descripción de tamaños |

---

## Añadir una cadena nueva

1. Añade la key en la sección correspondiente del idioma `es`.
2. Añade la misma key con su traducción en `en`, `fr` e `it`.
3. Consúmela en el componente con `tSection("seccion").tuKey`.

**Ejemplo:**

```js
// translations.js
es: {
  dinoDetail: {
    // ... existentes
    rivalrySection: "Rivalidad Biológica",
  },
  // ...
}
en: {
  dinoDetail: {
    rivalrySection: "Biological Rivalry",
  },
}
// etc.

// En el componente:
const dd = tSection("dinoDetail");
<p>{dd.rivalrySection}</p>
```

---

## Añadir un idioma nuevo

1. Copia el bloque completo de `es` en `translations.js`.
2. Renómbralo con el código ISO del nuevo idioma (p.ej. `"de"` para alemán).
3. Traduce todas las cadenas.
4. Añade el nuevo idioma al selector en `ProfilePage.jsx`:

```jsx
{ code: "de", label: "Deutsch", active: "bg-yellow-400 text-black border-yellow-400" }
```

5. Actualiza `UserContext.jsx` si hay alguna lógica que dependa de la lista de idiomas.

---

## Traducciones de dietas

Las **labels de dieta** (el texto del badge) no viven en `translations.js` sino en `dietConfig.js`, bajo la key `labels` de cada dieta:

```js
"Carnívoro": {
  labels: {
    es: "Carnívoro",
    en: "Carnivore",
    fr: "Carnivore",
    it: "Carnivoro",
  },
  // ...
}
```

El hook `useTranslation` genera `dietLabels` dinámicamente a partir de `dietConfig.js`. Para obtener el label de una dieta usa la función:

```js
import { getDietLabel } from "../data/dietConfig";
getDietLabel("Carnívoro", language) // → "Carnivore" en inglés
```

---

## Notas

- Las **descripciones largas** de los animales (campo `descripcion`) están solo en español. Si en el futuro se quieren traducir, el patrón recomendado sería añadir un campo `descripcion_en`, `descripcion_fr`, etc. en cada objeto de animal, o mover las descripciones a `translations.js` indexadas por `id`.
- Los **nombres propios** de los animales (`nombre`, `subName`) no se traducen — son nombres científicos o apodos universales.