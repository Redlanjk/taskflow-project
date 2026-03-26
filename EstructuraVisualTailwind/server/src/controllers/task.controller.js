const taskService = require("../services/task.service");

const PRIORITIES = new Set(["high", "medium", "low"]);
const ESTADOS = new Set(["pendiente", "completado"]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function parseId(value) {
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

async function getTasks(req, res, next) {
  try {
    const { projectId } = req.query;
    const tasks = taskService.obtenerTodas({ projectId });
    return res.json(tasks);
  } catch (err) {
    return next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const { text, priority, category, projectId } = req.body || {};

    if (!isNonEmptyString(text)) {
      return res.status(400).json({ error: "Texto requerido" });
    }
    if (!PRIORITIES.has(priority)) {
      return res.status(400).json({ error: "Prioridad inválida" });
    }
    if (!isNonEmptyString(category)) {
      return res.status(400).json({ error: "Categoría requerida" });
    }

    const pid = parseId(projectId);
    if (pid === null) {
      return res.status(400).json({ error: "projectId inválido" });
    }

    const nueva = taskService.crearTarea({ text: text.trim(), priority, category: category.trim(), projectId: pid });
    return res.status(201).json(nueva);
  } catch (err) {
    return next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const tid = parseId(req.params.id);
    if (tid === null) return res.status(400).json({ error: "id inválido" });

    taskService.eliminarTarea(tid);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

async function patchTaskEstado(req, res, next) {
  try {
    const tid = parseId(req.params.id);
    if (tid === null) return res.status(400).json({ error: "id inválido" });

    const { estado } = req.body || {};
    if (!ESTADOS.has(estado)) {
      return res.status(400).json({ error: "Estado inválido" });
    }

    const updated = taskService.actualizarEstado(tid, estado);
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
}

async function completeAll(req, res, next) {
  try {
    const { projectId } = req.query;
    const pid = parseId(projectId);
    if (pid === null) return res.status(400).json({ error: "projectId inválido" });

    const updatedCount = taskService.completeAll({ projectId: pid });
    return res.json({ updated: updatedCount });
  } catch (err) {
    return next(err);
  }
}

async function deleteCompleted(req, res, next) {
  try {
    const { projectId } = req.query;
    const pid = parseId(projectId);
    if (pid === null) return res.status(400).json({ error: "projectId inválido" });

    taskService.deleteCompleted({ projectId: pid });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  patchTaskEstado,
  completeAll,
  deleteCompleted,
};
