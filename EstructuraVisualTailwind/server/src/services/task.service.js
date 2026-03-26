let tasks = [];

function obtenerTodas({ projectId } = {}) {
  if (projectId === undefined || projectId === null || Number.isNaN(Number(projectId))) {
    return tasks.slice();
  }
  const pid = Number(projectId);
  return tasks.filter((t) => t.projectId === pid);
}

function crearTarea({ text, priority, category, projectId }) {
  const nueva = {
    id: Date.now(),
    text,
    priority,
    category,
    projectId: Number(projectId),
    estado: "pendiente",
  };

  tasks.push(nueva);
  return nueva;
}

function eliminarTarea(id) {
  const tid = Number(id);
  const idx = tasks.findIndex((t) => t.id === tid);

  if (idx === -1) {
    throw new Error("NOT_FOUND");
  }

  tasks.splice(idx, 1);
}

function actualizarEstado(id, estado) {
  const tid = Number(id);
  const idx = tasks.findIndex((t) => t.id === tid);

  if (idx === -1) {
    throw new Error("NOT_FOUND");
  }

  tasks[idx].estado = estado;
  return tasks[idx];
}

function completeAll({ projectId }) {
  const pid = Number(projectId);
  let updated = 0;

  tasks.forEach((t) => {
    if (t.projectId === pid) {
      t.estado = "completado";
      updated += 1;
    }
  });

  return updated;
}

function deleteCompleted({ projectId }) {
  const pid = Number(projectId);
  const before = tasks.length;

  tasks = tasks.filter((t) => !(t.projectId === pid && t.estado === "completado"));

  return before - tasks.length;
}

function deleteTasksByProjectId(projectId) {
  const pid = Number(projectId);
  tasks = tasks.filter((t) => t.projectId !== pid);
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarEstado,
  completeAll,
  deleteCompleted,
  deleteTasksByProjectId,
};
