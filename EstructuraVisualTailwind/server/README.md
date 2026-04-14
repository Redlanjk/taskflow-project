# TaskFlow API (Express) - Documentación

API RESTful para `tareas` y `proyectos` usando **Express.js** con arquitectura por capas:

## Arquitectura

La app separa responsabilidades en capas estrictas:

- **Routes** (`src/routes/`)
  - Únicamente mapean rutas y verbos HTTP a los controladores.
- **Controllers** (`src/controllers/`)
  - Extraen datos de `req.params`, `req.query` y `req.body`.
  - Realizan validación defensiva en la frontera de red.
  - Devuelven respuestas HTTP con códigos semánticos (`400`, `404`, `201`, `204`).
- **Services** (`src/services/`)
  - Contienen la lógica de negocio en memoria (sin dependencia de Express).
  - Lanzan errores estándar como `throw new Error('NOT_FOUND')` cuando corresponde.
- **Middlewares**
  - `loggerAcademico`: auditoría por request (mide duración en ms).
  - `errorHandler`: manejo global de excepciones (4 parámetros).

## Variables de entorno

Archivo: `./.env`

- `PORT` (obligatoria): puerto donde se monta la API.

`src/config/env.js` carga `dotenv` y aborta el arranque si falta `PORT`.

## Endpoints

Prefijo base: `http://localhost:3000/api/v1`

## Ejecutar la app completa (recomendado)

Este servidor **sirve también el frontend** para evitar problemas de ES Modules cuando se abre el HTML con `file://`.

1. Desde `EstructuraVisualTailwind/server`:
   - `npm install`
   - `npm run dev`
2. Abre:
   - `http://localhost:3000/`

### Proyectos

1. `GET /projects`
   - Devuelve un array con `{ id, nombre, descripcion }`.

2. `POST /projects`
   - `body`:
     - `nombre` (string requerido)
     - `descripcion` (string opcional)
   - Respuesta:
     - `201` con el proyecto creado.
     - `400` si `nombre` no es válido.

3. `DELETE /projects/:id`
   - Respuesta:
     - `204` si se elimina.
     - `404` si el id no existe.

Al eliminar un proyecto, se eliminan también sus tareas (cascada en `task.service`).

### Tareas

1. `GET /tasks`
   - `query` opcional:
     - `projectId` (número)
   - Devuelve un array con `{ id, text, priority, category, projectId, estado }`.

2. `POST /tasks`
   - `body`:
     - `text` (string requerido)
     - `priority` (`high | medium | low`)
     - `category` (string requerido)
     - `projectId` (número requerido)
   - Respuesta:
     - `201` con la tarea creada.
     - `400` si el payload no cumple el contrato.

3. `PATCH /tasks/:id`
   - `body`:
     - `estado` (`pendiente | completado`)
   - Respuesta:
     - `200` con la tarea actualizada.
     - `404` si el id no existe.

4. `DELETE /tasks/:id`
   - Respuesta:
     - `204` si se elimina.
     - `404` si el id no existe.

5. `PATCH /tasks/complete-all?projectId=...`
   - Marca como `completado` todas las tareas del proyecto.
   - Devuelve `200` con `{ updated }`.

6. `DELETE /tasks/completed?projectId=...`
   - Borra todas las tareas `completado` del proyecto.
   - Respuesta: `204`.

## Manejo de errores

- Cuando el service lanza `new Error('NOT_FOUND')`, el middleware global devuelve:
  - `404` con `{ error: "Recurso no encontrado" }`
- Cualquier otro error:
  - se registra en consola (`console.error(err)`)
  - respuesta `500` con `{ error: "Error interno del servidor" }`

## Ejemplos rápidos (Postman)

### 1) Crear proyecto (201)

- `POST /api/v1/projects`
- Body (JSON):
  ```json
  {
    "nombre": "Nuevo Proyecto",
    "descripcion": "Demo"
  }
  ```

### 2) Crear tarea inválida (400)

- `POST /api/v1/tasks`
- Body (JSON):
  ```json
  { "text": "", "priority": "high", "category": "Dev", "projectId": 1 }
  ```

Debe devolver `400`.

### 3) Borrar tarea inexistente (404)

- `DELETE /api/v1/tasks/999999`

Debe devolver `404`.

## Scripts

Desde `server/`:

- `npm run dev` - con `nodemon`
- `npm run start` - ejecución directa

