const express = require("express");
const cors = require("cors");
const path = require("node:path");

const { PORT } = require("./config/env");
const { loggerAcademico } = require("./middlewares/loggerAcademico");
const { errorHandler } = require("./middlewares/errorHandler");

const { taskRoutes } = require("./routes/task.routes");
const { projectRoutes } = require("./routes/project.routes");

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(loggerAcademico);

// Servir frontend (para evitar problemas de ES Modules con file://)
const webRoot = path.join(__dirname, "..", "..");
app.use(express.static(webRoot));

// Routing centralizado por recursos
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/projects", projectRoutes);

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(webRoot, "index.html"));
});

// 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo global de errores
app.use(errorHandler);

// Para desarrollo local: si ejecuto server/src/index.js directamente, escucho
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`TaskFlow API escuchando en http://localhost:${PORT}/api/v1`);
  });
}

// Para Vercel / Serverless: exportamos la app
module.exports = app;