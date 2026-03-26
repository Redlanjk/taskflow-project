const express = require("express");
const cors = require("cors");

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

// Routing centralizado por recursos
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/projects", projectRoutes);

// 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo global de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`TaskFlow API escuchando en http://localhost:${PORT}/api/v1`);
});