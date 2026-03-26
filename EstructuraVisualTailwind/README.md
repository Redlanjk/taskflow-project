# TaskFlow - Gestor de Tareas y Proyectos

Aplicación para crear proyectos y dentro de ellos crear tareas para gestionar. El código está ordenado en 3 capas diferentes para mantener todo claro y fácil de mantener.

## 📋 Tabla de Contenidos

- [Cómo está estructurado](#cómo-está-estructurado)
- [Cómo ejecutar](#cómo-ejecutar)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Endpoints de la API](#endpoints-de-la-api)
- [Tecnologías usadas](#tecnologías-usadas)

---

## 🏗️ Cómo está estructurado

El código está dividido en 3 capas para mantener cada parte con una responsabilidad clara:

### Backend (Node.js + Express)

```
server/src/
├── config/          # Configuración (variables de entorno)
├── controllers/     # Valida las solicitudes del navegador
├── services/        # Contiene la lógica del negocio
├── routes/          # Mapea las URLs a los controllers
├── middlewares/     # Maneja logs y errores
└── index.js         # Inicia la aplicación
```

**Cómo funciona el flujo:**

```
Usuario hace clic en "Crear tarea"
         ↓
Navegador envía POST a /api/v1/tasks
         ↓
Express identifica la ruta y llama al controller
         ↓
Controller valida los datos recibidos
         ↓
Si están bien, le pasa los datos al service
         ↓
Service ejecuta la lógica (por ejemplo, guardar en memoria)
         ↓
Controller devuelve el resultado con código HTTP apropiado
         ↓
Navegador recibe la respuesta y la muestra
```

#### Las 3 capas

**1. Routes** - Solo mapea URLs a funciones
```javascript
router.post("/", taskController.createTask);
router.delete("/:id", taskController.deleteTask);
```

**2. Controllers** - Valida que los datos sean correctos
```javascript
async function createTask(req, res, next) {
  // Valida los datos
  if (!text || !priority) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  
  // Si todo está bien, llama al service
  const task = taskService.crearTarea({ text, priority, ... });
  
  // Devuelve el resultado con código 201 (creado)
  return res.status(201).json(task);
}
```

**3. Services** - Contiene la lógica
```javascript
function crearTarea({ text, priority, projectId }) {
  const nueva = {
    id: Date.now(),
    text,
    priority,
    projectId,
    estado: "pendiente",
  };
  
  tasks.push(nueva);
  return nueva;
}
```

### Frontend (JavaScript e Tailwind CSS)

```
/
├── index.html       # La página HTML
├── style.css        # Los estilos compilados
├── app.js           # Toda la lógica JavaScript
├── src/api/
│   └── client.js    # Funciones para comunicarse con el servidor
└── tailwind.config.js
```

**Cómo funciona:**

1. **client.js** - Funciones para hablar con el servidor
   ```javascript
   async function getTasks() {
     const res = await fetch('http://localhost:3000/api/v1/tasks');
     return res.json();
   }
   ```

2. **app.js** - Gestiona el estado y la interfaz
   - `cargarProyectos()` - Obtiene proyectos del servidor
   - `cargarTareas()` - Obtiene tareas del servidor
   - `renderizarProyectos()` - Dibuja los proyectos en la página
   - Muestra errores si algo falla

3. **HTML y CSS** - Formularios y estilos
   - Formularios para crear proyectos y tareas
   - Botones para eliminar, cambiar estado
   - Tema oscuro y diseño responsive

---

## 🚀 Cómo Ejecutar

### Paso 1: Iniciar el servidor

```bash
cd server
npm run dev
```

Deberías ver:
```
TaskFlow API escuchando en http://localhost:3000/api/v1
```

### Paso 2: Servir el frontend

```bash
python -m http.server 5500
```

### Paso 3: Abrir en navegador

```
http://localhost:5500
```

¡Listo! La aplicación está funcionando.

### Si algo falla

**"Cannot find module express"**
```bash
cd server && npm install
```

**"PORT already in use" (Puerto en uso)**
Cambiar en `server/.env`:
```
PORT=3001
```

Luego actualizar `src/api/client.js`:
```javascript
const API_BASE = "http://localhost:3001/api/v1";
```

**"Conexión rechazada"**
- Verifica que el servidor esté corriendo
- Verifica que el cliente apunta a `localhost:3000`
- Abre la consola del navegador (F12) para ver los errores

---

## 📁 Estructura de Carpetas

```
EstructuraVisualTailwind/
├── server/                    ← Backend Node.js
│   ├── src/
│   │   ├── index.js          # Inicia Express
│   │   ├── config/env.js     # Lee variables de entorno
│   │   ├── controllers/      # Valida las solicitudes
│   │   ├── services/         # Contiene la lógica
│   │   ├── routes/           # Mapea URLs
│   │   └── middlewares/      # Logs y manejo de errores
│   ├── .env                  # Variables (PORT=3000)
│   └── package.json          # npm run dev
│
├── src/api/client.js         # Funciones fetch
├── index.html                # Página principal
├── app.js                    # Lógica JavaScript
├── style.css                 # Estilos
│
└── docs/backend-api.md       # Información adicional
```

---

## 🔌 Endpoints de la API

Base: `http://localhost:3000/api/v1`

### Proyectos

```
GET    /projects              → Obtener todos los proyectos
POST   /projects              → Crear un proyecto
DELETE /projects/:id          → Eliminar un proyecto
```

**Ejemplo para crear:**
```json
{
  "nombre": "Mi Proyecto",
  "descripcion": "Una descripción opcional"
}
```

### Tareas

```
GET    /tasks                 → Obtener todas (o ?projectId=123)
POST   /tasks                 → Crear una tarea
PATCH  /tasks/:id             → Cambiar el estado (pendiente/completado)
DELETE /tasks/:id             → Eliminar una tarea
PATCH  /tasks/complete-all    → Marcar todas como completadas
DELETE /tasks/completed       → Eliminar todas las completadas
```

**Ejemplo para crear:**
```json
{
  "text": "Hacer algo importante",
  "priority": "high",
  "category": "Backend",
  "projectId": 123
}
```

### Códigos HTTP que devuelve

```
200 → Correcto, todo bien
201 → Creado (POST exitoso)
204 → Eliminado (DELETE exitoso)
400 → Error en los datos enviados
404 → Recurso no encontrado
500 → Error en el servidor
```
---

## 🛠️ Tecnologías usadas

**Backend**
- **Express.js** - Framework para crear servidores HTTP
- **Node.js** - Entorno de ejecución para JavaScript
- **dotenv** - Para leer variables del archivo .env
- **CORS** - Para permitir solicitudes desde otros dominios
- **Nodemon** - Recarga automática al guardar cambios

**Frontend**
- **JavaScript vanilla** - Sin frameworks adicionales
- **Fetch API** - Para hacer solicitudes HTTP
- **Tailwind CSS** - Estilos predefinidos
- **Dark mode** - Tema oscuro/claro

---

## ✨ Características Implementadas

✅ Crear y eliminar proyectos  
✅ Crear y eliminar tareas  
✅ Cambiar el estado de las tareas (pendiente/completado)  
✅ Buscar tareas por nombre  
✅ Filtrar tareas por estado  
✅ Cambiar entre tema oscuro y claro  
✅ Diseño responsive (funciona en móvil y desktop)  
✅ Registro de tiempo de respuesta de cada solicitud  

---

## 🎓 Por qué está organizado así

- **Capas separadas**: Si necesito cambiar la base de datos, solo modifico la capa de servicios
- **Validación en controllers**: Así me aseguro de que los datos malos no llegan a la lógica
- **Servicios sin dependencias**: Puedo probar la lógica sin necesidad de Express o HTTP
- **Errores centralizados**: Un middleware atrapa todos los errores, sin necesidad de try-catch en todos lados

---

## 🚀 Próximos pasos

- Agregar base de datos (MongoDB o PostgreSQL)
- Implementar autenticación de usuarios
- Escribir tests automáticos
- Desplegar en un servidor (Vercel, Heroku, etc)

---

**Versión:** 1.0  
**Última actualización:** 2026
