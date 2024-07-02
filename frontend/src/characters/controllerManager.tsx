import Character from './character'

export enum MovementKeys {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

class ControllerManager {
  character: Character
  scene: Phaser.Scene
  keySetting: { [key: string]: Phaser.Input.Keyboard.Key }
  keyStatus: { [key: string]: boolean }
  private movementKeys: string[] = ['up', 'down', 'left', 'right']

  constructor(scene: Phaser.Scene, character: Character) {
    this.character = character
    this.scene = scene
    if (this.scene.input.keyboard == null) {
      throw new Error('No keyboard found')
    }
    this.keySetting = {
      up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.DOWN
      ),
      left: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.LEFT
      ),
      right: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.RIGHT
      ),
      light: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      heavy: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      grabThrow: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.E
      ),
      special: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.R
      ),
      dash: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    }
    this.keyStatus = {
      up: false,
      down: false,
      left: false,
      right: false,
      lightAttack: false,
      heavyAttack: false,
      grabThrow: false,
      special: false,
      shield: false,
      dash: false
    }
    this.handleInput()
  }

  update(time: number, delta: number) {
    Object.entries(this.keyStatus).forEach(([key, status]) => {
      if (status) {
        this.character.controlerInput(key)
        // Reset all action keys except for movement keys
        if (!this.movementKeys.includes(key)) {
          this.keyStatus[key] = false
        }
      }
    })
  }

  handleInput() {
    Object.entries(this.keySetting).forEach(([key, inputKey]) => {
      inputKey.on('down', () => {
        this.keyStatus[key] = true
      })
      inputKey.on('up', () => {
        this.keyStatus[key] = false
      })
    })
  }

  getKeyStatus() {
    return this.keyStatus
  }

  setKeySetting(key: string, value: string) {
    const keyCode =
      Phaser.Input.Keyboard.KeyCodes[
        value as keyof typeof Phaser.Input.Keyboard.KeyCodes
      ]
    if (keyCode !== undefined) {
      this.keySetting[key].keyCode = keyCode
    } else {
      console.warn(`Invalid key code: ${value}`)
    }
  }
}

export default ControllerManager
