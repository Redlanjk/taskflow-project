// Middleware de manejo de errores global (4 parámetros).
const errorHandler = (err, req, res, next) => {
  // Evitamos dejar requests colgadas.
  // (En Express no solemos llamar next aquí, salvo que queramos encadenar otro handler).
  if (res.headersSent) return;

  if (err && err.message === "NOT_FOUND") {
    return res.status(404).json({ error: "Recurso no encontrado" });
  }

  // Errores típicos al parsear JSON de entrada (body-parser/express.json).
  // No filtramos detalles técnicos al cliente.
  if (
    err &&
    (err.type === "entity.parse.failed" ||
      err.status === 400 ||
      err.statusCode === 400)
  ) {
    return res.status(400).json({ error: "Solicitud inválida" });
  }

  console.error(err);
  return res.status(500).json({ error: "Error interno del servidor" });
};

module.exports = { errorHandler };
