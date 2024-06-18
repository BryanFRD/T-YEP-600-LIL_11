import Phaser from 'phaser'

import Character from '../characters/character'
import Axe from './axe'
import Hand from './hand'
import Sword from './sword'

export type WeaponType = {
  sword: Sword
  hand: Hand
  axe: Axe
}

export type WeaponName = keyof WeaponType
export type WeaponObject = WeaponType[keyof WeaponType]

export interface IWeapon {
  weapon: Weapon
  speed: number
  attack: number
  defense: number
  specialAttack: number

  lightAttack(): void
  heavyAttack(): void
  grabThrow(): void
  special(): void
  shield(): void
  dodge(): void
  moveUp(): void
  moveDown(): void
  moveLeft(): void
  moveRight(): void
}

class Weapon extends Phaser.Physics.Arcade.Sprite {
  weapon: WeaponObject
  text: Phaser.GameObjects.Text
  character: Character | null

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    weaponName: WeaponName,
    character?: Character
  ) {
    super(scene, x, y, weaponName)
    scene.physics.world.enableBody(this)

    this.character = character || null

    if (!this.body) {
      throw new Error('Invalid weapon name')
    }

    this.body.gravity.y = 0
    this.body.gravity.x = 0

    this.name = 'weapon: ' + weaponName
    this.weapon = this.getWeapon(weaponName)
    this.setCollideWorldBounds(false)
    //add collide bewtenn this weapon and other weapons
    this.scene.add.existing(this)

    this.text = this.scene.add.text(0, 0, weaponName, { color: '#0f0' })
    this.text.setOrigin(0.5) // set the origin of the text object to the center
    this.text.setPosition(this.body.center.x, this.body.center.y) // set the position of the text object to the center of the sprite

    this.scene.physics.add.overlap(
      this,
      this.scene.children
        .getAll()
        .filter(child => child instanceof Weapon && child !== this)
    )

    this.scene.physics.add.overlap(
      this,
      this.scene.children
        .getAll()
        .filter(
          child => child instanceof Character && child !== this.character
        ),
      (weapon, character) => {
        const weaponObject = weapon as Weapon
        const characterObject = character as Character

        characterObject.character.health -= weaponObject.weapon.attack
        characterObject.setTintFill(0xff0000)

        if (characterObject.character.health <= 0) {
          characterObject.deleteCharacter()
        }
      }
    )
  }

  update(_time: number, delta: number) {
    if (!this.body) {
      throw new Error('Invalid weapon name')
    }

    this.text.x = this.x + (this.body.velocity.x * delta) / 1000
    this.text.y = this.y + (this.body.velocity.y * delta) / 1000

    this.weapon.update()
  }

  getWeapon(weaponName: WeaponName): WeaponObject {
    switch (weaponName) {
      case 'sword':
        return new Sword(this)
      case 'hand':
        return new Hand(this)
      case 'axe':
        return new Axe(this)
      default:
        throw new Error('Invalid weapon name')
    }
  }

  deleteWeapon() {
    this.destroy()
    this.text.destroy()
  }

  setCharacter(character: Character | null) {
    this.character = character
  }
}

export default Weapon
