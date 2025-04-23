import { fetchJson } from "./utils.js";


const base = import.meta.env.VITE_BASE_URL + "/tasks";


export async function getTasksApi() {
    return fetchJson(base);
}

export async function createTaskApi(payload) {
    return fetchJson(base, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export async function getTaskApi(id) {
    return fetchJson(`${base}/${id}`);
}

export async function updateTaskApi(id, payload) {
    return fetchJson(`${base}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export async function deleteTaskApi(id) {
    return fetchJson(`${base}/${id}`, {
        method: 'DELETE',
    });
}

export async function toggleTaskApi(id) {
    return fetchJson(`${base}/${id}/toggle`, {
        method: 'POST',
    });
}

export async function toggleSubtaskApi(id, index) {
    return fetchJson(`${base}/${id}/${index}/toggle`, {
        method: 'POST',
    });
}