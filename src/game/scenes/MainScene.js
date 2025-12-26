import Phaser from "phaser";
import { createPlayer } from "../entities/Player";
import { createPlayerAnims } from "../animations/playerAnims";
import { createFloor } from "../world/createFloor";
import { LEVEL_1_1 } from "../world/levels/Levels";
import { createGoomba } from "../entities/Goomba";
import { checkControls } from "../input/playerController";

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

        this.load.spritesheet(
            'goomba',
            '/src/assets/entities/overworld/goomba.png',
            { frameWidth: 16, frameHeight: 16 }
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

        this.goomba = createGoomba({
            game: this,
            x: 200,
            y: this.game.config.height - 32,
            gravity: 300
        })

        // Animaciones del jugador
        createPlayerAnims(this)

        // Creo un objeto estatico del suelo para añadirle fisicas
        this.floor = this.physics.add.staticGroup();

        // Creo el suelo segun el nivel
        LEVEL_1_1.floor.forEach(seg => {
            createFloor(this.floor, {
                startX: seg.x,
                y: this.game.config.height,
                length: seg.length
            });
        });

        // Añade las colisiones del suelo y el jugador, modifica las dimensiones del escenario y añade las colisiones del mundo
        this.physics.add.collider(this.player, this.floor)
        this.physics.add.collider(this.goomba, this.floor)
        this.physics.world.setBounds(0, 0, 2000, this.game.config.height)

        // Crea la camara y la ajusta para que siga al juagador
        this.cameras.main.setBounds(0, 0, 2000, this.game.config.height)
        this.cameras.main.startFollow(this.player)

        this.keys = this.input.keyboard.createCursorKeys();
    }

    update() {
        const { player, sound, scene } = this

        if (player.isDead) return

        checkControls(this)

        // Controla si el jugador se ha caido para empezar la animacion de muerte
        if (!player.body.touching.down && player.y >= this.game.config.height) {
            player.isDead = true
            player.anims.play('player-die', true)
            player.setVelocityX(0)
            player.setCollideWorldBounds(false)
            sound.add('gameover', { volume: 0.2 }).play()

            setTimeout(() => {
                player.setVelocityY(-350)
            }, 100)

            setTimeout(() => {
                scene.restart()
            }, 2000)
        }
    }
}