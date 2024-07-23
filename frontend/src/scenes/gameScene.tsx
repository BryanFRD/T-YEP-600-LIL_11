import { randomInt } from 'mathjs'
import Phaser from 'phaser'

import Character from '../characters/character'
import ControllerManager from '../characters/controllerManager'
import { IScene } from './scene'
import InputManager from '../manager/InputManager'
import { InputKey } from '../input/InputEnum'
import DetailsScene from './detailsScene'

class GameScene extends Phaser.Scene implements IScene, InputManager {
  controllerManager: ControllerManager | undefined
  detailsScene: DetailsScene | undefined;

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
    
    this.detailsScene = new DetailsScene(this);
    this.detailsScene.create()
  }

  update(time: number, delta: number) {
    this.children.each(child => {
      if (child.update) {
        child.update(time, delta)
      }
    })
    this.controllerManager?.update(time, delta)
    this.detailsScene?.update(time, delta)
  }
  
  handleInput(key: InputKey, status: boolean): void {
    if(key === InputKey.INFORMATIONS && status) {
      this.detailsScene?.switchVisible()
    }
  }
  
}

export default GameScene
