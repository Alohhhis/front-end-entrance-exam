const editables = document.querySelectorAll('.editable');
editables.forEach(el => {
    const key = el.dataset.key;
    const saved = localStorage.getItem(key);
    if (saved) el.innerText = saved;

    el.addEventListener('input', () => {
        localStorage.setItem(key, el.innerText);
    });
});

const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', () => {
    const resume = document.getElementById('resume');
    html2pdf().from(resume).save('resume.pdf');
});

document.querySelectorAll('.like-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.stopPropagation();

        const card = icon.closest('.education-card');
        const grid = document.getElementById('educationGrid');
        const currentlyLiked = document.querySelector('.education-card.favorite');

        const isAlreadyLiked = card.classList.contains('favorite');

        if (isAlreadyLiked) {
            card.classList.remove('favorite');
        } else {
            if (currentlyLiked && currentlyLiked !== card) {
                currentlyLiked.classList.remove('favorite');
            }

            card.classList.add('favorite');
            grid.prepend(card);
        }
    });
});

