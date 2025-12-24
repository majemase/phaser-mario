import MainScene from "./scenes/MainScene"

export function startGame() {
    const config = {
        type: Phaser.AUTO,
        width: 256,
        height: 244,
        backgroundColor: "#049cd8",
        parent: "app",
        scene: [MainScene],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 300,
                },
                debug: true
            }
        }
    }

    new Phaser.Game(config)
}