export function createPlayerAnims(game) {
    if (game.anims.exists("player-walk")) return

    game.anims.create({
        key: 'player-walk',
        frames: game.anims.generateFrameNumbers(
            'player',
            { start: 1, end: 3 }
        ),
        frameRate: 12,
        repeat: -1,
    })

    game.anims.create({
        key: 'player-idle',
        frames: [{ key: 'player', frame: 0 }]
    })

    game.anims.create({
        key: 'player-jump',
        frames: [{ key: 'player', frame: 5 }],
        repeat: -1
    })

    game.anims.create({
        key: 'player-die',
        frames: [{ key: 'player', frame: 4 }],
        repeat: -1
    })
}