import config from '../config'
import Character from './character'

class AttackManager {
  private currentCombo: string[] = []
  private currentAttack: string | null = null
  private attackTimer: number = 0
  private attackDelay: number = 500 // milliseconds between each input for considering it as the same input
  private comboTimer: number = 0
  private comboDelay: number = 500 // milliseconds between each input for considering it as the same combo
  private controlFunctionsWithTarget: {
    [key: string]: (target: Character) => void
  } = {
    light: (target: Character) => this.character.character.lightAttack(target),
    heavy: (target: Character) => this.character.character.heavyAttack(target),
    dash: (target: Character) => this.character.character.dash(target),
    airlight: (target: Character) =>
      this.character.character.airLightAttack(target),
    airheavy: (target: Character) =>
      this.character.character.airHeavyAttack(target),
    airdash: () => this.character.character.airDash(),
    walljump: (target: Character) =>
      this.character.character.wallJumpAttack(target),
    walldash: (target: Character) =>
      this.character.character.wallDashAttack(target),
    grabThrow: (target: Character) =>
      this.character.character.grabThrow(target),
    special: (target: Character) =>
      this.character.character.specialAttack(target)
  }
  private controlFunctionsWithoutTarget: { [key: string]: () => void } = {
    grabThrow: () => this.character.character.grabThrow()
  }

  private functionCooldowns: { [key: string]: number } =
    config.character.functionCooldowns

  private functionTimers: { [key: string]: number } = Object.keys(
    this.functionCooldowns
  ).reduce(
    (timers, key) => {
      timers[key] = 0
      return timers
    },
    {} as { [key: string]: number }
  )

  constructor(private character: Character) {}

  public update(_time: number, delta: number): void {
    // Update the combo timer and the attack timers
    this.comboTimer -= delta
    this.attackTimer -= delta
    for (const attack in this.functionTimers) {
      this.functionTimers[attack] -= delta
    }

    // If the combo timer is expired, reset the combo
    if (this.comboTimer <= 0) {
      this.resetCombo()
    }
  }

  public inputReceived(input: string): void {
    // If the input is the same as the last input, do not add it
    if (this.currentCombo[this.currentCombo.length - 1] === input) {
      return
    }

    // If the combo timer is expired, reset the combo
    if (this.comboTimer <= 0) {
      this.resetCombo()
    }

    // Add the input to the current combo
    this.currentCombo.push(input)
    this.currentAttack = input

    // If the input is a special attack or a ranged attack, perform it immediately
    if (input === 'special' || input === 'grabThrow') {
      this.checkAttack()
      return
    }

    // Reset the combo timer
    this.comboTimer = this.comboDelay
  }

  public checkAttack(target?: Character): void {
    // If the attack timer is not expired, do not process the attack
    if (this.attackTimer > 0) {
      return
    }

    // Test if the current attack is valid and not on cooldown
    if (target) {
      if (this.currentAttack && this.functionTimers[this.currentAttack] <= 0) {
        if (this.controlFunctionsWithTarget[this.currentAttack]) {
          this.controlFunctionsWithTarget[this.currentAttack](target)

          // Set the cooldown for the current attack
          this.functionTimers[this.currentAttack] =
            this.functionCooldowns[this.currentAttack]

          // Reset Attack
          this.currentAttack = null
        }

        // Reset the attack timer
        this.attackTimer = this.attackDelay
      }
    } else {
      if (this.currentAttack && this.functionTimers[this.currentAttack] <= 0) {
        if (this.controlFunctionsWithoutTarget[this.currentAttack]) {
          this.controlFunctionsWithoutTarget[this.currentAttack]()

          // Set the cooldown for the current attack
          this.functionTimers[this.currentAttack] =
            this.functionCooldowns[this.currentAttack]

          // Reset Attack
          this.currentAttack = null
        }

        // Reset the attack timer
        this.attackTimer = this.attackDelay
      }
    }
  }

  private resetCombo(): void {
    this.currentCombo = []
    this.currentAttack = null
  }

  getCombo(): string[] {
    return this.currentCombo
  }

  getAttack(): string | null {
    return this.currentAttack
  }

  getComboTimer(): number {
    return this.comboTimer
  }

  getAttackTimer(): number {
    return this.attackTimer
  }

  getFunctionCooldowns(): { [key: string]: number } {
    return this.functionCooldowns
  }

  getFunctionTimers(): { [key: string]: number } {
    return this.functionTimers
  }

  setComboTimer(timer: number): void {
    this.comboTimer = timer
  }

  setAttackTimer(timer: number): void {
    this.attackTimer = timer
  }

  setCombo(combo: string[]): void {
    this.currentCombo = combo
  }

  setAttack(attack: string): void {
    this.currentAttack = attack
  }
}

export default AttackManager
