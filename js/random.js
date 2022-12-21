const button = document.getElementById("button");
const vignette = document.getElementById("overlay");
const steps = 10;

const defaultSize = 1;
const finalSize = 1.2;
const disp = 5;

var item;
var time = 0;
const seqDuration = 5;
var waitToTime;
var interval;
var populationPlaces;

var onSeq = false;
vignette.style.filter = "opacity(0%)";

load();

async function load() {
    populationPlaces = [function () {
        item = new BaseItem(document.getElementById("randomCont"), games[0].image, games[0].itemName);
    }];
}

button.addEventListener("click", function () {
    sequence();
});

function sequence() {
    if (onSeq) {
        return;
    }
    onSeq = true;
    button.style.display = "none";
    waitToTime = time + seqDuration * steps;
    size = defaultSize;
    interval = setInterval(updateTime, 1000 / steps);
}

function endSeq() {
    clearInterval(interval);
    time = 0;

    switchItem();
    item.ref.style.transform = `scale(  ${defaultSize}  ) translate(0px, 0px) rotate(0deg)`;

    button.style.display = "block";
    onSeq = false;
    vignette.style.filter = "opacity(0%)";
    vignette.style.backdropFilter = `blur(0px)`;
}

function updateTime() {
    time++;
    if (time >= waitToTime) {
        endSeq();
        return;
    }
    switchItem();
    size += (finalSize - defaultSize) / (steps * seqDuration);
    item.ref.style.transform = `scale(  ${size}  ) translate(${((time / disp) / 2) - (Math.random() * (time / disp))}px, ${((time / disp) / 2) - (Math.random() * (time / disp))}px) rotate(${((time / disp) / 2) - (Math.random() * (time / disp))}deg) `;
    vignette.style.filter = `opacity(${100 - (100 - time * 2)}%)`;
    vignette.style.backdropFilter = `blur(${time / 10}px)`;

}

function switchItem() {
    let i = Math.round(Math.random() * (Object.keys(games).length - 1));
    item.itemName = games[i].itemName;
    item.image = games[i].image;
    item.change();
}