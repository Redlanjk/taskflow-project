const taskService = require("./task.service");

let projects = [];

function obtenerTodas() {
  return projects.slice();
}

function crearProyecto({ nombre, descripcion }) {
  const nuevo = {
    id: Date.now(),
    nombre,
    descripcion: descripcion || "",
  };

  projects.push(nuevo);
  return nuevo;
}

function eliminarProyecto(id) {
  const pid = Number(id);
  const idx = projects.findIndex((p) => p.id === pid);

  if (idx === -1) {
    throw new Error("NOT_FOUND");
  }

  projects.splice(idx, 1);
  // Cascada: eliminamos tareas asociadas.
  taskService.deleteTasksByProjectId(pid);
}

module.exports = {
  obtenerTodas,
  crearProyecto,
  eliminarProyecto,
};
