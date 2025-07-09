
// ✅ Inicialización segura de PerfectScrollbar
document.addEventListener("DOMContentLoaded", function () {
    const scrollTargets = ['.product-list', '.customers-list'];

    scrollTargets.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            new PerfectScrollbar(el);
        }
    });
});
