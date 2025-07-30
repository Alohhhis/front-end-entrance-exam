// Ripple effect на клике
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
