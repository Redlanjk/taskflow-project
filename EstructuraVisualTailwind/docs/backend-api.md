# Documentación backend TaskFlow

## Descripción
API RESTful para gestionar proyectos y tareas.

## Endpoints
- GET /api/v1/projects
- POST /api/v1/projects
- DELETE /api/v1/projects/:id
- GET /api/v1/tasks?projectId=...
- POST /api/v1/tasks
- DELETE /api/v1/tasks/:id
- PATCH /api/v1/tasks/:id
- PATCH /api/v1/tasks/complete-all?projectId=...
- DELETE /api/v1/tasks/completed?projectId=...

## Variables de entorno
- `PORT` en `server/.env`

## Estructura en capas
- `routes/` : define rutas Express.
- `controllers/` : validan petición, llaman a servicios y devuelven respuesta HTTP.
- `services/` : lógica pura (persistencia en memoria en este ejercicio).
- `middlewares/` : logging y manejo global de errores.

## Flow desde frontend
- `src/api/client.js` usa `fetch('/api/v1/...')`
- `app.js` renderiza estados: `loading`, `success`, `error`.

## Notas Vercel
- se usa `vercel.json` para redirigir `/api/v1/*` a `server/src/index.js`.
- frontend se sirve directamente desde la raíz `index.html`.
