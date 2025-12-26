export function createFloor(group, { startX = 0, y, length, tilewidth = 32, texture = "floorbricks" } = {}) {
    for (let x = startX; x < startX + length; x += tilewidth) {
        group.create(x, y, texture).setOrigin(0, 1).refreshBody();
    }
}
