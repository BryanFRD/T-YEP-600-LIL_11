import Phaser from 'phaser'

import { IScene } from './scene'

class MenuScene extends Phaser.Scene implements IScene {
  constructor() {
    super('menu')
  }

  preload() {
    this.load.image('newGameButton', '/assets/images/newGame.png')
    this.load.image('optionsButton', '/assets/images/options.png')
  }

  create() {
    this.add.text(600, 100, 'RAPTOR FIGHT', { fontSize: '72px' }).setOrigin(0.5)

    this.add
      .image(600, 300, 'newGameButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('game')
      })

    this.add
      .image(600, 400, 'optionsButton')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('OptionsScene', { previousScene: 'menu' }) // Passer la scène précédente ici
      })
  }
  quitGame() {
    this.game.destroy(true)
  }
}
export default MenuScene
