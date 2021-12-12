//DOM Object
const mainScreen = document.querySelector(".main-screen");
const pokeName = document.querySelector(".poke-name");
const pokeId = document.querySelector(".poke-id");
const pokeFrontImage = document.querySelector(".poke-front-image");
const pokeBackImage = document.querySelector(".poke-back-image");
const pokeTypeOne = document.querySelector(".poke-type-one");
const pokeTypeTwo = document.querySelector(".poke-type-two");
const pokeWeight = document.querySelector(".poke-weight");
const pokeHeight = document.querySelector(".poke-height");
const pokeListItems = document.querySelectorAll(".list-item");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");

//Constants and Variables
const TYPES = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"];
let previousUrl = null;
let nextUrl = null;
// FUnctions
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const resetScreen = () => {
  mainScreen.classList.remove("hide");
  for (const type of TYPES) {
    mainScreen.classList.remove(type);
  }
};

function getPokemonById(id = 1) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
      resetScreen();

      const dataTypes = data["types"];
      const dataFirstType = dataTypes[0];
      const dataSecondType = dataTypes[1];
      pokeTypeOne.textContent = capitalize(dataTypes[0]["type"]["name"]);

      if (!dataSecondType) {
        pokeTypeTwo.classList.add("hide");
        pokeTypeTwo.textContent = "";
      } else {
        pokeTypeTwo.textContent = capitalize(dataSecondType["type"]["name"]);
        pokeTypeTwo.classList.remove("hide");
      }

      mainScreen.classList.add(dataFirstType["type"]["name"]);

      pokeName.textContent = capitalize(data["name"]);
      pokeId.textContent = "#" + data["id"].toString().padStart(3, "0");
      pokeWeight.textContent = data["weight"];
      pokeHeight.textContent = data["height"];

      pokeBackImage.src = data["sprites"]["back_default"] || "";
      pokeFrontImage.src = data["sprites"]["front_default"] || "";
    });
}
// get data left screen

//get data right screen
function PokeList(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const { results, previous, next } = data;
      previousUrl = previous;
      nextUrl = next;
      for (let i = 0; i < pokeListItems.length; i++) {
        const pokeListItem = pokeListItems[i];
        const resultData = results[i];
        if (resultData) {
          const { name, url } = resultData;
          const urlArray = url.split("/");
          const id = urlArray[urlArray.length - 2];
          console.log(urlArray);
          pokeListItem.textContent = id + "." + capitalize(name);
          pokeListItem.setAttribute("onclick", `getPokemonById(${id})`);
        } else {
          pokeListItem.textContent = "";
        }
      }
    });
}
//init app

window.onload = function () {
  PokeList("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
  getPokemonById(1);
};
function leftButtonAct() {
  PokeList(previousUrl);
}
function rightButtonAct() {
  PokeList(nextUrl);
}
rightButton.addEventListener("click", rightButtonAct);
leftButton.addEventListener("click", leftButtonAct);
