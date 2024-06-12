import Phaser from "phaser";
import Character from "../characters/character";
import Controler from "../characters/controler";
import {randomInt} from "mathjs";

class GameScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('sky', 'assets/skies/space3.png');

    }

    create() {
        const sprite = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'sky');

        sprite.setScale(1.5);

        for (let i = 0; i < 10; i++) {
            new Character(this, randomInt(100, 700), randomInt(100, 500), 'warrior');
        }

        new Controler(this, new Character(this, randomInt(100, 700), randomInt(100, 500), 'mage'));
        
    }
}

export default GameScene;