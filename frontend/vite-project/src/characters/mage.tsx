import Character from "./character";

class Mage {
    constructor(character: Character) {
        character.setCollideWorldBounds(true);
        character.setBounce(0.2);
        character.setGravityY(300);
        character.setGravityX(0);
        character.setVelocity(100, 200);
    }
}


export default Mage