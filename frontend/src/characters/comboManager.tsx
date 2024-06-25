import Character from './character'

// 'up',
// 'down',
//  'left',
// 'right',
// 'lightAttack',
// 'heavyAttack',
// 'grabThrow',
// 'special',
// 'shield',
// 'dodge',

class ComboManager {
  public currentCombo: string[] = []
  private comboTimer: number = 0
  private comboDelay: number = 500 // temps en millisecondes entre chaque input pour considérer qu'il s'agit du même combo
  private controlFunctions: { [key: string]: (target: Character) => void } = {
    light: (target: Character) => this.character.character.lightAttack(target),
    heavy: (target: Character) => this.character.character.heavyAttack(target),
    lightlight: (target: Character) =>
      this.character.character.lightAttackCombo(target),
    lightheavy: (target: Character) =>
      this.character.character.lightHeavyCombo(target),
    heavylight: (target: Character) =>
      this.character.character.heavyLightCombo(target),
    heavyheavy: (target: Character) =>
      this.character.character.heavyHeavyCombo(target),
    lightlightheavy: (target: Character) =>
      this.character.character.lightLightHeavyCombo(target),
    lightheavyheavy: (target: Character) =>
      this.character.character.lightHeavyHeavyCombo(target),
    heavyheavylight: (target: Character) =>
      this.character.character.heavyHeavyLightCombo(target),
    lightheavylight: (target: Character) =>
      this.character.character.lightHeavyLightCombo(target),
    lightdash: (target: Character) =>
      this.character.character.lightDashAttack(target),
    heavydash: (target: Character) =>
      this.character.character.heavyDashAttack(target),
    airlight: (target: Character) =>
      this.character.character.airLightAttack(target),
    airheavy: (target: Character) =>
      this.character.character.airHeavyAttack(target),
    airlightlight: (target: Character) =>
      this.character.character.airLightAttackCombo(target),
    airheavyheavy: (target: Character) =>
      this.character.character.airHeavyAttackCombo(target),
    airdash: (target: Character) => this.character.character.airDash(target),
    // walljump: (target: Character) => this.character.character.wallJumpAttack(target),
    // walldash: (target: Character) => this.character.character.wallDashAttack(target),
    // groundRecovery: (target: Character) =>
    //   this.character.character.groundRecoveryAttack(target),
    // airRecovery: (target: Character) =>
    //   this.character.character.airRecoveryAttack(target),
    special: (target: Character) =>
      this.character.character.specialAttack(target)
  }

  constructor(private character: Character) {}

  public update(time: number, delta: number): void {
    // Mettre à jour le timer du combo
    this.comboTimer -= delta

    // Si le timer est écoulé, réinitialiser le combo
    if (this.comboTimer <= 0) {
      this.resetCombo()
    }
  }

  public inputReceived(input: string): void {
    // Si le timer est écoulé, réinitialiser le combo
    if (this.comboTimer <= 0) {
      this.resetCombo()
    }

    //Si l'intput est déjà dans le combo actuel, ne pas l'ajouter
    if (this.currentCombo[this.currentCombo.length - 1] === input) {
      return
    }

    // Ajouter l'input au combo actuel
    this.currentCombo.push(input)

    // Réinitialiser le timer du combo
    this.comboTimer = this.comboDelay
  }

  public checkCombo(target: Character): void {
    // tester si le combo actuel est un combo valide
    for (let i = 0; i < this.currentCombo.length; i++) {
      // Si le personnage est en l'air et que le combo est un combo aérien, exécuter le combo
      if (
        this.character.inAir &&
        this.controlFunctions[
          ['air', this.currentCombo.slice(i, this.currentCombo.length)].join('')
        ]
      ) {
        this.controlFunctions[
          ['air', this.currentCombo.slice(i, this.currentCombo.length)].join('')
        ](target)
        console.log(
          ['air', this.currentCombo.slice(i, this.currentCombo.length)].join('')
        )
        break
      }
      // Sinon, si le combo est un combo au sol, exécuter le combo
      else if (
        this.controlFunctions[
          this.currentCombo.slice(i, this.currentCombo.length).join('')
        ]
      ) {
        this.controlFunctions[
          this.currentCombo.slice(i, this.currentCombo.length).join('')
        ](target)
        console.log(
          this.currentCombo.slice(i, this.currentCombo.length).join('')
        )
        break
      }
    }
  }

  private resetCombo(): void {
    this.currentCombo = []
  }
}

export default ComboManager
