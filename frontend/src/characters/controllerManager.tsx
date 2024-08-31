import Character from './character'
import logger from '../logger/logger'
import { HOLDABLE_KEYS, InputKey } from '../input/InputEnum'
import InputManager, { implementsInputManager } from '../manager/InputManager'

class ControllerManager {
  character: Character
  scene: Phaser.Scene
  keySetting: { [key in InputKey]: Phaser.Input.Keyboard.Key }
  keyStatus: { [key in InputKey]: boolean }

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
      shield: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.Q
      ),
      special: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.R
      ),
      dash: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      informations: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    }
    this.keyStatus = {
      up: false,
      down: false,
      left: false,
      right: false,
      light: false,
      heavy: false,
      grabThrow: false,
      special: false,
      shield: false,
      dash: false,
      informations: false
    }
    this.handleInput()
  }

  update(_time: number, _delta: number) {
    Object.entries(this.keyStatus).forEach(([key, status]) => {
      if (status) {
        this.character.controlerInput(key)
        if (!HOLDABLE_KEYS.includes(key as InputKey)) {
          this.keyStatus[key as InputKey] = false
        }
        
        if (implementsInputManager(this.scene)) {
          (this.scene as InputManager).handleInput(key as InputKey, status)
        }
      }
    })
  }

  handleInput() {
    Object.entries(this.keySetting).forEach(([key, inputKey]) => {
      inputKey.on('down', () => {
        this.keyStatus[key as InputKey] = true
      })
      inputKey.on('up', () => {
        this.keyStatus[key as InputKey] = false
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
      this.keySetting[key as InputKey].keyCode = keyCode
    } else {
      logger.warn(`Invalid key code: ${value}`)
    }
  }
}

export default ControllerManager
