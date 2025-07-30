const container = document.getElementById('experienceContainer');
const template = document.getElementById('experienceTemplate');
const addBtn = document.getElementById('addExperience');

function parseEndDate(dateStr) {
    const parts = dateStr.toLowerCase().split('-').map(s => s.trim());
    if (parts.length < 2) return null;
    const monthMap = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };
    const [start, end] = parts;
    const [monStr, yearStr] = end.split('. ');
    const mon = monStr.slice(0, 3);
    const year = parseInt(end.match(/\d{4}/));
    return new Date(year, monthMap[mon] || 0);
}

function updateMostRecent() {
    const cards = Array.from(container.querySelectorAll('.experience-card'));
    let mostRecentCard = null;
    let latestDate = new Date(0);

    cards.forEach(card => {
        const dateStr = card.querySelector('.date-input').value;
        const endDate = parseEndDate(dateStr);
        if (endDate && endDate > latestDate) {
            latestDate = endDate;
            mostRecentCard = card;
        }
    });

    cards.forEach(card => {
        const badge = card.querySelector('.most-recent');
        badge.hidden = card !== mostRecentCard;
        card.style.background = card === mostRecentCard ? '#00c17c20' : '#f6f6f6';
    });

    if (mostRecentCard) container.prepend(mostRecentCard);
}

addBtn.addEventListener('click', () => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.experience-card');

    card.querySelector('.date-input').addEventListener('input', updateMostRecent);
    card.querySelector('.remove-btn').addEventListener('click', () => {
        card.remove();
        updateMostRecent();
    });

    container.appendChild(clone);
    updateMostRecent();
});