window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.promo__menu'),
    menuItem = document.querySelectorAll('.promo__menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('promo__menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('promo__menu_active');
        })
    })
})