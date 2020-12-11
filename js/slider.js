var icon = document.getElementById("menu");
var slider = document.getElementById("slider");

document.addEventListener("scroll",closeSlider);

/**
* This function open (or close) the slide menu.
*/
function openSlider() {
    if(icon.innerHTML === "menu_open") {
        closeSlider();
    } else {
        icon.innerHTML = "menu_open";
        slider.style.width = "300px";
    }
}

/**
* This function close the slide menu.
*/
function closeSlider() {
    icon.innerHTML = "menu";
    slider.style.width = "0";
}
