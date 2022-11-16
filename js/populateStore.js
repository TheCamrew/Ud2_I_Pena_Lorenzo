function populateStore() {

    games.forEach(item => {
        store.push(new Item(document.getElementById("storeContainer"), item.image, item.itemName, item.region, item.price, item.originalPrice));
    });
}

store = [];

var populationPlaces = [populateStore];