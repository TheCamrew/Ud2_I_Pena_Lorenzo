const regions = ["Global", "Europa", "Asia", "África", "Oceania", "América", "Antártida"];
const genres = [
    "Acción",
    "Aventura",
    "Horror",
    "Supervivencia",
    "Mundo Abierto",
    "Battle Royale",
    "Sandbox",
    "Plataformas",
    "Ritmo",
    "RTS",
    "Puzzles",
    "Disparos",
    "RPG",
    "MMORPG",
    "Incremental",
    "Deducción",
    "Deportes",
    "Carreras"
];
const modes = ["Un Jugador", "Multijugador", "Cooperativo"];

//Clase item base (se usa para el juego aleatorio)
class BaseItem {
    image;
    itemName;
    parent;
    nameRef;
    imageRef;
    ref;

    constructor(parent, image, itemName) {
        this.image = image;
        this.itemName = itemName;
        this.parent = parent;

        this.generate(this.parent);
    }

    //Crea el elemento en el DOM
    generate() {
        this.ref = document.createElement("a");
        this.ref.className = "defaultItem";
        this.parent.appendChild(this.ref);

        this.imageRef = document.createElement("img");
        this.imageRef.className = "itemImage";
        this.imageRef.src = "img/itemImages/" + this.image + ".png";
        this.ref.appendChild(this.imageRef);

        let itemInfo = document.createElement("div");
        itemInfo.className = "itemInfo";
        this.ref.appendChild(itemInfo);

        this.nameRef = document.createElement("h1");
        this.nameRef.innerHTML = this.itemName;
        itemInfo.appendChild(this.nameRef);
    }

    //Cambia la imagen del elemento y su nombre
    change() {
        this.nameRef.innerHTML = this.itemName;
        this.imageRef.src = "img/itemImages/" + this.image + ".png";
    }

    //Cambia el tamaño del elemento
    size(size) {
        this.ref.style.maxWidth = size + "px";
        this.ref.style.width = size + "px";
        this.imageRef.style.maxWidth = size + "px";
        this.imageRef.style.width = size + "px";
    }
}

//Clase item del juego
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
        this.parent = parent;

        this.generate(this.parent);
    }

    //Crea el elemento en el DOM
    generate() {
        let item = document.createElement("a");
        item.className = "defaultItem";
        this.parent.appendChild(item);

        let image = document.createElement("img");
        image.className = "itemImage";
        image.src = "img/itemImages/" + this.image + ".png";
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

        if (this.itemName == "Buscaminas") {
            item.onclick = increaseSecret;
        }
    }
}

//Leemos el JSON con los datos
async function loadJson() {
    try {
        games = await fetch("../assets/games.json").then((response) => response.json());
    } catch (error) {
        console.log(error);
    }
    return games;
}

//Populamos los distintos elementos con los datos
async function loadGames() {

    games = await loadJson();

    populationPlaces.forEach(element => {
        element();
    });
}

//Datos del JSON
var games;

//Funcion que indica como popular las distintas secciones
var populationPlaces = [];

await loadGames();

var secretCount = 0;

function increaseSecret() {
    secretCount++;
    if (secretCount >= 10) {
        window.open("../secret.html");
        secretCount = 0;
    }
}