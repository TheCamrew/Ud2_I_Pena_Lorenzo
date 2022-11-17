function populateStore() {

    games.forEach(item => {
        storeItems.push(new Item(storeContainer, item.image, item.itemName, item.region, item.price, item.originalPrice));
    });

    reloadGames();
}

function generateRegion() {

    for (let i = 0; i < regions.length; i++) {

        let button = document.createElement("button");

        button.className = "regItem";

        button.innerHTML = capitalizeFirstLetter(regions[i]);

        button.onclick = function () { clickButton(i); };

        button.id = "selectedRegion";

        selectedRegions.push(i);

        regionButtons.push(button);

        regionElementCont.appendChild(button);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clickButton(i) {

    if (regionButtons[i].id == "selectedRegion") {
        regionButtons[i].id = "";
        selectedRegions[i] = -1;
    } else {
        regionButtons[i].id = "selectedRegion";
        selectedRegions[i] = i;
    }
    reloadGames();
}

function reloadGames() {

    if (count == 0) {
        noItem.style.display = "none";
    }

    count = 0;

    for (let i = 0; i < storeElements.length; i++) {
        storeElements[i].style.display = "none";
    }

    for (let i = 0; i < games.length; i++) {
        if (games[i].itemName.toUpperCase().search(browserElement.value.toUpperCase()) != -1 || browserElement.value == "") {
            selectedRegions.forEach(element => {
                if (games[i].region == element) {
                    storeElements[i].style.display = "block";
                    count++;
                }
            });
        }
    }

    if (count == 0) {
        noItem.style.display = "block";
    }
}

const storeContainer = document.getElementById("storeContainer");
const regionElementCont = document.getElementById("region");
const browserElement = document.getElementById("browser");

var regionButtons = [];
var selectedRegions = [];

var storeItems = [];
var storeElements = [];

let temp = document.createElement("p");
temp.innerHTML = "No se encontró ningún elemento :(";
var noItem = storeContainer.appendChild(temp);

var count = 0;

var populationPlaces = [populateStore];

generateRegion();

storeElements = storeContainer.getElementsByClassName("defaultItem");