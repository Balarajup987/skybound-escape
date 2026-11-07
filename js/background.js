
const backgroundImage = new Image();

backgroundImage.onload = () => {
    console.log("Background image loaded successfully!");
};

backgroundImage.onerror = () => {
    console.error("Background image not found. Check its path!");
};

backgroundImage.src = "./assets/backgrounds/game-background.png";

export function drawBackground(ctx) {
    if (backgroundImage.complete && backgroundImage.naturalWidth > 0) {
        ctx.drawImage(backgroundImage, 0, 0, 720, 1280);
    } else {
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(0, 0, 720, 1280);
    }
}
