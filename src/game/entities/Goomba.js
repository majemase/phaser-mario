export function createGoomba({ game, x, y, gravity = 300, velocityX = -20 }) {
    const goomba = game.physics.add.sprite(x, y, 'goomba')
        .setOrigin(0, 1)
        .setGravityY(gravity)
        .setVelocityX(velocityX)
        .setCollideWorldBounds(true);

    return goomba
}