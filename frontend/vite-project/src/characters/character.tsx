// character.ts

import Phaser from "phaser"
import Warrior from "./warrior"
import Mage from "./mage"

export type CharacterType = {
    warrior: Warrior;
    mage: Mage;
};

export type CharacterName = keyof CharacterType;
export type CharacterObject = CharacterType[keyof CharacterType];

class Character extends Phaser.Physics.Arcade.Sprite {

    character: CharacterObject;

    constructor(scene: Phaser.Scene, x: number, y: number, characterName: CharacterName) {
        super(scene, x, y, characterName);

        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.character =  this.getCharacter(characterName);
        //add collide bewtenn this character and other characters
        this.scene.physics.add.collider(this, this.scene.children.getAll());
        this.scene.add.existing(this);
    }

    getCharacter(characterName: CharacterName): CharacterObject {
        console.log(this)
        switch (characterName) {
            case 'warrior':
                return new Warrior(this)
            case 'mage':
                return new Mage(this)
            default:
                throw new Error('Invalid character name');
        }
    }
}

export default Character;
