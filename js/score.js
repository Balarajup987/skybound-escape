
let currentScore = 0;
let bestScore = 0;
let scoreTimer = 0;

export function resetScore(characterId) {
    currentScore = 0;
    scoreTimer = 0;

    bestScore = Number(
        localStorage.getItem(`skybound_best_${characterId}`)
    ) || 0;

    updateScoreDisplay();
}

export function updateScore() {
    scoreTimer++;

    // Increase score once every 60 frames (approximately 1 second)
    if (scoreTimer >= 60) {
        currentScore++;
        scoreTimer = 0;
        updateScoreDisplay();
    }
}

export function saveBestScore(characterId) {
    if (currentScore > bestScore) {
        bestScore = currentScore;

        localStorage.setItem(
            `skybound_best_${characterId}`,
            bestScore
        );
    }

    updateScoreDisplay();

    return bestScore;
}

export function getCurrentScore() {
    return currentScore;
}

export function getBestScore() {
    return bestScore;
}

function updateScoreDisplay() {
    document.getElementById("currentScore").textContent =
        currentScore;

    document.getElementById("highScore").textContent =
        bestScore;
}
