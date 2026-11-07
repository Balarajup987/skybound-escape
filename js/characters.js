
export const characters = [
    {
        id: 1,
        name: "Manoj",
        image: "./assets/characters/person1.png",
        gameOverImage: "./assets/characters/manoj2.jpeg"
    },
    {
        id: 2,
        name: "Akshay",
        image: "./assets/characters/person2.png",
        gameOverImage: "./assets/characters/akshay2.jpeg"
    }
];

export let selectedCharacter = null;

export function renderCharacters() {
    const grid = document.getElementById("characterGrid");
    grid.innerHTML = "";

    characters.forEach(character => {
        const card = document.createElement("div");
        card.className = "character-card";

        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
        `;

        card.addEventListener("click", () => {
            selectCharacter(character, card);
        });

        grid.appendChild(card);
    });
}

function selectCharacter(character, selectedCard) {
    selectedCharacter = character;

    document.querySelectorAll(".character-card")
        .forEach(card => card.classList.remove("selected"));

    selectedCard.classList.add("selected");

    document.getElementById("selectedCharacterName").textContent =
        character.name;

    document.getElementById("startGameButton").disabled = false;
}
