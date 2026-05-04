# Arquitectura de PaleoArchivo

## Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Frontend | React + Vite | 18 / 5 |
| Estilos | Tailwind CSS | 3 |
| Animaciones | Framer Motion | — |
| Iconos | Lucide React | — |
| Routing | React Router v6 | — |
| HTTP client | Axios | — |
| Mobile | Capacitor | — |
| Backend | Node.js + Express | — |
| Base de datos | MongoDB + Mongoose | — |
| Auth | JWT + bcryptjs | — |

---

## Estructura de carpetas

```
PaleoArchivo/
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       │   └── apiClient.js          # Axios centralizado con JWT automático
│       ├── assets/
│       │   └── logo.png
│       ├── components/
│       │   ├── DinoCard.jsx          # Tarjeta de animal con rivales y favorito
│       │   ├── EraCard.jsx           # Tarjeta de era geológica
│       │   ├── Header.jsx            # Navegación global con tema e idioma
│       │   ├── Toast.jsx             # Notificaciones temporales
│       │   ├── Login.jsx             # Formulario de login
│       │   └── Register.jsx          # Formulario de registro
│       ├── context/
│       │   ├── UserContext.jsx       # Tema, idioma, usuario autenticado
│       │   ├── useUser.js            # Hook para consumir UserContext
│       │   └── FavoritesContext.jsx  # Estado global de favoritos
│       ├── data/
│       │   ├── allData.js            # Agrega todos los periodos en un array
│       │   ├── dietConfig.js         # Fuente de verdad de dietas
│       │   ├── translations.js       # Todas las cadenas de texto en 4 idiomas
│       │   ├── cambrico.js
│       │   ├── ordovicico.js
│       │   ├── silurico.js
│       │   ├── devonico.js
│       │   ├── carbonifero.js
│       │   ├── permico.js
│       │   ├── triasico.js
│       │   ├── jurasico.js
│       │   ├── cretacico.js
│       │   ├── paleoceno.js
│       │   ├── eoceno.js
│       │   ├── oligoceno.js
│       │   ├── mioceno.js
│       │   ├── plioceno.js
│       │   ├── pleistoceno.js
│       │   └── holoceno.js
│       ├── hooks/
│       │   └── useTranslation.js     # Hook que expone t() y tSection()
│       └── pages/
│           ├── LandingPage.jsx       # Home con buscador y filtros
│           ├── DinoDetailPage.jsx    # Ficha completa de un animal
│           ├── ArchivoPage.jsx       # Página de archivo por dieta/tipo/tamaño
│           ├── FavoritesPage.jsx     # Favoritos del usuario
│           └── ProfilePage.jsx       # Perfil y configuración del usuario
│
├── backend/
│   ├── middleware/
│   │   └── auth.js                   # Verificación de JWT en rutas protegidas
│   ├── models/
│   │   └── User.js                   # Modelo Mongoose: username, email, password, bio, avatar, favorites
│   ├── routes/
│   │   ├── auth.js                   # POST /register, POST /login
│   │   ├── user.js                   # GET/PUT /user/:id, DELETE /user/:id, PUT /user/:id/password
│   │   └── favorites.js              # POST /favorites/add
│   └── server.js                     # Entry point, CORS, rutas
│
└── docs/                             # Esta documentación
```

---

## Flujo de datos

### Autenticación

```
Cliente → POST /register o /login
       ← { token, userId, username, avatar }
       → localStorage: auth, token, userId, username, avatar
       → UserContext actualiza el estado global
```

### Favoritos

```
DinoCard (click estrella)
  → apiClient.post("/favorites/add", { userId, dinoId, nombre })
  ← array actualizado de favoritos
  → FavoritesContext.setFavorites(...)
  → DinoCard re-renderiza con estrella activa
```

### Buscador + filtros

```
LandingPage
  → estado local: searchTerm, activeDiet, activeType, activeSize
  → filteredDinos = allAnimals.filter(matchSearch && matchDiet && matchType && matchSize)
  → dropdown de resultados en tiempo real (máx. 8)
  → ArchivoShortcut aparece cuando hay filtro activo → /archivo?diet=X o ?tipo=X o ?size=X
```

### Rivalidades

```
Objeto animal:
  rival: [{ id: 13, rol: "presa" }, { id: 17, rol: "competidor" }]

DinoCard:
  → busca objetos completos en allAnimals por id
  → renderiza badge con foto en escala de grises
  → borde: rojo (presa) | azul (depredador) | ámbar (competidor)

DinoDetailPage:
  → sección "Rivalidad Biológica" con tarjeta por rival
  → texto generado dinámicamente según rol e idioma
```

---

## Gestión de estado

| Estado | Dónde vive | Qué contiene |
|---|---|---|
| Tema (claro/oscuro) | `UserContext` | `theme`, `toggleTheme` |
| Idioma | `UserContext` | `language`, `setLanguage` |
| Favoritos | `FavoritesContext` | `favorites[]`, `isFavorite()`, `setFavorites()` |
| Filtros de búsqueda | `LandingPage` (local) | `activeDiet`, `activeType`, `activeSize`, `searchTerm` |
| Toast | Cada página (local) | `{ show, msg, type }` |

---

## Internacionalización

Todas las cadenas de texto viven en `src/data/translations.js`, organizadas por idioma (`es`, `en`, `fr`, `it`) y sección. El hook `useTranslation` expone:

- `t(key)` — para claves simples
- `tSection(section)` — para obtener un objeto de sección completo

El idioma activo se guarda en `UserContext` y persiste en `localStorage`.

Ver [`traducciones.md`](./traducciones.md) para más detalle.