const menutoggle = document.querySelector('#menuBtn');
const menuToggleIcon = document.querySelector('#menuIcon');

const menuList = [...document.querySelectorAll('strong')];
const menuButtons = [ menutoggle, menuToggleIcon ];

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('#menu').classList.toggle('show');
        document.querySelector('.user-info').classList.toggle('d-none');
        menuList.forEach(item => {
            item.classList.toggle('d-none');
        });
        menutoggle.classList.toggle('show');
    });
});