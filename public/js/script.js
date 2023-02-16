const _mobileMenuButton = document.querySelector("#mobile-menu-icon");
const _mobileMenu = document.querySelector("#mobile-menu");
const _mobileListItems = document.querySelectorAll("#mobile-menu li");
const _navMenu = document.querySelector("#nav-menu");
const _bedCover = document.querySelector(".cover");
const _hbsBody = document.querySelector(".hbs-body");

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

//runs on page load from the <body>
function setItUp() {
    //Hide menu for login screen/path
    if(location.pathname == "/" || location.pathname == "/signup"){
        document.querySelector("#nav-menu").style.display = "none";
        document.querySelector("#mobile-menu-icon").style.display = "none";
    }

    //set colors according to pathname
    if(location.pathname == "/tasks"){
        // _hbsBody.style.background = "none";
        _hbsBody.style.background = "var(--tasks)";
    }
    if(location.pathname == "/events"){
        _hbsBody.style.background = "none";
        _hbsBody.style.backgroundColor = "var(--events)";
    }
    if(location.pathname == "/roommates"){
        _hbsBody.style.background = "none";
        _hbsBody.style.backgroundColor = "var(--roommates)";
    }
    if(location.pathname == "/uoms"){
        _hbsBody.style.background = "none";
        _hbsBody.style.backgroundColor = "var(--uoms)";
    }
}

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
    }, "50")
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
    }, "50");

    //hide any modals from handlebars templates
    if(location.pathname == "/tasks"){
        _taskModal.style.display = "none";
    }
    if(location.pathname == "/events"){
        _eventModal.style.display = "none";
    }
    if(location.pathname == "/uoms"){
        _uomModal.style.display = "none";
    }
}