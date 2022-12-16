const startGameAmount = 8;

var recentLaunch = Array();
var mostSold = Array();
var populationPlaces;

load();

async function load() {
    populationPlaces = [populateRecentLaunch,
        populateMostSold,
        populateBestPrice
    ];
}

function populateRecentLaunch() {

    games.sort((a, b) => (a.releaseDate < b.releaseDate) ? 1 : -1);

    let counter = 0;

    games.forEach(item => {

        if (counter >= startGameAmount) {
            return;
        }
        recentLaunch.push(new Item(document.getElementById("recent"), item.image, item.itemName, item.region, item.price, item.originalPrice));
        counter++;
    });
}

function populateMostSold() {
    games.sort((a, b) => b.sales - a.sales);

    let counter = 0;

    games.forEach(item => {
        if (counter >= startGameAmount) {
            return;
        }
        console.log(item.sales);
        mostSold.push(new Item(document.getElementById("mostSold"), item.image, item.itemName, item.region, item.price, item.originalPrice));
        counter++;
    });
}

function populateBestPrice() {

    games.sort((a, b) => (1 - (a.price / a.originalPrice) < 1 - (b.price / b.originalPrice)) ? 1 : -1);

    let counter = 0;

    games.forEach(item => {
        if (counter >= startGameAmount) {
            return;
        }
        recentLaunch.push(new Item(document.getElementById("bestPrice"), item.image, item.itemName, item.region, item.price, item.originalPrice));
        counter++;
    });
}
