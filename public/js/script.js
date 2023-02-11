const _mobileMenuButton = document.querySelector("#mobile-menu-icon");
const _mobileMenu = document.querySelector("#mobile-menu");
const _bedCover = document.querySelector(".cover");

const _mobileListItems = document.querySelectorAll("#mobile-menu li");

console.log(_mobileListItems);

_mobileMenuButton.addEventListener("click", (event) => {
    const style = getComputedStyle(event.target);

    if(style.height === "25px"){
        showMenu();
    }
    
    if(style.height === "40px"){
        hideMenu();
    }
})

_bedCover.addEventListener("click", hideMenu);

_mobileListItems.forEach((listItem) => {
    listItem.addEventListener("click", () => {
        hideMenu();
    })
})

function showMenu() {
    _mobileMenuButton.style.height = "0px";
    _mobileMenuButton.style.width = "0px";
    _mobileMenuButton.style.opacity = "0";
    setTimeout(() => {
        _mobileMenuButton.style.backgroundImage = "url('../images/icon-menu-close.svg')";
        _mobileMenuButton.style.height = "40px";
        _mobileMenuButton.style.width = "40px";
        _mobileMenuButton.style.opacity = "1";
        _mobileMenu.style.right = "0px";
        _bedCover.style.display = "block";
    }, "250")
}

function hideMenu() {
    _mobileMenuButton.style.height = "0px";
    _mobileMenuButton.style.width = "0px";
    _mobileMenuButton.style.opacity = "0";
    setTimeout(() => {
        _mobileMenuButton.style.backgroundImage = "url('../images/icon-menu.svg')";
        _mobileMenuButton.style.height = "25px";
        _mobileMenuButton.style.width = "40px";
        _mobileMenuButton.style.opacity = "1";
        _mobileMenu.style.right = "-300px";
        _bedCover.style.display = "none";
    }, "250");

    //hide any modals from handlebars templates
    _taskModal.style.display = "none";
}