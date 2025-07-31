const rippleTargets = document.querySelectorAll('.button, .editable');
rippleTargets.forEach(el => {
    el.addEventListener('click', function (e) {
        const circle = document.createElement('span');
        circle.classList.add('ripple');
        const rect = this.getBoundingClientRect();
        circle.style.left = `${e.clientX - rect.left}px`;
        circle.style.top = `${e.clientY - rect.top}px`;
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    });
});
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        createRippleEffect(e, this);
    });
}

const editables = document.querySelectorAll('.editable');
editables.forEach(el => {
    el.addEventListener('click', function(e) {
        createRippleEffect(e, this);
    });

    const key = el.dataset.key;
    const saved = localStorage.getItem(key);
    if (saved) el.innerText = saved;

    el.addEventListener('input', () => {
        localStorage.setItem(key, el.innerText);
    });
});

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size/2}px`;
    ripple.style.top = `${event.clientY - rect.top - size/2}px`;

    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}