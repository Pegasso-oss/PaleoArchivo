# 🦖 PaleoArchivo

**PaleoArchivo** es una enciclopedia interactiva y visual sobre paleontología, que abarca desde el Cámbrico hasta el Holoceno. Un registro digital diseñado para la divulgación científica con una interfaz de vanguardia.

![Versión Móvil](https://img.shields.io/badge/Mobile-Responsive-brightgreen)
![Vite](https://img.shields.io/badge/Frontend-Vite-646CFF)
![TailwindCSS](https://img.shields.io/badge/Estilos-TailwindCSS-38B2AC)
![Multi-language](https://img.shields.io/badge/Language-ES%20|%20EN%20|%20FR%20|%20IT-orange)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)
![Database](https://img.shields.io/badge/Base%20de%20datos-MongoDB-47A248)
![Auth](https://img.shields.io/badge/Auth-JWT-black)

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

* **🌓 Sistema de Temas Dual**: Soporte para **Modo Oscuro** (estética de excavación nocturna) y **Modo Claro** (estética de archivo de museo científico).
* **🌍 Soporte Multi-idioma**: Interfaz traducida íntegramente al **Español, Inglés, Francés e Italiano** con idioma persistente por sesión.
* **📑 Fichas Técnicas Detalladas**: Cada registro cuenta con ID único, dieta con color propio, dimensiones, conservación fósil, era geológica, método de hallazgo, material fósil y especies relacionadas.
* **⚔️ Sistema de Rivalidades Biológicas**: Cada animal puede tener uno o varios rivales con rol definido — **depredador**, **presa** o **competidor** — con borde de color en la card (rojo/azul/ámbar) y sección propia en la ficha de detalle con texto descriptivo en los 4 idiomas.
* **🎨 Diseño "Expedición"**: Paleta de colores técnica basada en sedimentos, fósiles y materiales geológicos.
* **⚡ Navegación Fluida**: Transiciones suaves y efectos de escala (*hover*) mediante **Framer Motion**.
* **🔐 Sistema de Usuarios Completo**: Registro, login con JWT, perfil editable con avatar personalizable (foto propia desde dispositivo o avatares predefinidos), bio, cambio de contraseña y borrado de cuenta con confirmación doble.
* **⭐ Sistema de Favoritos**: Guardado persistente en base de datos, vinculado a la cuenta del usuario, con página propia de favoritos filtrable por dieta y buscable en tiempo real.
* **🔍 Buscador con Filtros Combinables**: Búsqueda por texto + filtro de **dieta** + filtro de **tipo** + filtro de **tamaño** (pequeño / mediano / grande / gigante), combinables entre sí, con cierre por Escape o clic fuera.
* **📂 Páginas de Archivo**: Cada dieta, tipo y tamaño tiene su propia página con descripción del grupo y grid de animales filtrados.
* **💡 Dato Curioso Dinámico**: Panel en la landing con 36 datos paleontológicos aleatorios y botón de refresh animado.
* **🎨 Dietas Extensibles**: Cada dieta tiene su propio color, emoji y traducción en los 4 idiomas, definidos en una única fuente de verdad (`dietConfig.js`).
* **📱 Totalmente Responsive**: Optimizado para dispositivos móviles, tablets y escritorio. Disponible también como **APK Android** mediante Capacitor.

---

## 🗂️ Catálogo

El archivo cuenta actualmente con **113 animales prehistóricos** repartidos en **16 periodos geológicos**:

| Era | Periodos |
|---|---|
| Paleozoico | Cámbrico, Ordovícico, Silúrico, Devónico, Carbonífero, Pérmico |
| Mesozoico | Triásico, Jurásico, Cretácico |
| Cenozoico | Paleoceno, Eoceno, Oligoceno, Mioceno, Plioceno, Pleistoceno, Holoceno |

Cada ficha incluye: nombre científico, subtítulo, descripción, dieta, tipo, era, dimensiones, método de hallazgo, material fósil, conservación, extinción y rivales biológicos.

Los animales cubren una enorme diversidad de grupos: terópodos, saurópodos, mamíferos prehistóricos, peces acorazados, artrópodos marinos, cefalópodos, aves no voladoras, reptiles marinos, anfibios primitivos, sinápsidos y mucho más.

---

## 🏗️ Arquitectura

```
PaleoArchivo/
├── frontend/               # React + Vite + TailwindCSS
│   └── src/
│       ├── api/            # apiClient.js — axios centralizado con JWT automático
│       ├── assets/         # Logo y recursos estáticos
│       ├── components/     # DinoCard, Toast, Header, RivalSkull...
│       ├── context/        # UserContext, FavoritesContext
│       ├── data/           # Datos por periodo + dietConfig.js + translations.js
│       ├── hooks/          # useTranslation
│       └── pages/          # LandingPage, DinoDetailPage, ProfilePage,
│                           # FavoritesPage, ArchivoPage...
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
* **Tailwind CSS** — Framework para el estilizado y diseño adaptativo.
* **Framer Motion** — Motor de animaciones para una experiencia de usuario premium.
* **Lucide React** — Set de iconos técnicos y minimalistas.
* **React Router v6** — Navegación con rutas dinámicas y parámetros de búsqueda.
* **Context API** — Gestión global de tema, idioma, usuario y favoritos.
* **Axios** — Cliente HTTP centralizado con inyección automática de JWT.
* **Capacitor** — Empaquetado como APK Android nativo.

**Backend**
* **Node.js + Express** — Servidor REST con rutas protegidas por middleware JWT.
* **MongoDB + Mongoose** — Base de datos de documentos para usuarios y favoritos.
* **JSON Web Tokens (JWT)** — Autenticación stateless.
* **bcryptjs** — Hash seguro de contraseñas.

**Deploy**
* **Vercel** — Frontend en producción con CI/CD automático desde GitHub.
* **Render** — Backend en producción (free tier).
* **MongoDB Atlas** — Cluster en la nube (DinoCluster).

---

## 🗺️ Roadmap

- [x] Catálogo con 113 animales y fichas técnicas completas
- [x] 16 periodos geológicos cubiertos (Cámbrico → Holoceno)
- [x] Sistema de usuarios con JWT (registro, login, perfil, borrado de cuenta)
- [x] Avatar personalizable con foto propia desde dispositivo
- [x] Favoritos persistentes en base de datos con página propia
- [x] Buscador con filtros combinables de dieta, tipo y tamaño
- [x] Páginas de archivo por dieta, tipo y tamaño
- [x] Sistema de rivalidades biológicas (depredador / presa / competidor)
- [x] Internacionalización ES / EN / FR / IT
- [x] Dato curioso dinámico con 36 entradas
- [x] APK Android mediante Capacitor
- [ ] Mapa interactivo de hallazgos fósiles por animal
- [ ] Ampliar catálogo con más especies por periodo

🌐 **[Ver en producción](https://paleoarchivo.vercel.app)**
