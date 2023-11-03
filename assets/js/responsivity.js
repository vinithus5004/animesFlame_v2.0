// Initial Data
const menu = document.querySelector('.menu');
const menuMobile = document.querySelector('.menu-mobile');
const menuMobileIcon = document.querySelector('.menu-mobile--icon');
const menuMobileCloseIcon = document.querySelector('.menu-mobile--closeIcon');

const searchBar = document.querySelector('.search-bar--container');
const searchBarMobile = document.querySelector('.search-bar-mobile');
const searchBarCloseIcon = document.querySelector('.search-bar--closeIcon');

// Events
menuMobile.addEventListener('click', () => {
    if(menu.style.display === 'none'){
        showMenu();
    }else{
        hideMenu();
    }
});

searchBarMobile.addEventListener('click', showSearchBar);
searchBarCloseIcon.addEventListener('click', hideSearchBar);

// Functions
function showMenu(){
    menu.style.display = 'block';
    menuMobileIcon.style.display = 'none'
    menuMobileCloseIcon.style.display = 'flex'
    hideSearchBar();
}
function hideMenu(){
    menu.style.display = 'none';
    menuMobileCloseIcon.style.display = 'none'
    menuMobileIcon.style.display = 'flex'
}

function showSearchBar(){
    searchBar.style.display = 'flex'
    hideMenu();
}
function hideSearchBar(){
    searchBar.style.display = 'none'
}