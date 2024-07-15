import Phaser from 'phaser'

import { IScene } from './scene'

class MenuScene extends Phaser.Scene implements IScene {
  constructor() {
    super('menu')
  }

  preload() {
    this.load.image('newGameButton', '../../public/assets/images/newGame.png')
    this.load.image(
      'continueButton',
      '../../public/assets/images/continueGame.png'
    )
    this.load.image('saveButton', '../../public/assets/images/saveGame.png')
    this.load.image('optionsButton', '../../public/assets/images/options.png')
    this.load.image('quitButton', '../../public/assets/images/quit.png')
  }

  create() {
    this.add
      .image(600, 100, 'newGameButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('NewGameScene')
      })

    this.add
      .image(600, 200, 'continueButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('ContinueGameScene')
      })

    this.add
      .image(600, 300, 'saveButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('SaveGameScene')
      })

    this.add
      .image(600, 400, 'optionsButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('OptionsScene')
      })

    this.add
      .image(600, 500, 'quitButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.quitGame()
      })
    this.add.text(100, 100, 'Hello Phaser!', { color: '#0f0' })

    const rect = this.add.rectangle(100, 200, 100, 100, 0x00ff00)
    rect.setInteractive()
    rect.on('pointerdown', () => {
      this.scene.start('game')
    })

    this.add.circle(200, 200, 50, 0xff0000)
  }
  quitGame() {
    this.game.destroy(true)
  }
}

export default MenuScene
