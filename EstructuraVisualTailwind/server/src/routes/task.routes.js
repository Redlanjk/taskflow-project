const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.delete("/completed", taskController.deleteCompleted);
router.patch("/complete-all", taskController.completeAll);
router.patch("/:id", taskController.patchTaskEstado);
router.delete("/:id", taskController.deleteTask);

module.exports = { taskRoutes: router };
