export async function fetchJson(url, options = {}) {
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    });

    const text = await res.text();
    let is_valid = true;
    let data = null;
    try {
        data = text ? JSON.parse(text) : null
    } catch {
        is_valid = false;
    }

    if (!res.ok) {
        throw new Error(data?.message || `api error: ${res.statusText}`);
    }
    if (!is_valid) {
        throw new Error("not valid JSON");
    }

    return data;
}
