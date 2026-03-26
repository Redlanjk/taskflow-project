import {
  getProjects,
  createProject,
  deleteProject,
  getTasks,
  createTask,
  deleteTask,
  patchTaskEstado,
  patchCompleteAll,
  deleteCompleted,
} from "./src/api/client.js";

document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskPriority = document.getElementById("task-priority");
const taskCategory = document.getElementById("task-category");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");
const completeAllBtn = document.getElementById("complete-all");
const clearCompletedBtn = document.getElementById("clear-completed");
const themeToggle = document.getElementById("theme-toggle");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const projectsSection = document.getElementById("projects-section");
const tasksSection = document.getElementById("tasks-section");
const tabProjects = document.getElementById("tab-projects");
const tabTasks = document.getElementById("tab-tasks");
const tabProjectsMobile = document.getElementById("tab-projects-mobile");
const tabTasksMobile = document.getElementById("tab-tasks-mobile");
const projectForm = document.getElementById("project-form");
const projectNameInput = document.getElementById("project-name");
const projectDescriptionInput = document.getElementById("project-description");
const projectList = document.getElementById("project-list");
const projectSelect = document.getElementById("project-select");
const currentProjectLabel = document.getElementById("current-project-label");
const projectsStatus = document.getElementById("projects-status");
const tasksStatus = document.getElementById("tasks-status");

let tareas = [];
let proyectos = [];
let proyectoActivoId = null;

function setStatus(el, message, kind = "info") {
  if (!el) return;

  if (!message) {
    el.textContent = "";
    el.classList.add("hidden");
    return;
  }

  el.textContent = message;
  el.classList.remove("hidden");

  el.classList.remove("text-red-600", "dark:text-red-400", "text-gray-600", "dark:text-gray-300", "animate-pulse");

  if (kind === "error") {
    el.classList.add("text-red-600", "dark:text-red-400");
    return;
  }

  el.classList.add("text-gray-600", "dark:text-gray-300");
  if (kind === "loading") el.classList.add("animate-pulse");
}

async function cargarProyectos({ preserveActive = true } = {}) {
  setStatus(projectsStatus, "Cargando proyectos...", "loading");

  proyectos = await getProjects();

  if (!preserveActive || proyectoActivoId === null) {
    proyectoActivoId = proyectos[0]?.id ?? null;
  } else if (!proyectos.some((p) => p.id === proyectoActivoId)) {
    proyectoActivoId = proyectos[0]?.id ?? null;
  }

  renderizarProyectos();
  actualizarSelectProyectos();

  setStatus(projectsStatus, "", "success");
}

async function cargarTareas() {
  if (!proyectoActivoId) {
    tareas = [];
    taskList.innerHTML = "";
    setStatus(tasksStatus, "", "success");
    return;
  }

  setStatus(tasksStatus, "Cargando tareas...", "loading");
  tareas = await getTasks({ projectId: proyectoActivoId });

  renderizarTareasParaProyectoActivo();
  setStatus(tasksStatus, "", "success");
}

async function inicializar() {
  try {
    await cargarProyectos({ preserveActive: false });
    if (proyectoActivoId) {
      await cargarTareas();
    } else {
      tareas = [];
      taskList.innerHTML = "";
    }
  } catch (err) {
    setStatus(projectsStatus, err?.message || "Error al cargar proyectos", "error");
    setStatus(tasksStatus, err?.message || "Error al cargar tareas", "error");
  }
}

inicializar();

function formatearPrioridad(priority) {
if (priority === "high") return "Alta";
if (priority === "medium") return "Media";
return "Baja";
}

function formatearEstado(estado) {
return estado === "completado" ? "Completado" : "Pendiente";
}

function crearTarea(tarea) {

const color = {
high: "border-red-500",
medium: "border-yellow-500",
low: "border-green-500"
};

const badge = {
high: "bg-red-500",
medium: "bg-yellow-500",
low: "bg-green-500"
};

const textoEstado =
tarea.estado === "completado" ? "line-through text-gray-400" : "";

const card = document.createElement("div");

card.className = `
flex justify-between items-center
bg-white dark:bg-gray-800
p-4 rounded-xl shadow
border-l-4 ${color[tarea.priority]}
hover:-translate-y-1 hover:shadow-lg
transition
`;

card.dataset.estado = tarea.estado;

card.innerHTML = `

<div>
<h3 class="font-semibold ${textoEstado}">${tarea.text}</h3>
<span class="text-sm text-gray-500">${tarea.category}</span>
<span class="text-xs mt-1 inline-block ${tarea.estado === "completado" ? "text-green-600" : "text-yellow-600"}">
Estado: ${formatearEstado(tarea.estado)}
</span>
</div>

<div class="flex items-center gap-3">

<span class="${badge[tarea.priority]} text-white text-xs px-2 py-1 rounded-full">
${formatearPrioridad(tarea.priority)}
</span>

<button class="toggle-estado-btn text-blue-500 hover:scale-110 transition text-xs px-2 py-1 border border-blue-500 rounded-full">
Alternar estado
</button>

<button class="delete-btn text-red-500 hover:scale-110 transition">
✖
</button>

</div>

`;

card.querySelector(".toggle-estado-btn").addEventListener("click", async () => {

const nuevoEstado = tarea.estado === "completado" ? "pendiente" : "completado";

try {
  await patchTaskEstado(tarea.id, nuevoEstado);
  await cargarTareas();
} catch (err) {
  setStatus(tasksStatus, err?.message || "Error al actualizar tarea", "error");
}

});

card.querySelector(".delete-btn").addEventListener("click", async () => {

try {
  await deleteTask(tarea.id);
  await cargarTareas();
} catch (err) {
  setStatus(tasksStatus, err?.message || "Error al eliminar tarea", "error");
}

});

taskList.appendChild(card);

}

function aplicarFiltros() {

const texto = searchInput.value.toLowerCase();
const estadoSeleccionado = statusFilter.value;

document.querySelectorAll("#task-list > div").forEach(card => {

const titulo = card.querySelector("h3").textContent.toLowerCase();
const estadoCard = card.dataset.estado || "pendiente";

const coincideTexto = titulo.includes(texto);
const coincideEstado =
estadoSeleccionado === "todas" || estadoCard === estadoSeleccionado;

card.style.display = coincideTexto && coincideEstado ? "flex" : "none";

});

}

function renderizarProyectos() {

projectList.innerHTML = "";

proyectos.forEach(proyecto => {

const card = document.createElement("div");

card.className = `
bg-white/90 dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 rounded-xl shadow-sm p-4 flex justify-between items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition
`;

card.innerHTML = `
<button class="delete-project text-red-500 hover:scale-110 transition mt-1">
  ✖
</button>
<div class="flex-1">
  <h3 class="font-semibold text-gray-900 dark:text-gray-100">${proyecto.nombre}</h3>
  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">${proyecto.descripcion || ""}</p>
</div>
<div class="flex flex-col gap-2 items-end mr-3 sm:mr-4">
  <span class="inline-flex items-center justify-center text-xs px-3 py-1 rounded-full border border-transparent ${proyectoActivoId === proyecto.id ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"}">
    ${proyectoActivoId === proyecto.id ? "Activo" : "Inactivo"}
  </span>
  <button class="select-project text-indigo-600 dark:text-indigo-400 text-xs font-medium hover:underline">
    Seleccionar
  </button>
</div>
`;

card.querySelector(".select-project").addEventListener("click", () => {

void establecerProyectoActivo(proyecto.id);

});

card.querySelector(".delete-project").addEventListener("click", async () => {
  try {
    await deleteProject(proyecto.id);
    await cargarProyectos({ preserveActive: false });
    await cargarTareas();
  } catch (err) {
    setStatus(projectsStatus, err?.message || "Error al eliminar proyecto", "error");
  }
});

projectList.appendChild(card);

});

}

function actualizarSelectProyectos() {

projectSelect.innerHTML = `<option value="">Sin proyecto</option>`;

proyectos.forEach(proyecto => {

const option = document.createElement("option");
option.value = proyecto.id;
option.textContent = proyecto.nombre;

if (proyectoActivoId === proyecto.id) {
  option.selected = true;
}

projectSelect.appendChild(option);

});

if (proyectoActivoId) {
const proyectoActivo = proyectos.find(p => p.id === proyectoActivoId);
currentProjectLabel.textContent = proyectoActivo
  ? `Proyecto actual: ${proyectoActivo.nombre}`
  : "Selecciona un proyecto para empezar a crear tareas.";
} else {
currentProjectLabel.textContent = "Selecciona un proyecto para empezar a crear tareas.";
}

}

function renderizarTareasParaProyectoActivo() {

taskList.innerHTML = "";

if (!proyectoActivoId) return;

tareas
  .filter(t => t.projectId === proyectoActivoId)
  .forEach(t => crearTarea(t));

aplicarFiltros();

}

async function establecerProyectoActivo(id) {

  proyectoActivoId = id;

  renderizarProyectos();
  actualizarSelectProyectos();

  await cargarTareas();

}

form.addEventListener("submit", async (e) => {

e.preventDefault();

if (!proyectoActivoId) {
alert("Primero debes seleccionar un proyecto para crear tareas.");
return;
}

const nuevaTarea = {

id: Date.now(),

text: taskInput.value.trim(),

priority: taskPriority.value,

category: taskCategory.value.trim(),
estado: "pendiente",
projectId: proyectoActivoId

};

if (!nuevaTarea.text || !nuevaTarea.category) return;

try {
  setStatus(tasksStatus, "Creando tarea...", "loading");
  await createTask({
    text: nuevaTarea.text,
    priority: nuevaTarea.priority,
    category: nuevaTarea.category,
    projectId: proyectoActivoId,
  });
  await cargarTareas();
} catch (err) {
  setStatus(tasksStatus, err?.message || "Error al crear tarea", "error");
}

form.reset();

});

searchInput.addEventListener("input", aplicarFiltros);

statusFilter.addEventListener("change", aplicarFiltros);

completeAllBtn.addEventListener("click", async () => {
  if (!proyectoActivoId) return;

  try {
    setStatus(tasksStatus, "Marcando todas como completadas...", "loading");
    await patchCompleteAll(proyectoActivoId);
    await cargarTareas();
  } catch (err) {
    setStatus(tasksStatus, err?.message || "Error al marcar tareas", "error");
  }
});

clearCompletedBtn.addEventListener("click", async () => {
  if (!proyectoActivoId) return;

  try {
    setStatus(tasksStatus, "Borrando tareas completadas...", "loading");
    await deleteCompleted(proyectoActivoId);
    await cargarTareas();
  } catch (err) {
    setStatus(tasksStatus, err?.message || "Error al borrar tareas", "error");
  }
});

projectForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const nombre = projectNameInput.value.trim();
  const descripcion = projectDescriptionInput.value.trim();

  if (!nombre) return;

  const estabaSinProyectoActivo = proyectoActivoId === null;

  try {
    setStatus(projectsStatus, "Creando proyecto...", "loading");
    const creado = await createProject({ nombre, descripcion });
    projectForm.reset();

    if (estabaSinProyectoActivo) {
      proyectoActivoId = creado.id;
    }

    await cargarProyectos({ preserveActive: true });

    if (estabaSinProyectoActivo) {
      await cargarTareas();
    }
  } catch (err) {
    setStatus(projectsStatus, err?.message || "Error al crear proyecto", "error");
  }

});

projectSelect.addEventListener("change", async () => {

const valor = projectSelect.value;

if (!valor) {
  proyectoActivoId = null;
  tareas = [];
  taskList.innerHTML = "";
  renderizarProyectos();
  actualizarSelectProyectos();
  setStatus(tasksStatus, "", "success");
  return;
}

await establecerProyectoActivo(Number(valor));

});

function activarTabProyectos() {
projectsSection.classList.remove("hidden");
tasksSection.classList.add("hidden");

tabProjects.classList.add("bg-indigo-600");
tabProjects.classList.remove("hover:bg-indigo-600");
tabTasks.classList.remove("bg-indigo-600");
tabTasks.classList.add("hover:bg-indigo-600");

if (tabProjectsMobile && tabTasksMobile) {
  tabProjectsMobile.classList.add("bg-indigo-600");
  tabProjectsMobile.classList.remove("hover:bg-indigo-600");
  tabTasksMobile.classList.remove("bg-indigo-600");
  tabTasksMobile.classList.add("hover:bg-indigo-600");
}
}

function activarTabTareas() {
tasksSection.classList.remove("hidden");
projectsSection.classList.add("hidden");

tabTasks.classList.add("bg-indigo-600");
tabTasks.classList.remove("hover:bg-indigo-600");
tabProjects.classList.remove("bg-indigo-600");
tabProjects.classList.add("hover:bg-indigo-600");

if (tabProjectsMobile && tabTasksMobile) {
  tabTasksMobile.classList.add("bg-indigo-600");
  tabTasksMobile.classList.remove("hover:bg-indigo-600");
  tabProjectsMobile.classList.remove("bg-indigo-600");
  tabProjectsMobile.classList.add("hover:bg-indigo-600");
}
}

tabProjects.addEventListener("click", activarTabProyectos);
tabTasks.addEventListener("click", activarTabTareas);

if (tabProjectsMobile && tabTasksMobile) {
tabProjectsMobile.addEventListener("click", () => {
  activarTabProyectos();
  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
  }
});

tabTasksMobile.addEventListener("click", () => {
  activarTabTareas();
  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
  }
});
}

if (mobileMenuToggle && mobileMenu) {
mobileMenuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
}


// Modo Oscuro

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

});