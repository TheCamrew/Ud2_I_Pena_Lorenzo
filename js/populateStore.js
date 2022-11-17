function populateStore() {

    games.forEach(item => {
        store.push(new Item(storeContainer, item.image, item.itemName, item.region, item.price, item.originalPrice));
    });
}

function populateRegion() {

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
    console.log(selectedRegions);
    reloadGames();
}

function reloadGames() {
    store = [];
    storeContainer.innerHTML = "";

    let count = 0;

    games.forEach(item => {
        if (item.itemName.toUpperCase().search(browserElement.value.toUpperCase()) != -1 || browserElement.value == "") {
            selectedRegions.forEach(element => {
                if (item.region == element) {
                    store.push(new Item(storeContainer, item.image, item.itemName, item.region, item.price, item.originalPrice));
                    count++;
                }
            });
        }
    });

    if (count == 0) {
        storeContainer.innerHTML = "No se encontró ningún elemento :(";
    }
}

const storeContainer = document.getElementById("storeContainer");
const regionElementCont = document.getElementById("region");
const browserElement = document.getElementById("browser");

var store = [];

var regionButtons = [];

var selectedRegions = [];

var populationPlaces = [populateStore];

populateRegion();