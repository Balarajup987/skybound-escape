
import { player } from "./player.js";

import {
    resetObstacles,
    updateObstacles,
    drawObstacles
} from "./obstacles.js";

import { checkCollision } from "./collision.js";
import { drawBackground } from "./background.js";

import {
    resetScore,
    updateScore,
    saveBestScore,
    getCurrentScore,
    getBestScore
} from "./score.js";

import { setupControls } from "./controls.js";

// Background music
const backgroundMusic = new Audio();

backgroundMusic.loop = true;
backgroundMusic.volume = 0.35;

let soundEnabled = true;

// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let animationId = null;
let running = false;
let paused = false;
let selectedImage = null;
let characterId = null;
let currentCharacter = null;

const pauseButton = document.getElementById("pauseButton");
const soundButton = document.getElementById("soundButton");

// Player flying control
function fly() {
    if (running && !paused) {
        player.fly();
    }
}

// Register controls only once
setupControls(fly);

// Start game
export function startGame(character) {
    if (!character) return;
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;

    cancelAnimationFrame(animationId);

    currentCharacter = character;
    characterId = character.id;

    // Stop previous song
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    // Select song based on character
    if (character.id === 1) {
        backgroundMusic.src = "./assets/sounds/manoj-song.mp3";
    } else if (character.id === 2) {
        backgroundMusic.src = "./assets/sounds/akshay-song.mp3";
    }

    // Play selected character's song
    if (soundEnabled) {
        backgroundMusic.play().catch(console.error);
    }

    // Load character image
    selectedImage = new Image();
    selectedImage.src = character.image;

    // Reset game
    player.reset();
    resetObstacles();
    resetScore(characterId);

    running = true;
    paused = false;

    pauseButton.textContent = "PAUSE";
    soundButton.textContent = soundEnabled ? "SOUND ON" : "SOUND OFF";

    gameLoop();
}

// Main game loop
function gameLoop() {
    if (!running || paused) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    drawBackground(ctx);

    // Update objects
    player.update();
    updateObstacles();
    updateScore();

    // Collision detection
    if (checkCollision(player)) {
        endGame();
        return;
    }

    // Draw objects
    drawObstacles(ctx);
    player.draw(ctx, selectedImage);

    animationId = requestAnimationFrame(gameLoop);
}

// Game over

function endGame() {
    running = false;
    paused = false;

    // Play Game Over music
gameOverMusic.currentTime = 0;

if (soundEnabled) {
    gameOverMusic.play().catch(console.error);
}

    cancelAnimationFrame(animationId);

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    // Check whether the player achieved a new high score
    const previousBest = getBestScore();
    const finalScoreValue = getCurrentScore();
    const isNewHighScore = finalScoreValue > previousBest;

    const bestScore = saveBestScore(characterId);

    document.getElementById("finalScore").textContent =
        finalScoreValue;

    document.getElementById("finalHighScore").textContent =
        bestScore;

    // Show congratulations only for a new record
    const message = document.getElementById("newHighScoreMessage");

    message.classList.toggle("hidden", !isNewHighScore);

    const gameOverImage = document.getElementById(
        "gameOverCharacterImage"
    );

    if (gameOverImage && currentCharacter?.gameOverImage) {
        gameOverImage.src = currentCharacter.gameOverImage;
    }

    document.getElementById("gameScreen").classList.add("hidden");

    document.getElementById("gameOverScreen")
        .classList.remove("hidden");
}


// Pause and resume
export function togglePause() {
    if (!running) return;

    paused = !paused;

    if (paused) {
        pauseButton.textContent = "RESUME";
        backgroundMusic.pause();
    } else {
        pauseButton.textContent = "PAUSE";

        if (soundEnabled) {
            backgroundMusic.play().catch(console.error);
        }

        gameLoop();
    }
}

// Sound ON/OFF
export function toggleSound() {
    soundEnabled = !soundEnabled;

    soundButton.textContent = soundEnabled
        ? "SOUND ON"
        : "SOUND OFF";

    if (soundEnabled) {
       if (running && !paused) {
    backgroundMusic.play().catch(console.error);
} else if (!running) {
    const gameOverScreen = document.getElementById("gameOverScreen");

    if (!gameOverScreen.classList.contains("hidden")) {
        gameOverMusic.play().catch(console.error);
    }
}
    } else {
        backgroundMusic.pause();
         gameOverMusic.pause();
    }
}
const gameOverMusic = new Audio(
    "./assets/sounds/gameover-song.mp3"
);

gameOverMusic.loop = false;
gameOverMusic.volume = 0.5;
