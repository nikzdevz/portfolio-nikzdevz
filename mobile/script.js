document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const menu = document.querySelector('.menu');
  
    menuIcon.addEventListener('click', function() {
      if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        menu.classList.add('close');
      } else {
        menu.classList.remove('close');
        menu.classList.add('open');
      }
    });
  });
  