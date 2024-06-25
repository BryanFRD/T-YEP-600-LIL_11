import Character, { ICharacter } from './character'

class Warrior implements ICharacter {
  character: Character

  actions: string[] = []

  speed: number = 200
  maxHealth: number = 500
  health: number = this.maxHealth
  attack: number = 15
  defense: number = 12
  special: number = 25
  actualAttack: void | null = null

  constructor(character: Character) {
    this.character = character

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
  moveLeft(): void {
    this.character.setVelocityX(-this.speed)
  }
  moveRight(): void {
    this.character.setVelocityX(this.speed)
  }
  lightAttack(target: Character): void {
    if (this.character.weapon) {
      target.character.health -= this.character.weapon.weapon.attack
    } else {
      target.character.health -= this.attack
    }
  }
  heavyAttack(target: Character): void {
    if (this.character.weapon) {
      target.character.health -= this.character.weapon.weapon.attack * 2
    } else {
      target.character.health -= this.attack * 2
    }
  }
  lightAttackCombo(target: Character): void {
    throw new Error('Method not implemented.')
  }
  lightHeavyCombo(target: Character): void {
    throw new Error('Method not implemented.')
  }
  heavyLightCombo(target: Character): void {
    throw new Error('Method not implemented.')
  }
  heavyHeavyCombo(target: Character): void {
    throw new Error('Method not implemented.')
  }
  lightLightHeavyCombo(target: Character): void {
    throw new Error('Method not implemented.')
  }
  lightHeavyHeavyCombo(target: Character): void {
    throw new Error('Method not implemented.')
  }
  heavyHeavyLightCombo(target: Character): void {
    throw new Error('Method not implemented.')
  }
  lightHeavyLightCombo(target: Character): void {
    throw new Error('Method not implemented.')
  }
  lightDashAttack(target: Character): void {
    throw new Error('Method not implemented.')
  }
  heavyDashAttack(target: Character): void {
    throw new Error('Method not implemented.')
  }
  airLightAttack(target: Character): void {
    throw new Error('Method not implemented.')
  }
  airHeavyAttack(target: Character): void {
    throw new Error('Method not implemented.')
  }
  airLightAttackCombo(target: Character): void {
    throw new Error('Method not implemented.')
  }
  airHeavyAttackCombo(target: Character): void {
    throw new Error('Method not implemented.')
  }
  airDashAttack(target: Character): void {
    throw new Error('Method not implemented.')
  }
  wallJumpAttack(target: Character): void {
    throw new Error('Method not implemented.')
  }
  wallDashAttack(target: Character): void {
    throw new Error('Method not implemented.')
  }
  groundRecoveryAttack(target: Character): void {
    throw new Error('Method not implemented.')
  }
  airRecoveryAttack(target: Character): void {
    throw new Error('Method not implemented.')
  }
  specialAttack(target: Character): void {
    throw new Error('Method not implemented.')
  }
  superSpecialAttack(target: Character): void {
    throw new Error('Method not implemented.')
  }
  block(target: Character): void {
    throw new Error('Method not implemented.')
  }
  parry(target: Character): void {
    throw new Error('Method not implemented.')
  }
  dodge(target: Character): void {
    throw new Error('Method not implemented.')
  }
  jump(): void {
    this.character.setVelocityY(-300)
    this.character.inAir = true
  }
  doubleJump(target: Character): void {
    throw new Error('Method not implemented.')
  }
  wallJump(target: Character): void {
    throw new Error('Method not implemented.')
  }
  wallCling(target: Character): void {
    throw new Error('Method not implemented.')
  }
  wallSlide(target: Character): void {
    throw new Error('Method not implemented.')
  }
  dash(target: Character): void {
    throw new Error('Method not implemented.')
  }
  airDash(target: Character): void {
    throw new Error('Method not implemented.')
  }
  crouch(): void {
    this.character.setVelocityY(0)
  }
  roll(target: Character): void {
    throw new Error('Method not implemented.')
  }
  taunt(target: Character): void {
    throw new Error('Method not implemented.')
  }

  update(time: number, delta: number): void {
    if (!this.character.body) {
      throw new Error('Invalid character name')
    }
    if (this.character.body?.x < 50) {
      this.character.setVelocityX(this.speed)
    }
    if (this.character.body?.x > 800) {
      this.character.setVelocityX(-this.speed)
    }
  }
}

export default Warrior
