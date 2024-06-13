import Character from "./character";
import Weapon from "../weapons/weapon";

class Warrior {

    character: Character;

    speed: number = 400;
    health: number = 120;
    attack: number = 15;
    defense: number = 12;
    specialAttack: number = 25;
    weapon: Weapon;

    constructor(character: Character) {

        this.character = character;

        this.weapon = new Weapon(this.character.scene, this.character.x, this.character.y, 'hand');
        this.weapon.y = this.character.y - 1;

        if (this.character && this.character.body) {
            this.character.setCollideWorldBounds(true);
            this.character.setBounce(0.1);
            this.character.setGravityY(300);
            this.character.setGravityX(0);
            this.character.setVelocity(100, 200);

            this.character.setTintFill(0xffa500);
            this.character.setDisplaySize(80, 128);

            if (this.character.body.velocity.x < 0) {
                this.character.setFlipX(true);
            }
            else {
                this.character.setFlipX(false);
            }
        }
        else {
            throw new Error('Invalid character name');
        }
    }

    update(time: number, delta: number) {
        if (this.character && this.character.body) {
            this.weapon.x = this.character.x + this.character.body.velocity.x * delta / 1000;
            this.weapon.y = this.character.y + this.character.body.velocity.y * delta / 1000;
        }
        else {
            throw new Error('Invalid character name');
        }
    }

    lightAttack() {
        // light red
        this.character.setTintFill(0xff0000);
        // duration 0.2s distance 50px
    }

    heavyAttack() {
        // dark red
        this.character.setTintFill(0x8b0000);
    }

    grabThrow() {
        // light blue
        this.character.setTintFill(0x0000ff);
    }

    special() {
        // wellow
        this.character.setTintFill(0xffff00);
    }

    shield() {
        // dark blue
        this.character.setTintFill(0x00ff00);
    }

    dodge() {
        // light green
        this.character.setTintFill(0x00ff00);
    }

    moveUp() {
        this.character.setVelocityY(-this.speed);
    }

    moveDown() {
        this.character.setVelocityY(this.speed);
    }

    moveLeft() {
        this.character.setVelocityX(-this.speed);
    }

    moveRight() {
        this.character.setVelocityX(this.speed);
    }
}

export default Warrior;
