const API_BASE = "http://localhost:3000/api/v1";

async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // Para 204 (No Content) no hay body.
  if (res.status === 204) return null;

  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!res.ok) {
    const message = data?.error || data?.message || res.statusText || "Error";
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export async function getProjects() {
  return apiFetch("/projects");
}

export async function createProject({ nombre, descripcion }) {
  return apiFetch("/projects", {
    method: "POST",
    body: JSON.stringify({ nombre, descripcion }),
  });
}

export async function deleteProject(id) {
  return apiFetch(`/projects/${id}`, { method: "DELETE" });
}

export async function getTasks({ projectId } = {}) {
  const query = projectId ? `?projectId=${encodeURIComponent(projectId)}` : "";
  return apiFetch(`/tasks${query}`);
}

export async function createTask({ text, priority, category, projectId }) {
  return apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify({ text, priority, category, projectId }),
  });
}

export async function deleteTask(id) {
  return apiFetch(`/tasks/${id}`, { method: "DELETE" });
}

export async function patchTaskEstado(id, estado) {
  return apiFetch(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ estado }),
  });
}

export async function patchCompleteAll(projectId) {
  return apiFetch(`/tasks/complete-all?projectId=${encodeURIComponent(projectId)}`, {
    method: "PATCH",
  });
}

export async function deleteCompleted(projectId) {
  return apiFetch(`/tasks/completed?projectId=${encodeURIComponent(projectId)}`, {
    method: "DELETE",
  });
}

