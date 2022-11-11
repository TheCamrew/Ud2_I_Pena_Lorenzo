const regions = ["global", "europa", "asia", "africa", "oceania", "america", "antartida"];

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

var games;

loadGames();

var recentLaunch = Array();
var mostSold = Array();

async function loadJson() {
    var games;
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

    populateRecentLaunch();
    populateMostSold();
}

function populateRecentLaunch() {
    games.forEach(item => {
        recentLaunch.push(new Item(document.getElementById("recent"), item.image, item.itemName, item.region, item.price, item.originalPrice));
    });
}

function populateMostSold() {
    games.forEach(item => {
        mostSold.push(new Item(document.getElementById("mostSold"), item.image, item.itemName, item.region, item.price, item.originalPrice));
    });
}
