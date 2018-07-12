import React, { Component } from "react";
import Phaser from "phaser";

class PhaserContainer extends Component {

    constructor(props) {
        super(props)

        // this.preload = this.preload.bind(this);
        // this.create = this.create.bind(this);
        // this.update = this.update.bind(this);
        this.startGame = this.startGame.bind(this);

    }

    componentDidMount() {
        this.startGame();
    }

    startGame() {
        let config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: 700,
            parent: 'phaser-container',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 800 },
                    debug: true
                }
            },
            scene: {
                key: 'main',
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };

        this.game = new Phaser.Game(config);

    }

    preload() {
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map', 'assets/game/maps/map.json');
        // tiles in spritesheet
        this.load.spritesheet('ground-tileset', 'assets/game/maps/ground-tileset.png', { frameWidth: 70, frameHeight: 70 });

        // simple Gilgamesh cat
        this.load.image('gilgamesh', 'assets/game/character/gilgamesh.png');
        // // enemy fly spritesheet
        this.load.spritesheet('enemy', 'assets/game/npc/fly-spritesheet.png', { frameWidth: 70, frameHeight: 40 });
    }

    create() {

        let map;
        let groundLayer, sandLayer;
        let player;
        let cursors;

        // load Tiled map
        map = this.make.tilemap({ key: 'map' });
        // load tiles for ground layer
        let groundTiles = map.addTilesetImage('ground-tileset');
        groundLayer = map.createDynamicLayer('Ground', groundTiles, 0, 0);
        this.cameras.main.setBackgroundColor('#b4c3d1');

        groundLayer.setCollisionByExclusion([-1]);

        // // set the boundaries of our game world
        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;

        // // create the player sprite    
        this.player = this.physics.add.sprite(50, 50, 'gilgamesh');
        this.player.setBounce(0.1); // our player will bounce from items
        this.player.setCollideWorldBounds(true); // don't go out of the map
        this.player.immune = false;

        // // small fix to our player images, we resize the physics body object slightly
        this.player.body.setSize(this.player.width - 60, this.player.height - 8);

        // // player will collide with the level tiles 
        this.physics.add.collider(groundLayer, this.player);

        // // create the fly animation
        this.fly = this.physics.add.sprite(50, 550, 'enemy');
        this.fly.setCollideWorldBounds(true);
        this.fly.body.setVelocityX(100);

        // // adjust fly to be above the ground slightly
        this.fly.body.setSize(this.fly.width, this.fly.height + 20);

        // enemy will collide with the level tiles
        this.physics.add.collider(groundLayer, this.fly);

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 1 }),
            frameRate: 7,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

    };

    update() {

        this.fly.anims.play('fly', true);

        // move player left
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-200);
            this.player.flipX = true; // flip the sprite to the left
        }
        // move player right
        else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(200);
            this.player.flipX = false; // use the original sprite looking to the right
        } else {
            this.player.body.setVelocityX(0);
        }
        // jump 
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.body.setVelocityY(-500);
        }
    };

    render() {
        return (
            <div id="phaser-container"></div>
        );
    }

}

export default PhaserContainer;
