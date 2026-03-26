const { performance } = require("node:perf_hooks");

// Middleware de auditoría de requests HTTP.
// IMPORTANTE: siempre hacemos `next()`; si lo olvidáis, la request queda colgada.
const loggerAcademico = (req, res, next) => {
  const inicio = performance.now();

  res.on("finish", () => {
    const duracion = performance.now() - inicio;
    console.log(
      `[${req.method}] ${req.originalUrl} - Estado: ${res.statusCode} (${duracion.toFixed(2)}ms)`
    );
  });

  next();
};

module.exports = { loggerAcademico };
