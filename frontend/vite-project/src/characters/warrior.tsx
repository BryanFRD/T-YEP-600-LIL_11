import Character from "./character";
import {randomInt} from "mathjs";
 
class Warrior {
    constructor(character : Character) {
        console.log(character);
        character.setVelocity(randomInt(-200, 200), randomInt(-200, 200));
        character.setFriction(0.99, 0.99);
    }
}

export default Warrior