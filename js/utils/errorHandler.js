
export function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (!el) {
        console.warn(`❗ Element with id "${elementId}" not found.`);
        return;
    }
    el.textContent = message;
    el.classList.remove("d-none");
    el.style.color = "red"; // щоб завжди було видно як помилку
}

export function hideError(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.classList.add("d-none");
}
