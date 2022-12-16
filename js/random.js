const startGameAmount = 1;

var recentLaunch;

function populateRecentLaunch() {

    games.sort((a, b) => (a.releaseDate < b.releaseDate) ? 1 : -1);

    recentLaunch = new BaseItem(document.getElementById("randomCont"), games[0].image, games[0].itemName, games[0].region, games[0].price, games[0].originalPrice);

}

var populationPlaces = [populateRecentLaunch];
