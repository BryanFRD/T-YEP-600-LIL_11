import { randomInt } from 'mathjs'
import Phaser from 'phaser'

import Character from '../characters/character'
import ControllerManager from '../characters/controllerManager'
import { IScene } from './scene'

class GameScene extends Phaser.Scene implements IScene {
  controllerManager: ControllerManager | undefined

  constructor() {
    super('game')

    this.controllerManager = undefined
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io')
    this.load.image('sky', 'assets/skies/space3.png')
  }

  create() {
    const sprite = this.add.image(
      window.innerWidth / 2,
      window.innerHeight / 2,
      'sky'
    )

    sprite.setScale(1.5)

    for (let i = 0; i < 5; i++) {
      new Character(this, randomInt(100, 700), randomInt(100, 500), 'warrior')
    }

    this.controllerManager = new ControllerManager(
      this,
      new Character(this, randomInt(100, 700), randomInt(100, 500), 'mage')
    )
  }

  update(time: number, delta: number) {
    this.children.each(child => {
      if (child.update) {
        child.update(time, delta)
      }
    })
    this.controllerManager?.update(time, delta)
    console.log(this?.controllerManager?.character?.comboManager.currentCombo)
  }
}

export default GameScene
