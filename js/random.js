const button = document.getElementById("button");
var item;
var time = 0;
var seqDuration = 5;
var waitToTime;
var interval;
var populationPlaces;

var onSeq = false;
const defaultSize = 256;
const finalSize = 320;

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
    //TODO:fix
    item.size(defaultSize);

    button.style.display = "block";
    onSeq = false;
}

function updateTime() {
    time++;
    if (time >= waitToTime) {
        endSeq();
        return;
    }
    switchItem();
    size += (finalSize - defaultSize) / (steps * seqDuration);
    item.size(size);
}

function switchItem() {
    let i = Math.round(Math.random() * (Object.keys(games).length - 1));
    item.itemName = games[i].itemName;
    item.image = games[i].image;
    item.change();
}