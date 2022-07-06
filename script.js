import pokemonArray from "./data/pokemon.js";

let cardContainer = document.querySelector(".card-container");

const addCard = (pokemonObject) => {
    //Define multi-use variables
    const lowercaseName = pokemonObject.name;
    const type1 = pokemonObject.types[0];

    //Capitalise name
    const pokemonName = lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1);

    //Add card
    cardContainer.innerHTML += `
        <div class="card">
            <img class="card__image" src="${pokemonObject.sprite}"/>
            <div class="card__content">
                <h1 class="card__heading">${pokemonName}</h1>
                <p class="card__text" id="${pokemonName}">${pokemonName} (#${pokemonObject.id}) is a ${type1} type pokemon.</p>
            </div>
        </div>
    `;

    //Adjust text if dual-type
    const cardText = document.querySelector(`#${pokemonName}`);

    if (pokemonObject.types.length == 2){
        const type1Position = cardText.innerText.indexOf(`${type1}`);
        cardText.innerText = cardText.innerText.slice(0, type1Position+type1.length)
                                + ` & ${pokemonObject.types[1]}` 
                                + cardText.innerText.slice(type1Position+type1.length);
    }
}

const loopArray = () => {
    for (let i=0; i<pokemonArray.length; i++){
        addCard(pokemonArray[i]);
    }
}

window.addEventListener("load", loopArray);