const button = document.getElementById("button");

var item;
var time = 0;
var seqDuration = 5;
var waitToTime;
var interval;
var populationPlaces;

var onSeq = false;

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
    waitToTime = time + seqDuration * 10;
    interval = setInterval(updateTime, 100);
}

function endSeq() {
    clearInterval(interval);
    time = 0;
    console.log("end");
    item.itemName = "obamna";

    onSeq = false;
}

function updateTime() {
    time++;
    if (time >= waitToTime) {
        endSeq();
    }
    switchItem();
}

function switchItem() {
    //TODO:Do the thingies
    let i = Math.round(Math.random() * (Object.keys(games).length - 1));
    item.itemName = games[i].itemName;
    item.image = games[i].image;
    item.change();
}