import React, { Component } from "react";
import Phaser from "phaser";

class PhaserContainer extends Component {

    componentDidMount() {
        this.startGame();

    }

    startGame() {
        console.log(this); // this = PhaserContainer
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
                preload: preload,
                create: create,
                update: update
            }
        };

        // game variables
        var life = 10;
        var gameOver = false;
        var score = 0;
        var coins;

        // this.game = new Phaser.Game(config);
        this.game = new Phaser.Game(config);

        function attackHandler(player, lion) {

            if (player.immune === false && this.cursors.space.isDown) {
                console.log(lion.hitPoints);
                console.log("knock knock");
                lion.hitPoints--;
                if (lion.hitPoints === 0) {
                    console.log("moneyyyy");
                    //  Some coins to collect, 10 in total, evenly spaced 70 pixels apart along the x axis
                    coins = this.physics.add.group({
                        key: 'coin',
                        repeat: 9,
                        setXY: { x: lion.x - 350, y: lion.y - 100, stepX: 70 }
                    });

                    coins.children.iterate(function (child) {

                        //  Give each star a slightly different bounce
                        child.setBounceY(Phaser.Math.FloatBetween(0.5, 1));

                    });

                    this.physics.add.collider(groundLayer, coins);
                    this.physics.add.overlap(player, coins, robNPC, null, this);

                    lion.disableBody(true, true);
                }
                else if (lion.body.touching.left) {
                    // lion.body.velocity.x = 150;
                    lion.flipX = false;
                    console.log("that smarts!");
                } else if (lion.body.touching.right) {
                    // lion.body.velocity.x = -150;
                    lion.flipX = true;
                    console.log("hey!");
                }

                player.immune = true;
                console.log(player.immune + " Haha! I'm immune for one second!")

                setTimeout(function () {
                    player.immune = false;
                    console.log(player.immune + " Drat! I'm mortal again");
                }, 1000);
            }
        }

        // check for loss
        function checkForLoss() {
            if (life === 0) {
                gameOver = true;
            }
        }

        // collect coin
        function collectCoin(sprite, tile) {
            coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
            score++; // add 1 point to the score
            console.log(score);
            // text.setText("score: " + score); // set the text to show the current score
            return false;
        }

        // collision handler for player and enemy
        function collisionHandler(player, fly) {
            console.log("boop");
            if (player.immune === false) {
                console.log("boop");
                // player.anims.play('ghost', true);
                life--;
                // lifeText.setText("life: " + life);
                console.log(life);
                if (fly.body.touching.left) {
                    fly.body.velocity.x = 150;
                    fly.flipX = false;
                    console.log("touchin' left");
                } else if (fly.body.touching.right) {
                    fly.body.velocity.x = -150;
                    fly.flipX = true;
                    console.log("touchin' right");
                }

                player.immune = true;
                console.log(player.immune + " Haha! I'm immune for one second!")

                setTimeout(function () {
                    player.immune = false;
                    console.log(player.immune + " Drat! I'm mortal again");
                }, 1000);

                checkForLoss();
            }
        };

        // this function will be called when the player touches a coin
        function robNPC(player, coin) {
            coin.disableBody(true, true); // remove the tile/coin
            score++; // add 1 point to the score
            return false;
        }

        function preload() {
            // map made with Tiled in JSON format
            this.load.tilemapTiledJSON('map', 'assets/game/maps/map.json');
            // ground tiles in spritesheet
            this.load.spritesheet('ground-tileset', 'assets/game/maps/ground-tileset.png', { frameWidth: 70, frameHeight: 70 });
            // simple coin image
            this.load.image('coin', 'assets/game/npc/coin.png');
            // simple Gilgamesh cat
            this.load.image('gilgamesh', 'assets/game/character/gilgamesh.png');
            // enemy fly spritesheet
            this.load.spritesheet('enemy', 'assets/game/npc/fly-spritesheet.png', { frameWidth: 70, frameHeight: 40 });
            // citizen lion
            this.load.image('lion', 'assets/game/npc/lion.png');
        }

        // test function that calls PhaserContainer method phaserTest
        var arrowTest = () => {
            this.phaserTest();
        }

        arrowTest();

        let map;
        let groundLayer, coinLayer;

        // required by Phaser 3
        function create() {

            // load Tiled map
            map = this.make.tilemap({ key: 'map' });
            this.cameras.main.setBackgroundColor('#b4c3d1');

            // load tiles for ground layer
            let groundTiles = map.addTilesetImage('ground-tileset');
            groundLayer = map.createDynamicLayer('Ground', groundTiles, 0, 0);
            groundLayer.setCollisionByExclusion([-1]);

            // set the boundaries of our game world
            this.physics.world.bounds.width = groundLayer.width;
            this.physics.world.bounds.height = groundLayer.height;

            // COIN
            var coinTiles = map.addTilesetImage('coin');
            coinLayer = map.createDynamicLayer('Coin', coinTiles, 0, 0);
            coinLayer.setTileIndexCallback(226, collectCoin, this);

            // LION
            this.lion = this.physics.add.sprite(550, 550, 'lion');
            this.lion.setCollideWorldBounds(true);
            // this.lion.body.setVelocityX(100);
            this.lion.body.setSize(this.lion.width, this.lion.height - 8);
            this.lion.hitPoints = 3;
            this.physics.add.collider(groundLayer, this.lion);

            // PLAYER    
            this.player = this.physics.add.sprite(50, 50, 'gilgamesh');
            this.player.setBounce(0.1);
            this.player.setCollideWorldBounds(true);
            this.player.body.setSize(this.player.width - 60, this.player.height - 8);
            this.player.immune = false;
            this.physics.add.collider(groundLayer, this.player);
            this.physics.add.overlap(this.player, coinLayer);
            this.physics.add.overlap(this.player, this.lion, attackHandler, null, this);


            // ENEMY FLY
            this.fly = this.physics.add.sprite(50, 550, 'enemy');
            this.fly.setCollideWorldBounds(true);
            this.fly.body.setVelocityX(100);
            this.fly.body.setSize(this.fly.width, this.fly.height + 20);
            this.physics.add.collider(groundLayer, this.fly);

            // fly animation
            this.anims.create({
                key: 'fly',
                frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 1 }),
                frameRate: 7,
                repeat: -1
            });

            // enemy collides with player
            this.physics.add.overlap(this.player, this.fly, collisionHandler, null, this);


            // CREATE CURSORS KEYS
            this.cursors = this.input.keyboard.createCursorKeys();

        };

        // Required by Phaser 3
        function update() {

            this.fly.anims.play('fly', true);

            if (gameOver) {
                window.location.reload();
            }

            // player move left
            if (this.cursors.left.isDown) {
                this.player.body.setVelocityX(-200);
                this.player.flipX = true; // flip the sprite to the left
            }
            // player move right
            else if (this.cursors.right.isDown) {
                this.player.body.setVelocityX(200);
                this.player.flipX = false; // use the original sprite looking to the right
            }
            // player at rest
            else {
                this.player.body.setVelocityX(0);
                this.fly.anims.play('fly', true);
            }
            // player jump 
            if (this.cursors.up.isDown && this.player.body.onFloor()) {
                this.player.body.setVelocityY(-500);
            }

            // if player touches right side of fly
            if (this.fly.body.blocked.right) {
                this.fly.body.setVelocityX(-100);
                this.fly.flipX = true;
            }

            // if player touches left side of fly
            if (this.fly.body.blocked.left) {
                this.fly.body.setVelocityX(100);
                this.fly.flipX = false;
            }
        };

    }

    phaserTest() {
        console.log("Phaser Test!");
    }

    render() {
        return (
            <div id="phaser-container"></div>
        );
    }

}

export default PhaserContainer;
