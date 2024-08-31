// character.ts

import Phaser from 'phaser'

import Weapon from '../weapons/weapon'
import AttackManager from './attackManager'
import Mage from './mage'
import Warrior from './warrior'
import { User } from '../types/user.type'

export type CharacterType = {
  warrior: Warrior
  mage: Mage
}

export type CharacterName = keyof CharacterType
export type CharacterObject = CharacterType[keyof CharacterType]

export interface ICharacter {
  character: Character

  speed: number
  health: number
  maxHealth: number
  attack: number
  defense: number
  special: number

  update(time: number, delta: number): void

  lightAttack(target: Character): void // input : light
  heavyAttack(target: Character): void // input : heavy
  airLightAttack(target: Character): void // input : airLight
  airHeavyAttack(target: Character): void // input : airHeavy
  wallJumpAttack(target: Character): void // input : wallJump
  wallDashAttack(target: Character): void // input : wallDash
  specialAttack(target: Character): void // input : special
  grabThrow(target?: Character): void // input : grabThrow
  jump(): void
  dash(target?: Character): void
  airDash(target?: Character): void
  crouch(): void // input : crouch
  moveLeft(): void // input : left
  moveRight(): void // input : right
}

class Character extends Phaser.Physics.Arcade.Sprite {
  user: User | null
  character: CharacterObject
  weapon: Weapon | null
  comboManager: AttackManager

  dead = false

  text: Phaser.GameObjects.Text
  healthBar: Phaser.GameObjects.Graphics

  movementFunctions: { [key: string]: () => void } = {
    up: () => this.character.jump(),
    down: () => this.character.crouch(),
    left: () => this.character.moveLeft(),
    right: () => this.character.moveRight()
  }

  inAir: boolean = true
  inWall: boolean = false
  
  constructor(
    user: User | null,
    scene: Phaser.Scene,
    x: number,
    y: number,
    characterName: CharacterName,
  ) {
    super(scene, x, y, characterName)
    
    this.user = user
    scene.physics.world.enableBody(this)
    scene.physics.world.enableBody(this)

    if (!this.body) {
      throw new Error('Invalid character name')
    }

    this.setBounce(0)
    this.setGravityY(2000)
    this.setGravityX(0)

    this.scene.add.existing(this)

    this.character = this.getCharacter(characterName)
    this.comboManager = new AttackManager(this)

    this.text = this.scene.add.text(0, 0, user?.firstname || characterName, { color: user ? '#f55' : '#0f0' })
    this.text.setOrigin(0.5) // set the origin of the text object to the center
    this.text.setPosition(this.body.center.x, this.body.center.y) // set the position of the text object to the center of the sprite

    // Create a new graphics object to represent the health bar
    this.healthBar = this.scene.add.graphics()
    // Create a new graphics object to represent the health bar
    this.healthBar = this.scene.add.graphics()

    // Set the position of the health bar to the bottom of the sprite character
    this.healthBar.x = this.x - this.width / 2
    this.healthBar.y = this.y + this.height / 2
    // Set the position of the health bar to the bottom of the sprite character
    this.healthBar.x = this.x - this.width / 2
    this.healthBar.y = this.y + this.height / 2

    // Add the health bar as a child of the sprite character
    this.scene.add.existing(this.healthBar)

    // Create a new weapon object for the character
    this.weapon = new Weapon(this.scene, this.x, this.y, 'sword', this)
    this.weapon.y = this.y - 1
  }

  update(time: number, delta: number) {
    // Check if the character has a valid body
    if (!this.body) {
      throw new Error('Invalid character name')
    }

    if (!this.inAir) {
      this.setGravityY(0)
    } else {
      this.setGravityY(2000)
    }

    // Update the character's
    this.character.update(time, delta)
    this.comboManager.update(time, delta)

    const decelerationFactor = this.inAir ? 0.98 : 0.01

    // Apply deceleration to the character's velocity
    this.setVelocityX(
      this.body.velocity.x * Math.pow(decelerationFactor, delta / 1000)
    )
    this.setVelocityY(
      this.body.velocity.y * Math.pow(decelerationFactor, delta / 1000)
    )
    // Update the position of the text object to ensure it stays at the center of the sprite
    this.text.x = this.x + (this.body.velocity.x * delta) / 1000
    this.text.y = this.y + (this.body.velocity.y * delta) / 1000

    // Update the position of the weapon based on the character's current position
    if (this.weapon && this.weapon.body) {
      this.weapon.body.velocity.x = this.body.velocity.x
      this.weapon.body.velocity.y = this.body.velocity.y

      const weaponSidePosition = this.body.velocity.x < 0 ? -50 : 50
      this.weapon.body.position.x =
        this.x +
        (this.body.velocity.x * delta) / 1000 +
        weaponSidePosition -
        this.weapon.body.width / 2
      this.weapon.body.position.y =
        this.y +
        (this.body.velocity.y * delta) / 1000 -
        this.weapon.body.height / 2
    }

    // Update the size of the health bar based on the character's current health
    this.healthBar.clear()
    this.healthBar.fillStyle(0xff0000, 1)
    this.healthBar.fillRect(0, 0, this.width, 5)
    this.healthBar.fillStyle(0x00ff00, 1)
    this.healthBar.fillRect(
      0,
      0,
      (this.character.health / this.character.maxHealth) * this.width,
      5
    )

    // Update the position of the health bar to ensure it stays at the bottom of the sprite character
    this.healthBar.x =
      this.x - this.width / 2 + (this.body.velocity.x * delta) / 1000
    this.healthBar.y =
      this.y + this.height / 2 + (this.body.velocity.y * delta) / 1000
  }

  controlerInput(key: string) {
    if (this.movementFunctions[key]) {
      this.movementFunctions[key]()
    } else {
      this.comboManager.inputReceived(key)
    }
  }

  getCharacter(characterName: CharacterName): CharacterObject {
    switch (characterName) {
      case 'warrior':
        return new Warrior(this)
      case 'mage':
        return new Mage(this)
      default:
        throw new Error('Invalid character name')
    }
  }

  deleteCharacter() {
    this.destroy()
    this.text.destroy()
    this.healthBar.destroy()
    if (this.weapon) {
      this.weapon.deleteWeapon()
    }
    this.dead = true
  }
  
  setPos(x: number, y: number) {
    this.x = x
    this.y = y
  }
  
}

export default Character
