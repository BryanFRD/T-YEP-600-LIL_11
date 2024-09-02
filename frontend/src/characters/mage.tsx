import { abs } from 'mathjs'

import Weapon from '../weapons/weapon'
import Character, { ICharacter } from './character'

class Mage implements ICharacter {
  character: Character

  speed: number = 300
  maxHealth: number = 100
  health: number = this.maxHealth
  attack: number = 10
  defense: number = 10
  special: number = 20

  constructor(character: Character) {
    this.character = character

    if (this.character && this.character.body) {
      // transparent character
      this.character.visible = false
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

  wallDashAttack(target: Character): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }
    target.character.health -= this.attack * 2
    target.setVelocityY(-600)
    target.setVelocityX(this.character.body.velocity.x > 0 ? 800 : -800)
  }
  specialAttack(target: Character): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }
    target.character.health -= this.special * 2
    target.setVelocityY(this.character.body.velocity.y > 0 ? 500 : -500)
    target.setVelocityX(this.character.body.velocity.x > 0 ? 500 : -500)
  }
  grabThrow(target?: Character | Weapon): void {
    console.log('grabThrow', target)
    if (this.character.weapon && this.character.body) {
      // eject weapon
      this.character.weapon.character = null

      const angle = Math.atan2(
        this.character.body.velocity.y,
        this.character.body.velocity.x
      )
      this.character.weapon.setVelocityY(Math.sin(angle) * 1000)
      this.character.weapon.setVelocityX(Math.cos(angle) * 1000)
      this.character.weapon = null
    }

    if (target && target.body && target instanceof Weapon) {
      this.character.weapon = target
      target.setCharacter(this.character)
    }
  }
  wallJumpAttack(target: Character): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }
    target.character.health -= this.attack
    target.setVelocityY(-600)
    target.setVelocityX(this.character.body.velocity.x > 0 ? 400 : -400)
  }
  moveLeft(): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }

    if (this.character.body.velocity.x >= -this.speed) {
      this.character.setAccelerationX(-this.speed * 10)
    } else {
      this.character.setVelocityX(-this.speed)
    }

    this.character.sprite?.play('run', true)
    this.character.sprite?.setFlipX(true)
  }
  moveRight(): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }

    if (this.character.body.velocity.x <= this.speed) {
      this.character.setAccelerationX(this.speed * 10)
    } else {
      this.character.setVelocityX(this.speed)
    }

    this.character.sprite?.play('run', true)
    this.character.sprite?.setFlipX(false)
  }
  lightAttack(target: Character): void {
    if (this.character.weapon) {
      target.character.health -= this.character.weapon.weapon.attack
    } else {
      target.character.health -= this.attack
    }

    this.character.sprite?.play('attack', true)
    target.sprite?.play('hit', true)
  }
  heavyAttack(target: Character): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }

    if (this.character.weapon) {
      target.character.health -= this.character.weapon.weapon.attack * 2
    } else {
      target.character.health -= this.attack * 2
    }

    //calculate trigo for the angle of the attack with the velocity
    const angle = Math.atan2(
      this.character.body.velocity.y,
      this.character.body.velocity.x
    )

    // use the angle to calculate the velocity of the attack
    target.setVelocityY(Math.sin(angle) * 1000)
    target.setVelocityX(Math.cos(angle) * 1000)

    target.inAir = true

    this.character.sprite?.play('attack', false)
    target.sprite?.play('hit', true)
  }
  airLightAttack(target: Character): void {
    target.character.health -= this.attack
  }
  airHeavyAttack(target: Character): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }

    target.character.health -= this.attack * 2

    //calculate trigo for the angle of the attack with the velocity
    const angle = Math.atan2(
      this.character.body.velocity.y,
      this.character.body.velocity.x
    )
    // use the angle to calculate the velocity of the attack
    target.setVelocityY(Math.sin(angle) * 1000)
    target.setVelocityX(Math.cos(angle) * 1000)

    target.inAir = true
  }
  jump(): void {
    if (!this.character.inAir) {
      this.character.setVelocityY(-this.speed * 3)
      this.character.inAir = true
    }

    this.character.sprite?.play('jump', true)
  }
  dash(target?: Character): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }

    if (target && target.body) {
      // dash to the target
      this.character.setPosition(
        this.character.body.velocity.x > 0
          ? target.x + target.body.width
          : target.x - this.character.body.width,
        target.y
      )
    } else {
      this.character.setPosition(
        this.character.body.velocity.x > 0
          ? this.character.x + 100
          : this.character.x - 100,
        this.character.y
      )
    }
  }

  airDash(): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }

    // calculate trigo for the angle of the attack with the velocity
    const angle = Math.atan2(
      this.character.body.velocity.y,
      this.character.body.velocity.x
    )

    // use the angle to calculate the velocity of the dash
    const dashDistance = 100 // distance to dash
    const dashX = this.character.x + dashDistance * Math.cos(angle)
    const dashY = this.character.y + dashDistance * Math.sin(angle)

    this.character.setPosition(dashX, dashY)
    this.character.inAir = true
  }

  crouch(): void {
    this.character.setAccelerationY(this.speed * 10)
  }

  update(_time: number, _delta: number): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }

    if (abs(this.character.body.velocity.x) > this.speed) {
      this.character.setAccelerationX(0)
    }

    if (
      abs(this.character.body.velocity.y) > this.speed * 2 ||
      !this.character.inAir
    ) {
      this.character.setAccelerationY(0)
    }

    if (this.character.sprite?.anims) {
      if (
        this.character.body.velocity.x < 5 &&
        this.character.body.velocity.x > -5 &&
        !this.character.inAir
      ) {
        this.character.sprite.play('idle', true)
      }
    }
    if (this.character.body.velocity.y > 0 && this.character.inAir) {
      this.character.sprite?.play('fall', true)
    }
  }
}

export default Mage
