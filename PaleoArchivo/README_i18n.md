# PaleoArchivo — Internacionalización (i18n)

## Archivos entregados

```
frontend/src/
├── data/
│   └── translations.js          ← REEMPLAZA el anterior (ES/EN/FR/IT completo)
├── hooks/
│   └── useTranslation.js        ← NUEVO hook, créa la carpeta hooks/
├── context/
│   └── UserContext.jsx          ← REEMPLAZA (ahora persiste idioma en localStorage)
├── components/
│   ├── DinoCard.jsx             ← REEMPLAZA
│   ├── Login.jsx                ← REEMPLAZA
│   ├── Register.jsx             ← REEMPLAZA
│   └── Toast.jsx                ← REEMPLAZA
└── pages/
    ├── LandingPage.jsx          ← REEMPLAZA
    ├── DinoDetailPage.jsx       ← REEMPLAZA
    ├── FavoritesPage.jsx        ← REEMPLAZA
    ├── ProfilePage.jsx          ← REEMPLAZA
    ├── PeriodPage.jsx           ← NUEVO componente genérico para períodos
    ├── PaleozoicoPage.jsx       ← REEMPLAZA
    ├── MesozoicoPage.jsx        ← REEMPLAZA
    ├── CenozoicoPage.jsx        ← REEMPLAZA
    ├── PaleogenoPage.jsx        ← REEMPLAZA
    ├── CambricoPage.jsx         ← REEMPLAZA (ahora usa PeriodPage)
    ├── OrdovicicoPage.jsx       ← REEMPLAZA (ahora usa PeriodPage)
    ├── TriasicoPage.jsx         ← REEMPLAZA (ahora usa PeriodPage)
    ├── JurasicoPage.jsx         ← REEMPLAZA (ahora usa PeriodPage)
    ├── CretacicoPage.jsx        ← REEMPLAZA (ahora usa PeriodPage)
    └── PaleocenoPage.jsx        ← REEMPLAZA (ahora usa PeriodPage)
```

---

## Uso del hook

```jsx
import { useTranslation } from '../hooks/useTranslation';

const MyComponent = () => {
  const { t, tSection } = useTranslation();

  // Acceso por ruta con notación de punto:
  const label = t('header.login');          // "Iniciar Sesión" / "Log In" / ...

  // Interpolación:
  const msg = t('profile.viewAll', { n: 7 }); // "Ver los 7 favoritos →"

  // Objeto completo de una sección (más rápido si usas muchas claves):
  const dd = tSection('dinoDetail');
  return <p>{dd.fossilConservation}</p>;
};
```

---

## Secciones del archivo translations.js

| Sección       | Descripción                                      |
|---------------|--------------------------------------------------|
| `header`      | Header: login, logout, menú, subtítulos          |
| `landing`     | Landing: héroe, buscador, filtros, eras          |
| `eraPage`     | Páginas de eras y períodos geológicos            |
| `dinoCard`    | Tarjeta de animal: longitud, altura, toast       |
| `dinoDetail`  | Página de detalle: todos los campos y labels     |
| `favorites`   | Página de favoritos                              |
| `profile`     | Perfil completo: secciones, campos, modales      |
| `login`       | Formulario de inicio de sesión                   |
| `register`    | Formulario de registro                           |
| `toast`       | Labels del componente Toast                      |
| `typeLabels`  | Nombres de tipos (Theropod, Sauropod…)           |
| `dietLabels`  | Nombres de dietas en el idioma seleccionado      |

---

## Fix incluido: persistencia de idioma

El `UserContext.jsx` anterior no guardaba el idioma en `localStorage` al cambiarlo — solo lo leía al arrancar. Ahora `setLanguage` llama a `localStorage.setItem('lang', lang)` automáticamente.

---

## Componente PeriodPage

Las 6 páginas de períodos individuales (Cámbrico, Ordovícico, Triásico, Jurásico, Cretácico, Paleoceno) eran idénticas salvo el color y el título. Ahora todas usan `PeriodPage.jsx`:

```jsx
// Ejemplo para añadir un período nuevo (Silúrico, Devónico, etc.)
import PeriodPage from './PeriodPage';
import { dinosaurios } from '../data/silurico';

const SilúricoPage = () => (
  <PeriodPage data={dinosaurios} title="Silúricos" accentColor="text-teal-500" accentHex="#14b8a6" />
);
```

---

## Archivos que NO cambian

- `App.jsx` — las rutas no cambian
- `FavoritesContext.jsx` — sin cambios
- `useUser.js` — sin cambios
- `Header.jsx` — ya usaba `translations`, sigue igual
- `EraCard.jsx`, `ScrollToTop.jsx`, `SettingsMenu.jsx` — sin cambios
- Todo el backend — sin cambios
