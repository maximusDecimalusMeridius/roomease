const _roomieList = document.querySelector("#roomie-list");

_roomieList.addEventListener("click", (event) => {
    if(!event.target.parentNode.style.maxHeight || event.target.parentNode.style.maxHeight == "50px"){
        event.target.parentNode.style.maxHeight = "fit-content";
    } else if(event.target.parentNode.style.maxHeight == "fit-content"){
        event.target.parentNode.style.maxHeight = "50px";
    }
})