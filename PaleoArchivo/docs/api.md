# API del Backend

Base URL en producción: `https://paleoarchivo.onrender.com`

Base URL en desarrollo: `http://localhost:4000`

> El backend usa free tier de Render y puede tardar ~50 segundos en despertar tras inactividad.

---

## Autenticación

Las rutas protegidas requieren el header:

```
Authorization: Bearer <token>
```

El token se obtiene al hacer login o registro y se almacena en `localStorage` bajo la key `token`. El cliente Axios (`apiClient.js`) lo inyecta automáticamente en cada petición.

---

## Rutas de autenticación

### `POST /register`

Registra un nuevo usuario.

**Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Respuesta 200:**
```json
{
  "token": "jwt_string",
  "userId": "mongo_id",
  "username": "STRING_UPPERCASE",
  "avatar": ""
}
```

**Errores:**
- `400` — Campos vacíos o email ya registrado.

---

### `POST /login`

Inicia sesión con usuario/email y contraseña.

**Body:**
```json
{
  "identifier": "usuario_o_email",
  "password": "string"
}
```

**Respuesta 200:**
```json
{
  "token": "jwt_string",
  "userId": "mongo_id",
  "username": "STRING_UPPERCASE",
  "avatar": "base64_o_url"
}
```

**Errores:**
- `400` — Credenciales incorrectas.

---

## Rutas de usuario

### `GET /user/:id`

Obtiene los datos del usuario. Ruta protegida.

**Respuesta 200:**
```json
{
  "_id": "mongo_id",
  "username": "string",
  "email": "string",
  "bio": "string",
  "avatar": "base64_o_url",
  "favorites": [{ "id": 10, "nombre": "ALLOSAURUS" }],
  "createdAt": "ISO_date"
}
```

---

### `PUT /user/:id`

Actualiza los datos del perfil. Ruta protegida.

**Body (todos opcionales):**
```json
{
  "username": "string",
  "email": "string",
  "bio": "string",
  "avatar": "base64_string_o_url"
}
```

> ⚠️ El avatar se guarda como string en MongoDB. Si se envía en base64, asegúrate de que el límite de body de Express esté configurado en al menos `10mb`:
> ```js
> app.use(express.json({ limit: "10mb" }));
> ```

**Respuesta 200:** objeto de usuario actualizado.

---

### `PUT /user/:id/password`

Cambia la contraseña del usuario. Ruta protegida.

**Body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

**Respuesta 200:**
```json
{ "msg": "Contraseña actualizada" }
```

**Errores:**
- `400` — Contraseña actual incorrecta.
- `400` — Nueva contraseña demasiado corta (mínimo 6 caracteres, validado también en frontend).

---

### `DELETE /user/:id`

Elimina la cuenta del usuario y todos sus datos. Ruta protegida.

**Body:**
```json
{ "password": "string" }
```

**Respuesta 200:**
```json
{ "msg": "Cuenta eliminada" }
```

---

## Rutas de favoritos

### `POST /favorites/add`

Añade o elimina un favorito (toggle). Ruta protegida.

**Body:**
```json
{
  "userId": "mongo_id",
  "dinoId": 10,
  "nombre": "ALLOSAURUS"
}
```

**Respuesta 200:** array actualizado de favoritos del usuario.

```json
[
  { "id": 10, "nombre": "ALLOSAURUS" },
  { "id": 13, "nombre": "ESTEGOSAURUS" }
]
```

---

## Modelo de usuario (MongoDB)

```js
{
  username:  String  (requerido, único),
  email:     String  (requerido, único),
  password:  String  (hash bcrypt),
  bio:       String  (default: ""),
  avatar:    String  (default: ""),  // URL o base64
  favorites: [{ id: Number, nombre: String }],
  createdAt: Date    (default: Date.now)
}
```

---

## CORS

Los orígenes permitidos en producción son:

```js
[
  "https://paleoarchivo.vercel.app",
  "http://localhost:5173",
  "https://localhost",
  "capacitor://localhost",
]
```

Si despliegas el frontend en otro dominio, añádelo al array `ALLOWED_ORIGINS` en `server.js` y redespliega en Render.