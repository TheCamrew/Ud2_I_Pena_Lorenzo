function populateStore() {

    let min = 999999;
    let max = 0;

    games.forEach(item => {
        storeItems.push(new Item(storeContainer, item.image, item.itemName, item.region, item.price, item.originalPrice));
        if (parseFloat(item.price) < min) {
            min = parseFloat(item.price);
        }
        if (parseFloat(item.price) > max) {
            max = parseFloat(item.price);
        }
    });

    minPrice.value = min;
    maxPrice.value = max;

    generateGenres();
    generateRegions();

    reloadGames();
}

function generateGenres() {

    for (let i = 0; i < genres.length; i++) {

        let button = document.createElement("button");

        button.className = "button";

        button.innerHTML = capitalizeFirstLetter(genres[i]);

        button.onclick = function () { updateGenre(i); };

        button.id = "selectedGenre";

        selectedGenres.push(i);

        genresButtons.push(button);

        genreElementCont.appendChild(button);
    }
}

function updateGenre(i) {

    if (genresButtons[i].id == "selectedGenre") {
        genresButtons[i].id = "";
        selectedGenres[i] = -1;
    } else {
        genresButtons[i].id = "selectedGenre";
        selectedGenres[i] = i;
    }
    reloadGames();
}

function generateRegions() {

    let avReg = [];

    games.forEach(item => {
        let isIn = false;

        avReg.forEach(element => {
            if (item.region == element) {
                isIn = true;
            }
        });

        if (!isIn) {
            avReg.push(regions[item.region]);
        }
    });

    for (let i = 0; i < regions.length; i++) {

        let button = document.createElement("button");

        button.className = "button";

        button.innerHTML = capitalizeFirstLetter(regions[i]);

        button.onclick = function () { updateRegion(i); };

        avReg.forEach(element => {
            if (regions[i] == element) {
                button.id = "selectedRegion";
            }
        });

        selectedRegions.push(i);

        regionButtons.push(button);

        regionElementCont.appendChild(button);
    }
}

function updateRegion(i) {

    if (regionButtons[i].id == "selectedRegion") {
        regionButtons[i].id = "";
        selectedRegions[i] = -1;
    } else {
        regionButtons[i].id = "selectedRegion";
        selectedRegions[i] = i;
    }
    reloadGames();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
            if (parseFloat(games[i].price) >= minPrice.value && parseFloat(games[i].price) <= maxPrice.value) {
                selectedRegions.forEach(region => {
                    if (games[i].region == region) {
                        selectedGenres.forEach(genre => {
                            games[i].genres.forEach(itemGenre => {
                                if (genre == itemGenre) {

                                    storeElements[i].style.display = "block";
                                    count++;
                                }
                            });
                        });
                    }
                });
            }
        }
    }

    if (count == 0) {
        noItem.style.display = "block";
    }
}

const storeContainer = document.getElementById("storeContainer");
const genreElementCont = document.getElementById("genres");
const regionElementCont = document.getElementById("region");
const browserElement = document.getElementById("browser");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");

var genresButtons = [];
var selectedGenres = [];

var regionButtons = [];
var selectedRegions = [];

var storeItems = [];
var storeElements = [];

let temp = document.createElement("p");
temp.innerHTML = "No se encontró ningún elemento :(";
var noItem = storeContainer.appendChild(temp);

var count = 0;

var populationPlaces = [populateStore];

storeElements = storeContainer.getElementsByClassName("defaultItem");