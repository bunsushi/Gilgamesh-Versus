import React, { Component } from "react";
import Phaser from "phaser";

class PhaserContainer extends Component {

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
                    debug: false
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

        this.load.image('sky', 'assets/images/sky.png');
    }

    create() {

        this.add.image(400, 300, 'sky');

        this.cameras.main.setBackgroundColor('#b4c3d1');
    }

    update() {

    };

    render() {
        return (
            <div id="phaser-container"></div>
        );
    }

}

export default PhaserContainer;
