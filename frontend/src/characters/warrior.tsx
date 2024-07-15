import { abs } from 'mathjs'

import Character, { ICharacter } from './character'

class Mage implements ICharacter {
  character: Character

  speed: number = 300
  maxHealth: number = 100
  health: number = this.maxHealth
  attack: number = 10
  defense: number = 10
  special: number = 20
  actualAttack: ((target: Character) => void) | null = null

  constructor(character: Character) {
    this.character = character

    if (this.character && this.character.body) {
      this.character.setVelocity(100, 200)

      this.character.setTintFill(0x121212)
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

    this.actualAttack = null
  }
  specialAttack(target: Character): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }
    target.character.health -= this.special * 2
    target.setVelocityY(this.character.body.velocity.y > 0 ? 500 : -500)
    target.setVelocityX(this.character.body.velocity.x > 0 ? 500 : -500)

    this.actualAttack = null
  }
  grabThrow(_target?: Character): void {
    if (this.character.weapon && this.character.body) {
      // eject wweapon
      this.character.weapon.character = null

      const angle = Math.atan2(
        this.character.body.velocity.y,
        this.character.body.velocity.x
      )
      this.character.weapon.setVelocityY(Math.sin(angle) * 1000)
      this.character.weapon.setVelocityX(Math.cos(angle) * 1000)
      this.character.weapon = null

      this.actualAttack = null
    }
  }
  wallJumpAttack(target: Character): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }
    target.character.health -= this.attack
    target.setVelocityY(-600)
    target.setVelocityX(this.character.body.velocity.x > 0 ? 400 : -400)

    this.actualAttack = null
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

    this.actualAttack = null
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

    this.actualAttack = null
  }
  lightAttack(target: Character): void {
    if (this.character.inAir) this.airLightAttack(target)

    if (this.character.weapon) {
      target.character.health -= this.character.weapon.weapon.attack
    } else {
      target.character.health -= this.attack
    }

    this.actualAttack = null
  }
  heavyAttack(target: Character): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }

    if (this.character.inAir) this.airHeavyAttack(target)

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

    this.actualAttack = null
  }
  airLightAttack(target: Character): void {
    target.character.health -= this.attack

    this.actualAttack = null
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

    this.actualAttack = null
  }
  jump(): void {
    if (!this.character.inAir) {
      this.character.setVelocityY(-this.speed * 3)
      this.character.inAir = true
    }

    this.actualAttack = null
  }
  dash(target?: Character): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }

    if (this.character.inAir) this.airDash()

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

    this.actualAttack = null
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

    this.actualAttack = null
  }

  crouch(): void {
    this.character.setAccelerationY(this.speed * 10)

    this.actualAttack = null
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
  }
}

export default Mage
