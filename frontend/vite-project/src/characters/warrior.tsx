import Character from "./character";
import {randomInt} from "mathjs";
 
class Warrior {
    constructor(character : Character) {
        console.log(character);
        character.setVelocity(randomInt(-200, 200), randomInt(-200, 200));
        character.setFriction(0.99, 0.99);
    }

    lightAttack() {
        console.log('Warrior light attack');
    }

    heavyAttack() {
        console.log('Warrior heavy attack');
    }

    grabThrow() {
        console.log('Warrior grab throw');
    }

    special() {
        console.log('Warrior special');
    }

    shield() {
        console.log('Warrior shield');
    }

    dodge() {
        console.log('Warrior dodge');
    }

    moveUp() {
        console.log('Warrior move up');
    }

    moveDown() {
        console.log('Warrior move down');
    }

    moveLeft() {
        console.log('Warrior move left');
    }

    moveRight() {
        console.log('Warrior move right');
    }
}

export default Warrior