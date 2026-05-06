# 🦖 PaleoArchivo

**PaleoArchivo** es una enciclopedia interactiva y visual sobre paleontología, que abarca desde el Cámbrico hasta el Holoceno. Un registro digital diseñado para la divulgación científica con una interfaz de vanguardia estilo "archivo de expedición científica".

![Versión Móvil](https://img.shields.io/badge/Mobile-Responsive-brightgreen)
![Vite](https://img.shields.io/badge/Frontend-Vite-646CFF)
![TailwindCSS](https://img.shields.io/badge/Estilos-TailwindCSS-38B2AC)
![Multi-language](https://img.shields.io/badge/Language-ES%20|%20EN%20|%20FR%20|%20IT-orange)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)
![Database](https://img.shields.io/badge/Base%20de%20datos-MongoDB-47A248)
![Auth](https://img.shields.io/badge/Auth-JWT-black)
![Android](https://img.shields.io/badge/Android-APK%20via%20Capacitor-3DDC84)

---

## 📸 Capturas de Pantalla
<img width="1220" height="957" alt="Capture2" src="https://github.com/user-attachments/assets/eafa1e15-845e-4ada-948a-b6fd1281bafb" />
<img width="1859" height="965" alt="Capture 1" src="https://github.com/user-attachments/assets/3df454ac-0698-48b6-b78f-582eda4c781b" />
<img width="1856" height="962" alt="Capture 3" src="https://github.com/user-attachments/assets/7832f700-3084-4e15-bf5d-7119055daa93" />
<img width="1875" height="966" alt="Capture 4" src="https://github.com/user-attachments/assets/68e3c5e6-7026-473f-a050-e712871001eb" />
<img width="1857" height="777" alt="Capture 5" src="https://github.com/user-attachments/assets/83d5241c-1c80-4dfc-aff0-fe43d862eeab" />
<img width="1836" height="558" alt="Capture  7" src="https://github.com/user-attachments/assets/abef96ac-098b-4ea2-9e1a-0341b594e316" />
<img width="778" height="432" alt="Capture 6" src="https://github.com/user-attachments/assets/2cb2608e-88f8-4592-b28e-d7c6919d202b" />
<img width="1852" height="970" alt="Capture 8" src="https://github.com/user-attachments/assets/c0402347-9460-4cc1-b34f-38dfeb993be7" />
<img width="991" height="912" alt="Capture 9" src="https://github.com/user-attachments/assets/0f54331a-3b47-444b-bd22-eefd617c8f72" />
<img width="1792" height="827" alt="Capture 10" src="https://github.com/user-attachments/assets/6ff3581b-e4ff-4915-ad27-4d5974729305" />

---

## ✨ Características Principales

* **🌓 Sistema de Temas Dual** — Modo Oscuro (estética de excavación nocturna) y Modo Claro (estética de archivo de museo científico) con transición animada y persistencia de sesión.
* **🌍 Soporte Multi-idioma** — Interfaz traducida íntegramente al **Español, Inglés, Francés e Italiano** mediante un sistema de traducciones centralizado con hook propio (`useTranslation`).
* **📑 Fichas Técnicas Detalladas** — Cada registro incluye nombre científico, subtítulo, descripción, dieta, tipo, era, dimensiones, método de hallazgo, material fósil, conservación, extinción y rivales biológicos.
* **⚔️ Sistema de Rivalidades Biológicas** — Cada animal puede tener rivales con rol definido (depredador / presa / competidor), con borde de color diferenciado y sección propia en la ficha.
* **⏳ Cronología Geológica Interactiva** — Panel deslizante desde el header con los 16 periodos agrupados por era, ficha de detalle por periodo (descripción, clima, extinción, especies representativas) y chips de animales con navegación directa a su ficha.
* **🏆 Top Favoritos Global** — Ranking en tiempo real de las especies más guardadas por los investigadores del archivo, con medallas, filtros y navegación directa.
* **🔐 Sistema de Usuarios Completo** — Registro, login con JWT, perfil editable con avatar personalizable (foto propia o avatares predefinidos), bio, cambio de contraseña y borrado de cuenta con confirmación doble.
* **⭐ Sistema de Favoritos** — Guardado persistente en base de datos, filtrable por dieta y buscable en tiempo real, con página propia.
* **🔍 Buscador con Filtros Combinables** — Búsqueda por texto + filtro de dieta + tipo + tamaño (pequeño / mediano / grande / gigante), combinables entre sí.
* **📂 Páginas de Archivo por Filtro** — Cada dieta, tipo y tamaño tiene su propia URL con descripción del grupo y grid completo de animales.
* **💡 Dato Curioso Dinámico** — 36 datos paleontológicos en los 4 idiomas con refresh animado en la landing.
* **🎲 Animal Sorpresa** — Widget en el sidebar que selecciona un animal aleatorio del catálogo con animación de flip y botón de descubrir.
* **🎨 Dietas Extensibles** — Cada dieta tiene color, emoji y traducción definidos en una única fuente de verdad (`dietConfig.js`).
* **📱 Totalmente Responsive** — Optimizado para móvil, tablet y escritorio. Disponible también como **APK Android** mediante Capacitor.

---

## 🗂️ Catálogo

El archivo cuenta actualmente con **113 animales prehistóricos** repartidos en **16 periodos geológicos**:

| Era | Periodos |
|---|---|
| Paleozoico | Cámbrico, Ordovícico, Silúrico, Devónico, Carbonífero, Pérmico |
| Mesozoico | Triásico, Jurásico, Cretácico |
| Cenozoico | Paleoceno, Eoceno, Oligoceno, Mioceno, Plioceno, Pleistoceno, Holoceno |

Los animales cubren una enorme diversidad de grupos: terópodos, saurópodos, mamíferos prehistóricos, peces acorazados, artrópodos marinos, cefalópodos, aves no voladoras, reptiles marinos, anfibios primitivos, sinápsidos y mucho más.

---

## 🏗️ Arquitectura

```
PaleoArchivo/
├── frontend/               # React + Vite + TailwindCSS
│   └── src/
│       ├── api/            # apiClient.js — axios centralizado con JWT automático
│       ├── assets/         # Logo y recursos estáticos
│       ├── components/     # DinoCard, Toast, Header, TimelineModal, Footer...
│       ├── context/        # UserContext, FavoritesContext, TimelineContext
│       ├── data/           # Datos por periodo + dietConfig.js + translations.js
│       │                   # + timelineData.js + allData.js
│       ├── hooks/          # useTranslation, useTimeline
│       └── pages/          # LandingPage, DinoDetailPage, ProfilePage,
│                           # FavoritesPage, ArchivoPage, TopFavoritosPage...
└── backend/                # Node.js + Express + MongoDB
    ├── middleware/         # auth.js — verificación JWT en rutas protegidas
    ├── models/             # User (con bio, avatar base64, favoritos)
    └── routes/             # auth.js, user.js, favorites.js
```

---

## 🚀 Tecnologías Utilizadas

**Frontend**
* **React 18** — Biblioteca principal para la construcción de componentes.
* **Vite** — Build tool de alta velocidad para el desarrollo frontend.
* **Tailwind CSS** — Framework de utilidades para el estilizado y diseño adaptativo.
* **Framer Motion** — Motor de animaciones para transiciones y efectos de UI premium.
* **Lucide React** — Set de iconos técnicos y minimalistas.
* **React Router v6** — Navegación con rutas dinámicas y parámetros de búsqueda.
* **Context API** — Gestión global de tema, idioma, usuario, favoritos y cronología.
* **Axios** — Cliente HTTP centralizado con inyección automática de JWT.
* **Capacitor** — Empaquetado como APK Android nativo.

**Backend**
* **Node.js + Express** — Servidor REST con rutas protegidas por middleware JWT.
* **MongoDB + Mongoose** — Base de datos de documentos para usuarios y favoritos.
* **JSON Web Tokens (JWT)** — Autenticación stateless segura.
* **bcryptjs** — Hash seguro de contraseñas.

**Deploy**
* **Vercel** — Frontend en producción con CI/CD automático desde GitHub.
* **Render** — Backend en producción (free tier).
* **MongoDB Atlas** — Cluster en la nube (DinoCluster).

---

## 🗺️ Roadmap

### ✅ Completado
- [x] Catálogo con 113 animales y fichas técnicas completas
- [x] 16 periodos geológicos cubiertos (Cámbrico → Holoceno)
- [x] Sistema de usuarios con JWT (registro, login, perfil, borrado de cuenta)
- [x] Avatar personalizable con foto propia desde dispositivo
- [x] Favoritos persistentes en base de datos con página propia y filtros
- [x] Buscador con filtros combinables de dieta, tipo y tamaño
- [x] Páginas de archivo por dieta, tipo y tamaño con descripción del grupo
- [x] Sistema de rivalidades biológicas (depredador / presa / competidor)
- [x] Internacionalización completa ES / EN / FR / IT
- [x] Dato curioso dinámico con 36 entradas en 4 idiomas
- [x] Widget "Animal Sorpresa" en sidebar con flip animado
- [x] Top Favoritos global con ranking en tiempo real (`/top-favoritos`)
- [x] Cronología geológica interactiva — panel deslizante desde el header
- [x] APK Android v0.2 mediante Capacitor

### 🔜 Próximo — v0.3
- [ ] Mapa interactivo de hallazgos fósiles por animal
- [ ] Comparador de tamaño entre dos animales — "¿cuánto más grande era X que Y?"
- [ ] Paleogeografía — mapa de cómo era la Tierra en cada periodo (Pangea, etc.)

### 📋 v0.4 — Usuarios avanzado
- [ ] Historial de animales visitados recientemente
- [ ] Notas privadas por animal
- [ ] Sistema de logros/insignias: "viste 10 animales", "tienes 5 carnívoros en favoritos"
- [ ] Estadísticas personales en el perfil: era favorita, dieta más vista, animal más visitado
- [ ] Formulario para sugerir animales (requiere cuenta)

### 📋 v0.5 — Contenido expandido
- [ ] Ampliar catálogo: objetivo 200 especies
- [ ] Fichas de extinción masiva: K-Pg, Permo-Triásica, Ordovícica
- [ ] Árbol evolutivo / cladograma interactivo por grupo taxonómico
- [ ] Escalas de tamaño visuales en cada ficha (comparación con humano)
- [ ] Filtro por estado de extinción o calidad de conservación del fósil

### 📋 v0.6 — Búsqueda y descubrimiento
- [ ] Página de búsqueda avanzada con todos los filtros combinados
- [ ] Modo aleatorio — botón "Animal sorpresa" accesible desde cualquier página
- [ ] Relacionados inteligentes en cada ficha por era, dieta y tipo

### 📋 v0.7 — Experiencia y presentación
- [ ] Animación de "excavación" al entrar en una ficha por primera vez
- [ ] Modo presentación / pantalla completa para cada ficha
- [ ] Transiciones animadas entre páginas con Framer Motion

### 📋 v0.8 — Comunidad
- [ ] Sistema de valoración por especie
- [ ] Compartir ficha directamente a Twitter / WhatsApp
- [ ] Ranking semanal de especies más visitadas
- [ ] Modo trivia — preguntas sobre los animales del catálogo

### 📋 v0.9 — Plataforma
- [ ] Modo offline para el catálogo completo (PWA / Capacitor)
- [ ] API pública documentada
- [ ] Soporte de idioma PT (portugués) como quinto idioma

### 📋 v1.0 — Play Store
- [ ] Onboarding / splash screen
- [ ] Política de privacidad y términos de uso
- [ ] Assets de Play Store (screenshots, icono, descripciones en 4 idiomas)
- [ ] Versión firmada y optimizada para producción
- [ ] Ficha en Google Play con categoría Educación

---

## 🌐 Links

🌐 **[Ver en producción](https://paleoarchivo.vercel.app)**  
🐦 **[Twitter / X — @PaleoArchivo](https://twitter.com/PaleoArchivo)**  
💻 **[GitHub — Pegasso-oss/PaleoArchivo](https://github.com/Pegasso-oss/PaleoArchivo)**