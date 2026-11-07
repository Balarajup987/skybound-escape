
import {
    renderCharacters,
    selectedCharacter
} from "./characters.js";

import {
    startGame,
    togglePause,
    toggleSound
} from "./game.js";

const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startButton = document.getElementById("startGameButton");
const homeButton = document.getElementById("homeButton");
const pauseButton = document.getElementById("pauseButton");
const soundButton = document.getElementById("soundButton");

const playAgainButton = document.getElementById("playAgainButton");
const changeCharacterButton =
    document.getElementById("changeCharacterButton");

// Display characters
renderCharacters();

// Start or restart game
function beginGame() {
    if (!selectedCharacter) return;

    homeScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    startGame(selectedCharacter);
}

startButton.addEventListener("click", beginGame);
playAgainButton.addEventListener("click", beginGame);

// Pause and sound
pauseButton.addEventListener("click", togglePause);
soundButton.addEventListener("click", toggleSound);

// Return home
homeButton.addEventListener("click", () => {
    window.location.reload();
});

changeCharacterButton.addEventListener("click", () => {
    window.location.reload();
});

console.log("Skybound Escape initialized!");
