## TaskFlow

**TaskFlow** es una aplicación web para gestionar tareas organizadas por proyectos. En esta versión, el almacenamiento ya no depende de LocalStorage: el frontend consume una **API REST en Express**.

### Características

* Crear y eliminar **proyectos**
* Añadir **tareas** asociadas a un proyecto
* Definir **prioridad** (Alta, Media, Baja)
* Asignar **categorías** a las tareas
* Cambiar el **estado** de las tareas (Pendiente / Completado)
* **Buscar** tareas por texto
* **Filtrar** tareas por estado
* Marcar **todas las tareas como completadas**
* **Eliminar tareas completadas**
* **Modo oscuro**
* Persistencia de datos mediante **backend Express** (en memoria durante la ejecución)

### Tecnologías utilizadas

* **HTML5**
* **CSS (TailwindCSS)**
* **JavaScript (Vanilla JS)**
* **Node.js + Express** (API REST)
* **fetch** para comunicación cliente-servidor

### Funcionamiento

1. Crear un **proyecto** desde la sección de proyectos.
2. Seleccionar el proyecto activo (al crear un proyecto, se activa automáticamente).
3. Añadir **tareas** indicando nombre, prioridad y categoría.
4. Gestionar tareas cambiando su estado, filtrándolas o eliminándolas.

La información se gestiona mediante el **servidor Express** (persistencia en memoria por ahora).

### Estructura del proyecto

```
/taskflow
 ├── EstructuraVisualTailwind/
 │   ├── index.html
 │   ├── style.css
 │   ├── app.js
 │   ├── src/api/client.js
 │   └── server/ (API Express)
 ├── docs/
 └── README.md
```

### Uso

1. Instalar dependencias del servidor:
   - `cd EstructuraVisualTailwind/server`
   - `npm install`
2. Arrancar el backend (sirve también el frontend):
   - `npm run dev`
3. Abrir la app en:
   - `http://localhost:3000/`

---

Aplicación pensada como práctica de **JavaScript (frontend) y backend con Express (API REST)** aplicando arquitectura por capas, validación defensiva y manejo global de errores.
