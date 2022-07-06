import pokemonArray from "./data/pokemon.js";

let cardContainer = document.querySelector(".card-container");
const header = document.querySelector("h1");
let typeArray = [];
let typeList = [];


const findTypeList = () => {
    //Big array of every type
    for (let i=0; i<pokemonArray.length; i++){
        for (let j=0; j<pokemonArray[i].types.length; j++){
            typeArray.push(pokemonArray[i].types[j]);
        }
    }
    
    //Alpabetise
    typeList = typeArray.sort();

    //Remove duplicates
    for (let i=typeList.length+1; i>=0; i--){
        if (typeList[i] == typeList[i-1]){
            typeList.splice(i, 1);
        } else{
            continue;
        }
    }
    return typeList;
}

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
        <select class="typeDropdown" name="typeDropdown">
        <option>All</option>
        </select>
    `;

    const typeFilter = document.querySelector(".typeDropdown");
    for (let i=0; i<typeList.length; i++){
        typeList[i] = typeList[i].charAt(0).toUpperCase() + typeList[i].slice(1);
        typeFilter.innerHTML += `<option>${typeList[i]}</option>`;
    }

    typeFilter.addEventListener("change", filterType);
}

const filterType = (event) => {
    const filteredList = [];
    const filter = event.target.value;
    cardContainer.innerHTML = " ";

    if (filter == "All"){
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

    searchBar.addEventListener("input", searchPokemon);
}

const searchPokemon = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const searchList = [];
    cardContainer.innerHTML = " ";

    pokemonArray.forEach((pokemon) => {
        if (pokemon.name.search(searchTerm) >= 0){
            searchList.push(pokemon);
        }
    })
    addCard(searchList);
}


window.addEventListener("load", findTypeList);
window.addEventListener("load", () => {addCard(pokemonArray)});
window.addEventListener("load", addTypeFilter);
window.addEventListener("load", addSearchBar);
