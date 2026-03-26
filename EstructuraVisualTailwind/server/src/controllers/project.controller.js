const projectService = require("../services/project.service");

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function parseId(value) {
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

async function getProjects(req, res, next) {
  try {
    const projects = projectService.obtenerTodas();
    return res.json(projects);
  } catch (err) {
    return next(err);
  }
}

async function createProject(req, res, next) {
  try {
    const { nombre, descripcion } = req.body || {};

    if (!isNonEmptyString(nombre)) {
      return res.status(400).json({ error: "nombre requerido" });
    }
    if (descripcion !== undefined && descripcion !== null && typeof descripcion !== "string") {
      return res.status(400).json({ error: "descripcion inválida" });
    }

    const nuevo = projectService.crearProyecto({
      nombre: nombre.trim(),
      descripcion: typeof descripcion === "string" ? descripcion.trim() : "",
    });

    return res.status(201).json(nuevo);
  } catch (err) {
    return next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    const pid = parseId(req.params.id);
    if (pid === null) return res.status(400).json({ error: "id inválido" });

    projectService.eliminarProyecto(pid);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = { getProjects, createProject, deleteProject };
