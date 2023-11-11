document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offsetTop = targetElement.offsetTop - document.querySelector('.header').offsetHeight;

        window.scroll({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
});


// For Chrome, Safari, and Edge
document.body.style.overflow = 'hidden';

// For Firefox
window.addEventListener('DOMContentLoaded', (event) => {
    document.body.style.overflow = 'auto';
});

document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector('.header');
    var menu = document.querySelector('.menu');

    window.addEventListener('scroll', function () {
        if (window.scrollY >= 80) {
            header.classList.add('scrolled');
            menu.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            menu.classList.remove('scrolled');
        }
    });
});