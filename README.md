# 🦖 PaleoArchivo

**PaleoArchivo** es una enciclopedia interactiva y visual sobre paleontología, que abarca desde el Paleozoico hasta el Cenozoico. Un registro digital diseñado para la divulgación científica con una interfaz de vanguardia.

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
* **📑 Fichas Técnicas Detalladas**: Cada registro cuenta con ID único, dieta con color propio, dimensiones, conservación fósil, era geológica y especies relacionadas.
* **🎨 Diseño "Expedición"**: Paleta de colores técnica basada en sedimentos, fósiles y materiales geológicos.
* **⚡ Navegación Fluida**: Transiciones suaves y efectos de escala (*hover*) mediante **Framer Motion**.
* **🔐 Sistema de Usuarios Completo**: Registro, login con JWT, perfil editable con avatar, bio, cambio de contraseña y borrado de cuenta con confirmación doble.
* **⭐ Sistema de Favoritos**: Guardado persistente en base de datos, vinculado a la cuenta del usuario y limpiado al cerrar sesión.
* **🔍 Buscador con Filtros Combinables**: Búsqueda por texto + filtro de dieta + filtro de tipo, combinables entre sí, con cierre por Escape o clic fuera.
* **🎨 Dietas Extensibles**: Cada dieta tiene su propio color, emoji y traducción en los 4 idiomas, definidos en una única fuente de verdad (`dietConfig.js`). Añadir una dieta nueva requiere solo una entrada en ese archivo.
* **📱 Totalmente Responsive**: Optimizado para dispositivos móviles, tablets y escritorio.

---

## 🗂️ Catálogo

El archivo cuenta actualmente con **25 animales prehistóricos** repartidos en 10 periodos geológicos:

| Era | Periodos |
|---|---|
| Paleozoico | Cámbrico, Ordovícico, Silúrico, Devónico, Carbonífero, Pérmico |
| Mesozoico | Triásico, Jurásico, Cretácico |
| Cenozoico | Paleoceno |

Cada ficha incluye: nombre científico, descripción, dieta, tipo, era, dimensiones, método de hallazgo, material fósil, conservación y extinción.

---

## 🏗️ Arquitectura

```
PaleoArchivo/
├── frontend/               # React + Vite + TailwindCSS
│   └── src/
│       ├── api/            # apiClient.js — axios centralizado con JWT automático
│       ├── components/     # DinoCard, Toast, Header...
│       ├── context/        # UserContext, FavoritesContext
│       ├── data/           # Datos por periodo + dietConfig.js + translations.js
│       ├── hooks/          # useTranslation
│       └── pages/          # LandingPage, DinoDetailPage, ProfilePage...
└── backend/                # Node.js + Express + MongoDB
    ├── middleware/         # auth.js — verificación JWT en rutas protegidas
    ├── models/             # User (con bio, avatar, favoritos)
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
* **Context API** — Gestión global de tema, idioma, usuario y favoritos.
* **Axios** — Cliente HTTP centralizado con inyección automática de JWT.

**Backend**
* **Node.js + Express** — Servidor REST con rutas protegidas por middleware JWT.
* **MongoDB + Mongoose** — Base de datos de documentos para usuarios y favoritos.
* **JSON Web Tokens (JWT)** — Autenticación stateless.
* **bcryptjs** — Hash seguro de contraseñas.

## 🗺️ Roadmap

- [x] Catálogo con 25 animales y fichas técnicas completas
- [x] Sistema de usuarios con JWT (registro, login, perfil, borrado de cuenta)
- [x] Favoritos persistentes en base de datos
- [x] Buscador con filtros combinables de dieta y tipo
- [x] Internacionalización ES / EN / FR / IT
- [x] Dietas extensibles con fuente de verdad única (`dietConfig.js`)
- [ ] Mapa interactivo de hallazgos fósiles por animal
- [ ] Ampliar catálogo: Silúrico, Devónico, Carbonífero, Pérmico, Eoceno, Oligoceno, Mioceno, Plioceno, Pleistoceno, Holoceno

🌐 **[Ver en producción](https://paleoarchivo.vercel.app)**