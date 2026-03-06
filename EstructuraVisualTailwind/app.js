document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskPriority = document.getElementById("task-priority");
const taskCategory = document.getElementById("task-category");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const themeToggle = document.getElementById("theme-toggle");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
localStorage.setItem("tareas", JSON.stringify(tareas));
}

function formatearPrioridad(priority) {
if (priority === "high") return "Alta";
if (priority === "medium") return "Media";
return "Baja";
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

const card = document.createElement("div");

card.className = `
flex justify-between items-center
bg-white dark:bg-gray-800
p-4 rounded-xl shadow
border-l-4 ${color[tarea.priority]}
hover:-translate-y-1 hover:shadow-lg
transition
`;

card.innerHTML = `

<div>
<h3 class="font-semibold">${tarea.text}</h3>
<span class="text-sm text-gray-500">${tarea.category}</span>
</div>

<div class="flex items-center gap-3">

<span class="${badge[tarea.priority]} text-white text-xs px-2 py-1 rounded-full">
${formatearPrioridad(tarea.priority)}
</span>

<button class="delete-btn text-red-500 hover:scale-110 transition">
✖
</button>

</div>

`;

card.querySelector(".delete-btn").addEventListener("click", () => {

card.remove();

tareas = tareas.filter(t => t.id !== tarea.id);

guardarTareas();

});

taskList.appendChild(card);

}

tareas.forEach(t => crearTarea(t));

form.addEventListener("submit", e => {

e.preventDefault();

const nuevaTarea = {

id: Date.now(),

text: taskInput.value.trim(),

priority: taskPriority.value,

category: taskCategory.value.trim()

};

if (!nuevaTarea.text || !nuevaTarea.category) return;

tareas.push(nuevaTarea);

guardarTareas();

crearTarea(nuevaTarea);

form.reset();

});

searchInput.addEventListener("input", () => {

const texto = searchInput.value.toLowerCase();

document.querySelectorAll("#task-list > div").forEach(card => {

const titulo = card.querySelector("h3").textContent.toLowerCase();

card.style.display = titulo.includes(texto) ? "flex" : "none";

});

});


// Modo Oscuro

themeToggle.addEventListener("click", () => {

document.documentElement.classList.toggle("dark");

localStorage.setItem(
"theme",
document.documentElement.classList.contains("dark") ? "dark" : "light"
);

});

if (localStorage.getItem("theme") === "dark") {

document.documentElement.classList.add("dark");

}

});