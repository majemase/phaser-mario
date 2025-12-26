import Phaser from "phaser";
import { createPlayer } from "../entities/Player";
import { createPlayerAnims } from "../animations/playerAnims";
import { createFloor } from "../world/createFloor";
import { LEVEL_1_1 } from "../world/levels/Levels";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene")
    }

    preload() {
        this.load.image(
            'cloud1',
            '/src/assets/scenery/overworld/cloud1.png'
        )

        this.load.spritesheet(
            'player',
            '/src/assets/entities/mario.png',
            { frameWidth: 18, frameHeight: 16 }
        )

        this.load.image(
            'floorbricks',
            '/src/assets/scenery/overworld/floorbricks.png'
        )

        this.load.audio(
            'gameover',
            '/src/assets/sound/music/gameover.mp3'
        )
    }

    create() {
        // Inicializo el jugador añadiendole un sprite y gravedad
        this.player = createPlayer({
            game: this,
            x: 50,
            y: 100,
            gravity: 300
        })

        // Animaciones del jugador
        createPlayerAnims(this)

        // Creo un objeto estatico del suelo para añadirle fisicas
        // this.floor = createFloor(this, {
        //     startX: 0,
        //     y: this.game.config.height,
        //     length: 128,
        // });

        LEVEL_1_1.floor.forEach(segment => {
            createFloor(this, {
                startX: x,
                y: this.game.config.height,
                length: length
            })
        })

        this.add.tileSprite(0, this.game.config.height, this.game.config.width - 128, 32, 'floorbricks')
            .setOrigin(0, 1)

        // Añade las colisiones del suelo y el jugador, modifica las dimensiones del escenario y añade las colisiones del mundo
        this.physics.add.collider(this.player, this.floor)
        this.physics.world.setBounds(0, 0, 2000, this.game.config.height)

        // Crea la camara y la ajusta para que siga al juagador
        this.cameras.main.setBounds(0, 0, 2000, this.game.config.height)
        this.cameras.main.startFollow(this.player)

        this.keys = this.input.keyboard.createCursorKeys();
    }

    update() {
        const { player, keys, sound } = this

        if (player.isDead) return

        // Controles horizontales
        if (keys.left.isDown) {
            player.anims.play('player-walk', true)
            player.setVelocityX(-100)
            player.flipX = true
        } else if (keys.right.isDown) {
            player.anims.play('player-walk', true)
            player.setVelocityX(100)
            player.flipX = false
        } else {
            player.anims.play('player-idle', true)
            player.setVelocityX(0)
        }

        // Controles verticales
        if (keys.up.isDown && player.body.touching.down) {
            player.setVelocityY(-300)
        }

        // Controla si el jugador sigue saltando para mantener la animacion de salto
        if (!player.body.touching.down && player.y !== 244) {
            player.anims.play('player-jump', true)
        }

        // Controla si el jugador se ha caido para empezar la animacion de muerte
        if (!player.body.touching.down && player.y >= this.game.config.height) {
            player.isDead = true
            player.anims.play('player-die', true)
            player.setCollideWorldBounds(false)
            sound.add('gameover', { volume: 0.2 }).play()

            setTimeout(() => {
                player.setVelocityY(-350)
            }, 100)

            setTimeout(() => {
                this.scene.restart()
            }, 2000)
        }
    }
}