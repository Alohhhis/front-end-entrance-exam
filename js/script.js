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

    // Сохраняем текущие стили
    const originalTransform = resume.style.transform;
    const originalTransformOrigin = resume.style.transformOrigin;
    const originalMarginTop = resume.style.marginTop;
    const originalPaddingTop = resume.style.paddingTop;

    const originalBodyMargin = document.body.style.margin;
    const originalHtmlMargin = document.documentElement.style.margin;

    // Убираем отступы в body/html и масштабируем
    document.body.style.margin = '0';
    document.documentElement.style.margin = '0';

    resume.style.marginTop = '0';
    resume.style.paddingTop = '0';
    resume.style.transform = 'scale(0.7)';
    resume.style.transformOrigin = 'top left';

    setTimeout(() => {
        html2pdf().from(resume).save('resume.pdf').then(() => {
            // Возвращаем всё как было
            resume.style.transform = originalTransform;
            resume.style.transformOrigin = originalTransformOrigin;
            resume.style.marginTop = originalMarginTop;
            resume.style.paddingTop = originalPaddingTop;

            document.body.style.margin = originalBodyMargin;
            document.documentElement.style.margin = originalHtmlMargin;
        });
    }, 400);
});



// const editables = document.querySelectorAll('.editable');
// editables.forEach(el => {
//     const key = el.dataset.key;
//     const saved = localStorage.getItem(key);
//     if (saved) el.innerText = saved;
//
//     el.addEventListener('input', () => {
//         localStorage.setItem(key, el.innerText);
//     });
// });
//
// const downloadBtn = document.getElementById('downloadBtn');
// downloadBtn.addEventListener('click', () => {
//     const resume = document.getElementById('resume');
//     html2pdf().from(resume).save('resume.pdf');
// });

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

