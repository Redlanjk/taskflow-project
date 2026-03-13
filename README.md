## TaskFlow

**TaskFlow** es una aplicación web para gestionar tareas organizadas por proyectos. Permite crear proyectos, asignarles tareas y controlar su estado, prioridad y categoría desde una interfaz sencilla.

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
* Persistencia de datos mediante **LocalStorage**

### Tecnologías utilizadas

* **HTML5**
* **CSS (TailwindCSS)**
* **JavaScript (Vanilla JS)**
* **LocalStorage** para guardar proyectos y tareas en el navegador

### Funcionamiento

1. Crear un **proyecto** desde la sección de proyectos.
2. Seleccionar el proyecto activo.
3. Añadir **tareas** indicando nombre, prioridad y categoría.
4. Gestionar tareas cambiando su estado, filtrándolas o eliminándolas.

Toda la información se guarda en el **navegador del usuario**, por lo que no se requiere base de datos ni servidor.

### Estructura del proyecto

```
/taskflow
 ├── index.html
 ├── style.css
 ├── app.js
 └── README.md
```

### Almacenamiento

La aplicación utiliza **LocalStorage** para guardar:

* `proyectos`
* `tareas`
* `proyectoActivoId`
* `theme`

Esto permite que los datos se mantengan aunque se recargue la página.

### Uso

1. Clonar el repositorio o descargar los archivos.
2. Abrir `index.html` en el navegador.
3. Crear proyectos y comenzar a gestionar tareas.

---

Aplicación pensada como práctica de **JavaScript, manipulación del DOM y almacenamiento en el navegador**.
