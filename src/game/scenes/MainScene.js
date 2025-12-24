import Phaser from "phaser";
import { createPlayer } from "../entities/Player";
import { createPlayerAnims } from "../animations/playerAnims";
import { createFloor } from "../world/createFloor";

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
        this.floor = createFloor(this, {
            startX: 0,
            y: this.game.config.height,
            length: 128,
        });

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
        // Controles horizontales
        if (this.player.isDead) return
        if (this.keys.left.isDown) {
            this.player.anims.play('player-walk', true)
            this.player.setVelocityX(-100)
            this.player.flipX = true
        } else if (this.keys.right.isDown) {
            this.player.anims.play('player-walk', true)
            this.player.setVelocityX(100)
            this.player.flipX = false
        } else {
            this.player.anims.play('player-idle', true)
            this.player.setVelocityX(0)
        }

        // Controles verticales
        if (this.keys.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-300)
        }

        // Controla si el jugador sigue saltando para mantener la animacion de salto
        if (!this.player.body.touching.down && this.player.y !== 244) {
            this.player.anims.play('player-jump', true)
        }

        // Controla si el jugador se ha caido para empezar la animacion de muerte
        if (!this.player.body.touching.down && this.player.y >= this.game.config.height) {
            this.player.isDead = true
            this.player.anims.play('player-die', true)
            this.player.setCollideWorldBounds(false)
            this.sound.add('gameover', { volume: 0.2 }).play()

            setTimeout(() => {
                this.player.setVelocityY(-350)
            }, 100)

            setTimeout(() => {
                this.scene.restart()
            }, 2000)
        }
    }
}