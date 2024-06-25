import Weapon from '../weapons/weapon'
import Character, { ICharacter } from './character'

class Warrior implements ICharacter {
    character: Character
    weapon: Weapon

    actions: string[] = []

    speed: number = 400
    health: number = 120
    attack: number = 15
    defense: number = 12
    specialAttack: number = 25
    weapon: Weapon

  constructor(character: Character) {
    this.character = character

    this.weapon = new Weapon(
      this.character.scene,
      this.character.x,
      this.character.y,
      'hand',
      this.character
    )
    this.weapon.y = this.character.y - 1

    if (this.character && this.character.body) {
      this.character.setVelocity(100, 200)

      this.character.setTintFill(0xffa500)
      this.character.setDisplaySize(80, 128)

      if (this.character.body.velocity.x < 0) {
        this.character.setFlipX(true)
      } else {
        this.character.setFlipX(false)
      }
    } else {
      throw new Error('Invalid character name')
    }
  }

  update(_time: number, _delta: number) {}

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

export default Warrior
