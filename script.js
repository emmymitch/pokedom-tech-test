import pokemonArray from "./data/pokemon.js";

let cardContainer = document.querySelector(".card-container");

const addCard = (pokemonObject) => {
    //Capitalise name
    const lowercaseName = pokemonObject.name;
    pokemonName = lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1);

    //Add card
    cardContainer.innerHTML += `
        <div class="card">
            <img class="card__image" src="${pokemonObject.sprite}"/>
            <div class="card__content">
                <h1 class="card__heading">${pokemonName}</h1>
                <p class="card__text" id="${pokemonName}"></p>
            </div>
        </div>
    `;

    //Adjust text based on number of types
    let cardText = document.querySelector(`#${pokemonName}`);
    
    if (pokemonObject.types.length == 1){
        cardText.innerText += `${pokemonName} (#${pokemonObject.id}) is a ${pokemonObject.types[0]} type pokemon.`;
    } else if(pokemonObject.types.length == 2){
        cardText.innerText += `${pokemonName} (#${pokemonObject.id}) is a ${pokemonObject.types[0]} & ${pokemonObject.types[1]} type pokemon.`;
    }
}

const loopArray = () => {
    for (let i=0; i<pokemonArray.length; i++){
        addCard(pokemonArray[i]);
    }
}

window.addEventListener("load", loopArray);