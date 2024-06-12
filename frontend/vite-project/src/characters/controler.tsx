import Character from "./character";

class Controler  {
    character : Character;
    scene : Phaser.Scene;
    constructor(scene : Phaser.Scene, character : Character) {
        this.character = character;
        this.scene = scene;
        this.moveCharacter();
    }

    moveCharacter() {
        this.scene.input.keyboard?.on('keydown', (event : KeyboardEvent) => {
            switch(event.key) {
                case 'ArrowUp':
                    this.character.setVelocityY(-100);
                    break;
                case 'ArrowDown':
                    this.character.setVelocityY(100);
                    break;
                case 'ArrowLeft':
                    this.character.setVelocityX(-100);
                    break;
                case 'ArrowRight':
                    this.character.setVelocityX(100);
                    break;
            }
        })
    }
}

export default Controler