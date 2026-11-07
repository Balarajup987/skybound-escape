
export function setupControls(flyCallback) {
    const canvas = document.getElementById("gameCanvas");

    // Keyboard control: Spacebar
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            flyCallback();
        }
    });

    // Mouse control
    canvas.addEventListener("mousedown", () => {
        flyCallback();
    });

    // Mobile touch control
    canvas.addEventListener("touchstart", (event) => {
        event.preventDefault();
        flyCallback();
    }, { passive: false });
}
