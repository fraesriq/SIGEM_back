# Backend SIGEM PyME

API REST construida con Node.js, Express y MySQL. Requiere Node.js 20 o superior.

## Instalación

1. Entra en la carpeta `backend` e instala dependencias:

   ```sh
   npm install
   ```

2. Copia `.env.example` a `.env` y configura la conexión MySQL. Cambia `JWT_SECRET` por una clave aleatoria de al menos 32 caracteres.
3. Crea la base de datos indicada en `DB_NAME` y ejecuta `database/migrations/001_create_users_and_products.sql`.
4. Inicia en desarrollo con `npm run dev`, o con `npm start`.

El servidor escucha en el puerto configurado en `PORT` (3000 por defecto). La API usa el prefijo `/api`.

## Rutas iniciales

- `GET /api/health`: estado de la API.
- `POST /api/auth/register`: crea una cuenta y devuelve un token JWT.
- `POST /api/auth/login`: inicia sesión y devuelve un token JWT.
- `GET /api/users/me`: perfil del usuario autenticado.
- `GET /api/users`: lista de usuarios autenticado.
- `GET /api/products`: lista productos autenticado.
- `GET /api/products/:id`: consulta un producto autenticado.
- `POST /api/products`: crea un producto autenticado.
- `PUT /api/products/:id`: actualiza un producto autenticado.
- `DELETE /api/products/:id`: elimina un producto autenticado.

Para las rutas protegidas, envía `Authorization: Bearer <token>`. En esta base inicial, cualquier usuario autenticado puede administrar productos y consultar la lista de usuarios; agrega roles y permisos antes de exponer esas operaciones en producción.

## Estructura

```text
src/
  config/       configuración de entorno y pool MySQL
  middlewares/  autenticación, validación y manejo de errores
  modules/      módulos de autenticación, usuarios y productos
  routes/       composición de rutas de la API
  utils/        logger y respuestas HTTP
  app.js        configuración de Express
  server.js     conexión a MySQL e inicio del servidor
database/
  migrations/   scripts SQL versionados
  seeds/        datos iniciales
tests/          pruebas automatizadas
```
