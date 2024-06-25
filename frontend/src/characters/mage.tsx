import Weapon from '../weapons/weapon'
import Character, { ICharacter } from './character'

class Mage implements ICharacter {
    character: Character
    weapon: Weapon

    speed: number = 500
    health: number = 100
    attack: number = 10
    defense: number = 10
    specialAttack: number = 20

    actions: string[]

  constructor(character: Character) {
    this.character = character

        this.weapon = new Weapon(this.character.scene, this.character.x, this.character.y, 'sword', this.character)
        this.weapon.y = this.character.y - 1

        this.actions = []

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

  update() {}

    lightAttack() {
        this.actions.push('lightAttack')
    }

    heavyAttack() {
        this.actions.push('heavyAttack')
    }

    grabThrow() {
        this.actions.push('grabThrow')
    }

    special() {
        this.actions.push('special')
    }

    shield() {
        this.actions.push('shield')
    }

    dodge() {
        this.actions.push('dodge')
    }

    moveUp() {
        this.actions.push('moveUp')
    }

    moveDown() {
        this.actions.push('moveDown')
    }

    moveLeft() {
        this.actions.push('moveLeft')
    }

    moveRight() {
        this.actions.push('moveRight')
    }
}

export default Mage
