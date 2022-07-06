import pokemonArray from "./data/pokemon.js";

let cardContainer = document.querySelector(".card-container");
const header = document.querySelector("h1");
const typeList = ["Bug", "Dragon", "Electric", "Fairy", "Fighting",
                    "Fire", "Flying", "Ghost", "Grass", "Ground",
                    "Ice", "Normal", "Poison", "Psychic", "Rock",
                    "Steel", "Water"];


const addCard = (array) => {
    array.forEach((pokemon) => {
        //Define multi-use variables
        const lowercaseName = pokemon.name;
        const type1 = pokemon.types[0];

        //Capitalise name
        const pokemonName = lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1);

        //Add card
        cardContainer.innerHTML += `
            <div class="card">
                <img class="card__image" src="${pokemon.sprite}"/>
                <div class="card__content">
                    <h1 class="card__heading">${pokemonName}</h1>
                    <p class="card__text" id="${pokemonName}">${pokemonName} (#${pokemon.id}) is a ${type1} type pokemon.</p>
                </div>
            </div>
        `;

        //Adjust text if dual-type
        const cardText = document.querySelector(`#${pokemonName}`);

        if (pokemon.types.length == 2){
            const type1Position = cardText.innerText.indexOf(`${type1}`);
            cardText.innerText = cardText.innerText.slice(0, type1Position+type1.length)
                                    + ` & ${pokemon.types[1]}` 
                                    + cardText.innerText.slice(type1Position+type1.length);
        }
    })
}


const addTypeFilter = () => {
    const filterList = document.createElement("div");
    filterList.style.display = "inline-block";
    filterList.style.margin = "0 1rem";
    header.appendChild(filterList);

    filterList.innerHTML += `
        <label for="typeDropdown" style="font-size:0.9rem">Filter by type: </label>
        <select class="typeList" name="typeDropdown">
        <option>All</option>
        </select>
    `;

    const typeFilter = document.querySelector(".typeList");
    for (let i=0; i<typeList.length; i++){
        typeFilter.innerHTML += `<option>${typeList[i]}</option>`;
    }

    typeFilter.addEventListener("change", filterType);
}

const filterType = (event) => {
    const filteredList = [];
    const filter = event.target.value; //gets dropdown value
    cardContainer.innerHTML = " "; //empties screen

    if (filter == "All"){ //no filter - displays all
        addCard(pokemonArray);

    } else{
        pokemonArray.forEach((pokemon) => {
            if (pokemon.types[0] == filter.toLowerCase() || pokemon.types[1] == filter.toLowerCase()){
                filteredList.push(pokemon);
            }
        })
        addCard(filteredList);
    }
}


const addSearchBar = () => {
    const searchBar = document.createElement("div");
    searchBar.style.display = "inline-block";
    header.appendChild(searchBar);
    
    searchBar.innerHTML += `
        <label for="searchBar" style="font-size:0.9rem">Search by name: </label>
        <input class="searchBar" name="searchBar" type="text">
    `;

    const typeFilter = document.querySelector(".typeList");
    for (let i=0; i<typeList.length; i++){
        typeFilter.innerHTML += `<option>${typeList[i]}</option>`;
    }

    searchBar.addEventListener("input", searchPokemon);
}

const searchPokemon = (event) => {
    const searchTerm = event.target.value;
    const searchList = [];
    cardContainer.innerHTML = " ";

    pokemonArray.forEach((pokemon) => {
        if (pokemon.name.search(searchTerm) >= 0){
            searchList.push(pokemon);
        }
    })
    addCard(searchList);
}


window.addEventListener("load", () => {addCard(pokemonArray)});
window.addEventListener("load", addTypeFilter);
window.addEventListener("load", addSearchBar);
