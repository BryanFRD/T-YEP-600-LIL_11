import Weapon from '../weapons/weapon'
import Character, { ICharacter } from './character'

class Mage implements ICharacter {
    character: Character

    speed: number = 500
    health: number = 100
    attack: number = 10
    defense: number = 10
    specialAttack: number = 20
    weapon: Weapon

    constructor(character: Character) {
        this.character = character

        this.weapon = new Weapon(this.character.scene, this.character.x, this.character.y, 'sword', this.character)
        this.weapon.y = this.character.y - 1

        if (this.character && this.character.body) {
            this.character.setVelocity(100, 200)

            this.character.setTintFill(0x787878)
            this.character.setDisplaySize(64, 96)

            if (this.character.body.velocity.x < 0) {
                this.character.setFlipX(true)
            } else {
                this.character.setFlipX(false)
            }
        } else {
            throw new Error('Invalid character name')
        }
    }

    update(time: number, delta: number) {}

    lightAttack() {
        // light red
        this.character.setTintFill(0xff0000)
        // duration 0.2s distance 50px
    }

    heavyAttack() {
        // dark red
        this.character.setTintFill(0x8b0000)
    }

    grabThrow() {
        // light blue
        this.character.setTintFill(0x0000ff)
    }

    special() {
        // wellow
        this.character.setTintFill(0xffff00)
    }

    shield() {
        // dark blue
        this.character.setTintFill(0x00ff00)
    }

    dodge() {
        // light green
        this.character.setTintFill(0x00ff00)
    }

    moveUp() {
        this.character.setVelocityY(-this.speed)
    }

    moveDown() {
        this.character.setVelocityY(this.speed)
    }

    moveLeft() {
        this.character.setVelocityX(-this.speed)
    }

    moveRight() {
        this.character.setVelocityX(this.speed)
    }
}

export default Mage
