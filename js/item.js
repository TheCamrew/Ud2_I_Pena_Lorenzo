const regions = ["Global", "Europa", "Asia", "África", "Oceania", "América", "Antártida"];
const genres = ["Acción", "Aventura","Supervivencia","Mundo Abierto", "Battle Royale"];

class Item {
    image;
    itemName;
    region;
    price;
    originalPrice;

    constructor(parent, image, itemName, region, price, originalPrice) {
        this.image = image;
        this.itemName = itemName;
        this.region = regions[region];
        this.price = price;
        this.originalPrice = originalPrice;

        this.generate(parent);
    }

    generate(parent) {
        let item = document.createElement("a");
        item.className = "defaultItem";
        parent.appendChild(item);

        let image = document.createElement("img");
        image.className = "itemImage";
        image.src = "img/itemImages/" + this.image;
        item.appendChild(image);

        let itemInfo = document.createElement("div");
        itemInfo.className = "itemInfo";
        item.appendChild(itemInfo);

        let itemTitle = document.createElement("div");
        itemTitle.innerHTML = this.itemName;
        itemInfo.appendChild(itemTitle);

        let itemText = document.createElement("div");
        itemText.className = "itemText";
        itemInfo.appendChild(itemText);

        let itemRegion = document.createElement("div");
        itemRegion.className = "itemRegion";
        itemRegion.innerHTML = this.region;
        itemText.appendChild(itemRegion);

        let div = document.createElement("div");
        itemText.appendChild(div);

        let itemPrice = document.createElement("div");
        itemPrice.className = "itemPrice";
        itemPrice.innerHTML = this.price + "€";
        div.appendChild(itemPrice);

        let itemDiscount = document.createElement("div");
        itemDiscount.className = "itemDiscount";
        itemDiscount.innerHTML = this.originalPrice + "€";
        div.appendChild(itemDiscount);
    }
}

async function loadJson() {
    try {
        games = await fetch("../assets/games.json").then((response) => response.json()
        );
    } catch (error) {
        console.log(error);
    }
    return games;
}

async function loadGames() {

    games = await loadJson();

    populationPlaces.forEach(element => {
        element();
    });
}

var games;

var populationPlaces = [];

loadGames();