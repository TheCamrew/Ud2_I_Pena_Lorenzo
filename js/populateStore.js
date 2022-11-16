const regionElementCont = document.getElementById("region");

function populateStore() {

    games.forEach(item => {
        store.push(new Item(document.getElementById("storeContainer"), item.image, item.itemName, item.region, item.price, item.originalPrice));
    });
}

function populateRegion() {

    for (let i = 0; i < regions.length; i++) {

        let button = document.createElement("button");

        button.className = "regItem";

        button.innerHTML = capitalizeFirstLetter(regions[i]);

        button.onclick = function () { clickButton(i); };

        button.id = "selectedRegion";
        selectedRegionButtons.push(true);

        regionButtons.push(button);

        regionElementCont.appendChild(button);

    }
    console.log(regionElementCont);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clickButton(i) {

    if (regionButtons[i].id == "selectedRegion") {
        regionButtons[i].id = "";
        selectedRegionButtons[i] = false;
    } else {
        regionButtons[i].id = "selectedRegion";
        selectedRegionButtons[i] = true;
    }

    reloadGames();

}

function reloadGames() {
    store = [];
    document.getElementById("storeContainer").innerHTML = "";
    games.forEach(item => {

        regions.forEach(element => {
            if (item.region == element) {
                store.push(new Item(document.getElementById("storeContainer"), item.image, item.itemName, item.region, item.price, item.originalPrice));
            }
        });
    });
}

var store = [];

var regionButtons = [];

var selectedRegionButtons = [];

var populationPlaces = [populateStore];

populateRegion();