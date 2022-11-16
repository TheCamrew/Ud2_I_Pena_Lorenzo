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

        button.onclick = clickButton();

        regionElementCont.appendChild(button);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clickButton(){

}

var store = [];

var regionButtons= [];

var populationPlaces = [populateStore];

populateRegion();