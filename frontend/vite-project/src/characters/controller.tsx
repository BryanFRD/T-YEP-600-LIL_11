import { CharacterObject } from "./character";

class Controller  {
    character : CharacterObject;
    scene : Phaser.Scene;

    // Default key setting
    keySetting : { [key: string]: string } = {
        'ArrowUp' : 'up',
        'ArrowDown' : 'down',
        'ArrowLeft' : 'left',
        'ArrowRight' : 'right',
        'a' : 'lightAttack',
        'z' : 'heavyAttack',
        'e' : 'grabThrow',
        'r' : 'special',
        'd' : 'shield',
        's' : 'dodge',
        'p' : 'pause',
        'n' : 'restart'
    }
    constructor(scene : Phaser.Scene, character : CharacterObject) {
        this.character = character;
        this.scene = scene;
        this.handleInput();
    }

    handleInput() {
        this.scene.input.keyboard?.on('keydown', (event : KeyboardEvent) => {
            switch(this.keySetting[event.key]) {
                case 'up':
                    this.character.moveUp();
                    break;
                case 'down':
                    this.character.moveDown();
                    break;
                case 'left':
                    this.character.moveLeft();
                    break;
                case 'right':
                    this.character.moveRight();
                    break;
                case 'lightAttack':
                    this.character.lightAttack();
                    break;
                case 'heavyAttack':
                    this.character.heavyAttack();
                    break;
                case 'grabThrow':
                    this.character.grabThrow();
                    break;
                case 'special':
                    this.character.special();
                    break;
                case 'shield':
                    this.character.shield();
                    break;
                case 'dodge':
                    this.character.dodge();
                    break;
                case 'pause':
                    if (this.scene.scene.isPaused()) this.scene.scene.resume();
                    else this.scene.scene.pause();
                    break;
                case 'restart':
                    this.scene.scene.restart( { key: this.scene.scene.key } );
                    break;
                default:
                    break;
            }
        })
    }

    getKeySetting() {
        return this.keySetting;
    }

    setKeySetting(key : string, value : string) {
        this.keySetting[key] = value;
    }
}

export default Controller