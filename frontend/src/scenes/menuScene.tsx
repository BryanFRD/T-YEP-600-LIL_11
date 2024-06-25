import Phaser from 'phaser'

import { IScene } from './scene'

class MenuScene extends Phaser.Scene implements IScene {
  constructor() {
    super('menu')
  }

  preload() {
    this.load.image('newGameButton', 'path/to/newGameButton.png')
    this.load.image('continueButton', 'path/to/continueButton.png')
    this.load.image('saveButton', 'path/to/saveButton.png')
    this.load.image('optionsButton', 'path/to/optionsButton.png')
    this.load.image('quitButton', 'path/to/quitButton.png')
  }

  create() {
    this.add
      .image(400, 100, 'newGameButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('NewGameScene')
      })

    this.add
      .image(400, 200, 'continueButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('ContinueGameScene')
      })

    this.add
      .image(400, 300, 'saveButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('SaveGameScene')
      })

    this.add
      .image(400, 400, 'optionsButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('OptionsScene')
      })

    this.add
      .image(400, 500, 'quitButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.quitGame()
      })
    this.add
      .image(400, 100, 'newGameButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('NewGameScene')
      })

    this.add
      .image(400, 200, 'continueButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('ContinueGameScene')
      })

    this.add
      .image(400, 300, 'saveButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('SaveGameScene')
      })

    this.add
      .image(400, 400, 'optionsButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('OptionsScene')
      })

    this.add
      .image(400, 500, 'quitButton')
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
