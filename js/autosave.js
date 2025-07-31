document.addEventListener('DOMContentLoaded', () => {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');

    editableElements.forEach(el => {
        const key = el.dataset.key || el.innerText.substring(0, 20);
        const saved = localStorage.getItem(`editable-${key}`);
        if (saved) el.innerHTML = saved;

        el.addEventListener('input', () => {
            localStorage.setItem(`editable-${key}`, el.innerHTML);
        });
    });
});