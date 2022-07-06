import "./data/pokemon";
// ^^ an array of pokemon objects

let cardContainer = document.querySelector(".card-container");

const addCard = (pokemonObject) => {
    cardContainer.innerHTML += `
        <div class="card">
            <img class="card__image" src="${pokemonObject.sprite}"/>
            <div class="card__content">
                <h1 class="card__heading">${pokemonObject.name}</h1>
                <p class="card__text"></p>
            </div>
        </div>`;

    let cardText = document.querySelector(".card__text");

    if (pokemonObject.types.length == 1){
        cardText.innerText = `${pokemonObject.name} (#${pokemonObject.id}) is a ${pokemonObject.types[0]} type pokemon.`;
    } else if(pokemonObject.types.length == 2){
        cardText.innerText = `${pokemonObject.name} (#${pokemonObject.id}) is a ${pokemonObject.types[0]} and ${pokemonObject.types[1]} type pokemon.`;
    }
}