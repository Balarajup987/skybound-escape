
const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 1280;

const GAP_HEIGHT = 600;
const PILLAR_WIDTH = 80;
const PILLAR_SPEED = 9;

export let obstacles = [];

export function resetObstacles() {
    obstacles = [];
    obstaclePattern = 0;
    createObstacle(CANVAS_WIDTH + 100);
}

let obstaclePattern = 0;

export function createObstacle(x) {
    const patterns = [
        180,  // Opening near the top
        480,  // Opening in the middle
        780   // Opening near the bottom
    ];

    const topHeight = patterns[obstaclePattern];

    obstaclePattern = (obstaclePattern + 1) % patterns.length;

    obstacles.push({
        x: x,
        topHeight: topHeight,
        bottomY: topHeight + GAP_HEIGHT,
        width: PILLAR_WIDTH,
        scored: false
    });
}

export function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x -= PILLAR_SPEED;
    });

    // Remove pillars that leave the screen
    obstacles = obstacles.filter(
        obstacle => obstacle.x + obstacle.width > 0
    );

    // Create a new pillar when the last one moves far enough
    if (
        obstacles.length === 0 ||
        obstacles[obstacles.length - 1].x < CANVAS_WIDTH - 700
    ) {
        createObstacle(CANVAS_WIDTH + 100);
    }
}

export function drawObstacles(ctx) {
    obstacles.forEach(obstacle => {
        // Upper pillar
        ctx.fillStyle = "#39734c";
        ctx.fillRect(
            obstacle.x,
            0,
            obstacle.width,
            obstacle.topHeight
        );

        // Upper pillar border
        ctx.fillStyle = "#285638";
        ctx.fillRect(
            obstacle.x - 5,
            obstacle.topHeight - 25,
            obstacle.width + 10,
            25
        );

        // Lower pillar
        ctx.fillStyle = "#39734c";
        ctx.fillRect(
            obstacle.x,
            obstacle.bottomY,
            obstacle.width,
            CANVAS_HEIGHT - obstacle.bottomY
        );

        // Lower pillar border
        ctx.fillStyle = "#285638";
        ctx.fillRect(
            obstacle.x - 5,
            obstacle.bottomY,
            obstacle.width + 10,
            25
        );
    });
}
