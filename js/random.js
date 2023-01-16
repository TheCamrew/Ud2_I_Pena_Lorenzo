const button = document.getElementById("button");
const vignette = document.getElementById("overlay");
const steps = 10;

const defaultSize = 1;
const finalSize = 1.4;
const disp = 5;
const endTime = 1.25;

var item;
var time = 0;
const seqDuration = 5;
var waitToTime;
var interval;
var populationPlaces;

var onSeq = false;
var onZoom = false;
vignette.style.filter = "opacity(0%)";

load();

//Cargamos un juego aleatorio y lo generamos en el DOM
async function load() {
    populationPlaces = [function () {
        item = new BaseItem(document.getElementById("randomCont"), games[0].image, games[0].itemName);
        item.ref.setAttribute("selected", false);
        button.setAttribute("selected", false);
        switchItem();
    }];
}

button.addEventListener("click", function () {
    sequence();
});

//Comenzamos la animacion
function sequence() {
    if (onSeq) {
        return;
    }
    onSeq = true;
    onZoom = true;
    button.style.display = "none";
    waitToTime = time + seqDuration * steps;
    size = defaultSize;
    item.ref.setAttribute("selected", true);
    button.setAttribute("selected", true);

    interval = setInterval(updateTime, 1000 / steps);
}

//Termina la animacion de zoom
function endZoom() {

    switchItem();
    item.ref.style.transform = `scale(  ${finalSize + 0.5}  ) translate(0px, 0px) rotate(0deg)`;

    button.style.display = "block";
    onZoom = false;
}

//Actualizamos la animacion
function updateTime() {
    time++;
    if (time >= waitToTime && onZoom) {
        endZoom();
    }

    if (time >= waitToTime + (endTime * 10)) {
        endSeq();
        return;
    }

    if (onZoom) {
        switchItem();
        size += (finalSize - defaultSize) / (steps * seqDuration);
        item.ref.style.transform = `scale(  ${size}  ) translate(${((time / disp) / 2) - (Math.random() * (time / disp))}px, ${((time / disp) / 2) - (Math.random() * (time / disp))}px) rotate(${((time / disp) / 2) - (Math.random() * (time / disp))}deg) `;
        vignette.style.filter = `opacity(${100 - (100 - time * 2)}%)`;
        vignette.style.backdropFilter = `blur(${time / 10}px)`;
    }

}

//Termina la animacion
function endSeq() {
    clearInterval(interval);
    time = 0;
    onSeq = false;
    vignette.style.filter = "opacity(0%)";
    vignette.style.backdropFilter = `blur(0px)`;
    item.ref.style.transform = `scale(  ${defaultSize}  ) translate(0px, 0px) rotate(0deg)`;
    item.ref.setAttribute("selected", false);
    button.setAttribute("selected", false);

}

//Cambia el juego que aparece
function switchItem() {
    let i = Math.round(Math.random() * (Object.keys(games).length - 1));
    item.itemName = games[i].itemName;
    item.image = games[i].image;
    item.change();
}