import Weapon, { IWeapon } from './weapon'

class Hand implements IWeapon {
  weapon: Weapon

  speed: number = 600
  attack: number = 8
  defense: number = 5
  specialAttack: number = 15

  constructor(weapon: Weapon) {
    this.weapon = weapon
    this.weapon.setDisplaySize(16, 16)
    this.weapon.setTintFill(0xffffff)
    this.weapon.setCollideWorldBounds(false)
  }

  lightAttack(): void {
    throw new Error('Method not implemented.')
  }
  heavyAttack(): void {
    throw new Error('Method not implemented.')
  }
  grabThrow(): void {
    throw new Error('Method not implemented.')
  }
  special(): void {
    throw new Error('Method not implemented.')
  }
  shield(): void {
    throw new Error('Method not implemented.')
  }
  dodge(): void {
    throw new Error('Method not implemented.')
  }
  moveUp(): void {
    throw new Error('Method not implemented.')
  }
  moveDown(): void {
    throw new Error('Method not implemented.')
  }
  moveLeft(): void {
    throw new Error('Method not implemented.')
  }
  moveRight(): void {
    throw new Error('Method not implemented.')
  }

  update() {}
}

export default Hand
