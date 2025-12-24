export function createFloor(game, { startX = 0, y, length, tilewidth = 32, texture = 'floorbricks' } = {}) {
    const floor = game.physics.add.staticGroup()

    for (let x = startX; x < startX + length; x += tilewidth) {
        floor
            .create(x, y, texture)
            .setOrigin(0, 1)
            .refreshBody();
    }

    return floor;
}