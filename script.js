import pokemonArray from "./data/pokemon.js";
// ^^ an array of pokemon objects

let cardContainer = document.querySelector(".card-container");

const addCard = (pokemonObject) => {
    const name = pokemonObject.name;
    cardContainer.innerHTML += `
        <div class="card">
            <img class="card__image" src="${pokemonObject.sprite}"/>
            <div class="card__content">
                <h1 class="card__heading">${name}</h1>
                <p class="card__text" id="${name}"></p>
            </div>
        </div>
    `;

    let cardText = document.querySelector(`#${name}`);
    
    if (pokemonObject.types.length == 1){
        cardText.innerText += `${name} (#${pokemonObject.id}) is a ${pokemonObject.types[0]} type pokemon.`;
    } else if(pokemonObject.types.length == 2){
        cardText.innerText += `${name} (#${pokemonObject.id}) is a ${pokemonObject.types[0]} & ${pokemonObject.types[1]} type pokemon.`;
    }
}

const loopArray = () => {
    for (let i=0; i<pokemonArray.length; i++){
        addCard(pokemonArray[i]);
    }
}

window.addEventListener("load", loopArray);