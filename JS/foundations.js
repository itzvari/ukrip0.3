// JS/foundations.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Сторінка "Основи квантових обчислень" успішно завантажена.');
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise();
    }
});
