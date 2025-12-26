export function checkControls({ player, keys }) {
    const isKeyUpDown = keys.up.isDown
    const isKeyLeftDown = keys.left.isDown
    const isKeyRightDown = keys.right.isDown

    const isPlayerJumping = player.body.touching.down

    // Controles horizontales
    if (isKeyLeftDown) {
        player.anims.play('player-walk', true)
        player.setVelocityX(-100)
        player.flipX = true
    } else if (isKeyRightDown) {
        player.anims.play('player-walk', true)
        player.setVelocityX(100)
        player.flipX = false
    } else {
        player.anims.play('player-idle', true)
        player.setVelocityX(0)
    }

    // Controles verticales
    if (isKeyUpDown && isPlayerJumping) {
        player.setVelocityY(-300)
    }

    // Controla si el jugador sigue saltando para mantener la animacion de salto
    if (!player.body.touching.down && player.y !== 244) {
        player.anims.play('player-jump', true)
    }
}