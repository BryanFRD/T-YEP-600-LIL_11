import Character from "./character";

class Mage {

    character: Character;

    speed: number = 500;
    health: number = 100;
    attack: number = 10;
    defense: number = 10;
    specialAttack: number = 20;


    constructor(character: Character) {

        this.character = character;

        this.character.setCollideWorldBounds(true);
        this.character.setBounce(0.2);
        this.character.setGravityY(300);
        this.character.setGravityX(0);
        this.character.setVelocity(100, 200);

        this.character.setTintFill(0x787878);
        this.character.setDisplaySize(64, 96);
    }

    lightAttack() {
        // light red
        this.character.setTintFill(0xff0000);
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


export default Mage