document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskPriority = document.getElementById("task-priority");
    const taskCategory = document.getElementById("task-category");
    const taskList = document.getElementById("task-list");
    const searchInput = document.getElementById("search-input");

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    function guardarTareas() {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function crearTarea(tarea) {

        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card", tarea.priority);

        taskCard.innerHTML = `
            <div class="task-info">
                <h3>${tarea.text}</h3>
                <span class="category">${tarea.category}</span>
            </div>
            <div style="display:flex; gap:10px; align-items:center;">
                <span class="badge">${formatearPrioridad(tarea.priority)}</span>
                <button class="delete-btn">✖</button>
            </div>
        `;

        taskCard.querySelector(".delete-btn").addEventListener("click", () => {
            taskCard.remove();
            tareas = tareas.filter(t => t.id !== tarea.id);
            guardarTareas();
        });

        taskList.appendChild(taskCard);
    }

    function formatearPrioridad(priority) {
        if (priority === "high") return "Alta";
        if (priority === "medium") return "Media";
        return "Baja";
    }

    tareas.forEach(tarea => crearTarea(tarea));

    form.addEventListener("submit", (e) => {
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
        const tarjetas = document.querySelectorAll(".task-card");

        tarjetas.forEach(card => {
            const titulo = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = titulo.includes(texto) ? "flex" : "none";
        });
    });

});