import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import Scoreboard from "../../components/Scoreboard";
import API from "../../utils/API";
import Phaser from "phaser";

class PhaserContainer extends Component {

    state = {
        user: {},
        achievement: {},
        score: 0,
        life: 3,
        hasMace: false
    }

    componentDidMount() {
        this.getUser();
        this.getAchievements();
        this.startGame();
    }

    getUser = () => {
        API.getUser()
            .then(res => {
                this.setState(res.data);
            })
            .catch(err => console.log(err));
    };

    getAchievements = () => {
        API.getAchievements()
            .then(res => {
                this.setState({ achievement: res.data.achievement });
                console.log(this.state);
            })
            .catch(err => console.log(err));
    }

    startGame() {
        let config = {
            type: Phaser.AUTO,
            width: 1270,
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

        this.game = new Phaser.Game(config);

        function attackHandler(player, lion) {

            if (player.immune === false && hasMace === true && this.cursors.space.isDown) {
                console.log("knock knock");
                lion.hitPoints--; // make this more random
                if (lion.hitPoints === 0) { // <= 0
                    console.log("moneyyyy");
                    //  Some coins to collect, 10 in total, evenly spaced 70 pixels apart along the x axis
                    coins = this.physics.add.group({
                        key: 'coin',
                        repeat: 9,
                        setXY: { x: lion.x - 350, y: lion.y - 100, stepX: 70 },
                        collideWorldBounds: true
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
            this.sound.play('coinCollect'); // play coinCollect
            coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
            console.log("Collecting a coin!");
            score++; // add 1 point to the score
            updateScore();
            return false;
        };

        // collect key
        function collectKey() {
            // change this to if has attacked all NPCs
            if (hasMace) {
                console.log("You've won!");
                // push hasMace to DB
                // weapMace = true

            }
            else {
                return;
            }
        }

        function collectWeapon(sprite, tile) {
            weaponLayer.removeTileAt(tile.x, tile.y); // remove the tile/weapon
            console.log("got you");
            this.player.anims.play('mace', true);
            hasMace = true;
            updateWeapon();
        }

        // collision handler for player and enemy
        function collisionHandler(player, fly) {
            if (player.immune === false) {
                console.log("boop");
                // player.anims.play('ghost', true);
                life--;
                updateLife();
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

        // called when player touches a dangerous tile (water, spikes)
        function dangerHandler(player, dangerLayer) {
            console.log("Ow!");
            setTimeout(function () {
                gameOver = true;
            }, 500);
        }

        // called when the player touches a coin
        function robNPC(player, coin) {
            coin.disableBody(true, true); // remove the tile/coin
            score++; // add 1 point to the score
            return false;
        }

        // arrow function to update score in state
        var updateScore = () => {
            this.setState({ score: score });
            console.log("State score: " + this.state.score);
        }

        // arrow function to update life in state
        var updateLife = () => {
            this.setState({ life: life });
            console.log("State life: " + this.state.life);
        }

        // arrow function to update weapon in state
        var updateWeapon = () => {
            this.setState({ hasMace: true });
            console.log("State weapon: " + this.state.hasMace);
        }

        // game variables
        var life = 3;
        var gameOver = false;
        var score = 0;
        var hasMace = false;
        var coins;
        var map;
        var groundLayer, coinLayer, bgGroundLayer, weaponLayer, buildingLayer, bgBuildingLayer, dangerLayer, keyLayer;

        function preload() {
            // LOAD FROM TILED MAP
            this.load.tilemapTiledJSON('map', 'assets/game/maps/map.json');
            this.load.spritesheet('ground-tileset', 'assets/game/maps/ground-tileset.png', { frameWidth: 70, frameHeight: 70 });
            this.load.spritesheet('building-tileset', 'assets/game/maps/building-tileset.png', { frameWidth: 70, frameHeight: 70 });
            this.load.spritesheet('danger', 'assets/game/maps/danger.png', { frameWidth: 70, frameHeight: 70 });
            this.load.image('coin', 'assets/game/npc/coin.png');
            this.load.image('mace', 'assets/game/weapon/mace.png');
            this.load.image('keyYellow', 'assets/game/keys/keyYellow.png');

            // LOAD FROM IMAGE
            this.load.image('gilgamesh', 'assets/game/character/gilgamesh.png');
            this.load.spritesheet('gilgamesh-mace', 'assets/game/character/gilgamesh-mace.png', { frameWidth: 96, frameHeight: 90 });
            this.load.spritesheet('enemy', 'assets/game/npc/fly-spritesheet.png', { frameWidth: 70, frameHeight: 40 });
            this.load.image('lion', 'assets/game/npc/lion.png');

            // sound effects
            this.load.audio('coinCollect', 'assets/game/sounds/handleCoins2.wav');
        }

        // required by Phaser 3
        function create() {

            // load Tiled map
            map = this.make.tilemap({ key: 'map' });
            this.cameras.main.setBackgroundColor('#b4c3d1');

            let bgGroundTiles = map.addTilesetImage('ground-tileset');
            bgGroundLayer = map.createDynamicLayer('BG-Ground', bgGroundTiles, 0, 0);

            // load tiles for ground layer
            let groundTiles = map.addTilesetImage('ground-tileset');
            groundLayer = map.createDynamicLayer('Ground', groundTiles, 0, 0);
            groundLayer.setCollisionByExclusion([-1]);

            let bgBuildingTiles = map.addTilesetImage('building-tileset');
            bgBuildingLayer = map.createDynamicLayer('BG-Building', bgBuildingTiles, 0, 0);

            // load tiles for building layer
            let buildingTiles = map.addTilesetImage('building-tileset');
            buildingLayer = map.createDynamicLayer('Building', buildingTiles, 0, 0);

            let dangerTiles = map.addTilesetImage('danger');
            dangerLayer = map.createDynamicLayer('Danger', dangerTiles, 0, 0);
            dangerLayer.setTileIndexCallback(288, dangerHandler, this);
            dangerLayer.setTileIndexCallback(289, dangerHandler, this);
            dangerLayer.setTileIndexCallback(290, dangerHandler, this);
            dangerLayer.setTileIndexCallback(291, dangerHandler, this);

            // set the boundaries of our game world
            this.physics.world.bounds.width = groundLayer.width;
            this.physics.world.bounds.height = groundLayer.height;

            // KEY
            var keyTiles = map.addTilesetImage('keyYellow');
            keyLayer = map.createDynamicLayer('Key', keyTiles, 0, 0);
            keyLayer.setTileIndexCallback(292, collectKey, this);

            // WEAPON
            var weaponTiles = map.addTilesetImage('mace');
            weaponLayer = map.createDynamicLayer('Weapon', weaponTiles, 0, 0);
            weaponLayer.setTileIndexCallback(227, collectWeapon, this);

            // COIN
            var coinTiles = map.addTilesetImage('coin');
            coinLayer = map.createDynamicLayer('Coin', coinTiles, 0, 0);
            coinLayer.setTileIndexCallback(226, collectCoin, this);
            this.sound.add('coinCollect');

            // LION
            this.lion = this.physics.add.sprite(2000, 550, 'lion');
            this.lion.setCollideWorldBounds(true);
            this.lion.body.setVelocityX(100);
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
            this.physics.add.overlap(this.player, weaponLayer);
            this.physics.add.collider(dangerLayer, this.player);
            this.physics.add.overlap(keyLayer, this.player);
            this.physics.add.overlap(this.player, this.lion, attackHandler, null, this);

            // ENEMY FLY #1
            this.fly = this.physics.add.sprite(500, 380, 'enemy');
            this.fly.setCollideWorldBounds(true);
            this.fly.body.setVelocityX(100);
            this.fly.body.setSize(this.fly.width, this.fly.height + 20);
            this.fly.body.gravity.y = -800;
            this.physics.add.collider(groundLayer, this.fly);

            // ENEMY FLY #2
            this.fly2 = this.physics.add.sprite(1500, 180, 'enemy');
            this.fly2.setCollideWorldBounds(true);
            this.fly2.body.setVelocityX(150);
            this.fly2.body.setSize(this.fly2.width, this.fly2.height + 20);
            this.fly2.body.gravity.y = -800;
            this.physics.add.collider(groundLayer, this.fly2);

            // fly animation
            this.anims.create({
                key: 'fly',
                frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 1 }),
                frameRate: 7,
                repeat: -1
            });

            // mace animation
            this.anims.create({
                key: 'mace',
                frames: this.anims.generateFrameNumbers('gilgamesh-mace', { start: 0, end: 0 }),
                frameRate: 7,
                repeat: -1
            })

            // enemy collides with player
            this.physics.add.overlap(this.player, this.fly, collisionHandler, null, this);

            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); // keep camera in bounds of world
            this.cameras.main.startFollow(this.player); // camera follow player

            // CREATE CURSORS KEYS
            this.cursors = this.input.keyboard.createCursorKeys();

        };

        // Required by Phaser 3
        function update() {

            this.fly.anims.play('fly', true);
            this.fly2.anims.play('fly', true);

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

            // FLY BLOCKED BY WORLD BOUNDS
            if (this.fly.body.blocked.right) {
                this.fly.body.setVelocityX(-100);
                this.fly.flipX = true;
            }
            if (this.fly.body.blocked.left) {
                this.fly.body.setVelocityX(100);
                this.fly.flipX = false;
            }

            // FLY BLOCKED BY WORLD BOUNDS
            if (this.fly2.body.blocked.right) {
                this.fly2.body.setVelocityX(-100);
                this.fly2.flipX = true;
            }
            if (this.fly2.body.blocked.left) {
                this.fly2.body.setVelocityX(100);
                this.fly2.flipX = false;
            }

            // LION BLOCKED BY WORLD BOUNDS
            if (this.lion.body.blocked.right) {
                this.lion.body.setVelocityX(-100);
                this.lion.flipX = true;
            }
            if (this.lion.body.blocked.left) {
                this.lion.body.setVelocityX(100);
                this.lion.flipX = false;
            }
        };

    }

    render() {

        return (
            <Wrapper>
                <Scoreboard user={this.state.user.username} score={this.state.score} life={this.state.life} hasMace={!this.state.hasMace ? 'false' : 'true'} />
                <div id="phaser-container"></div>
            </Wrapper>
        );
    }
}

export default PhaserContainer;
