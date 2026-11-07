
import { obstacles } from "./obstacles.js";

export function checkCollision(player) {
    const canvasHeight = 1280;

    // Check top and bottom boundaries
    if (
        player.y <= 0 ||
        player.y + player.height >= canvasHeight
    ) {
        return true;
    }

    // Check pillar collisions
    for (const obstacle of obstacles) {
        const horizontalCollision =
            player.x + player.width > obstacle.x &&
            player.x < obstacle.x + obstacle.width;

        const hitsTopPillar =
            player.y < obstacle.topHeight;

        const hitsBottomPillar =
            player.y + player.height > obstacle.bottomY;

        if (
            horizontalCollision &&
            (hitsTopPillar || hitsBottomPillar)
        ) {
            return true;
        }
    }

    return false;
}
