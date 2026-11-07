
export const player = {
    x: 120,
    y: 500,
    width: 150,
    height: 150,
    velocity: 0,
    gravity: 0.45,
    jumpStrength: -10,

    reset() {
        this.x = 120;
        this.y = 500;
        this.velocity = 0;
    },

    fly() {
        this.velocity = this.jumpStrength;
    },

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    },

    

draw(ctx, image) {
    ctx.save();

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    // Calculate target angle
    const targetAngle = this.velocity < 0 ? -10 : 15;

    // Smoothly rotate towards the target angle
    this.angle = this.angle ?? 0;
    this.angle += (targetAngle - this.angle) * 0.08;

    ctx.translate(centerX, centerY);
    ctx.rotate(this.angle * Math.PI / 180);

    if (image && image.complete && image.naturalWidth > 0) {
        ctx.drawImage(
            image,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
    }

    ctx.restore();
}


};
