document.addEventListener('DOMContentLoaded', () => {

    const footer = document.getElementById('site-footer');
    if (footer) {
        footer.innerHTML = `
            <div class="footer-inner">
                <div class="footer-year">2026–2027</div>
                <div class="footer-line">Кібербезпека, Розширений квантовий криптоаналіз неабелевих груп: алгоритм Куперберга.</div>
                <div class="footer-line">Перехрест Варвара · КЗЗСО ліцей №10 ЖМР</div>
            </div>`;
    }

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        const linkPath = href.split('#')[0];
        if (linkPath && linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector(':scope > .dropdown-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', event => {
            event.preventDefault();
            const willOpen = !dropdown.classList.contains('open');

            document.querySelectorAll('.dropdown.open').forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('open');
                    const otherToggle = other.querySelector(':scope > .dropdown-toggle');
                    if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                }
            });

            dropdown.classList.toggle('open', willOpen);
            toggle.setAttribute('aria-expanded', String(willOpen));
        });
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
                const toggle = dropdown.querySelector(':scope > .dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });
        }
    });
});
