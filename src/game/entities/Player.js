export function createPlayer({ game, x, y, gravity = 300 }) {
    const player = game.physics.add.sprite(x, y, 'player')
        .setOrigin(0, 1)
        .setGravityY(gravity)
        .setCollideWorldBounds(true);

    return player
}