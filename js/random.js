function populateStore() {

    item = new Item(storeContainer, item.image, item.itemName, item.region, item.price, item.originalPrice);

}
const randomCont = document.getElementById("randomCont");

var item;

var populationPlaces = [populateStore];