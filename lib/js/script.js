const menutoggle = document.querySelector('#menuBtn');
const menuList = document.querySelector('.nav').children;
console.log(menuList);
const menuToggleIcon = document.querySelector('#menuIcon');
const menuButtons = [ menutoggle, menuToggleIcon ];

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('#menu').classList.toggle('show');
        document.querySelector('.menu-header').classList.toggle('flex-row-reverse');
        document.querySelector('li a').classList.toggle('flex-row-reverse');
        menutoggle.classList.toggle('show');
    });
});