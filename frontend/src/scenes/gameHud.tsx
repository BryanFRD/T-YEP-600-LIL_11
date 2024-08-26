import Phaser from 'phaser'

import Character from '../characters/character'

class HUD extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, player: Character, enemies: Character[]) {
    super(scene, 0, 0)

    this.createPlayerHealthBar(player)
    enemies.forEach((enemy, index) => {
      this.createEnemyHealthBar(enemy, index)
    })

    scene.add.existing(this)
    scene.cameras.main.ignore(this)
    this.setDepth(1)
  }

  createPlayerHealthBar(player: Character) {
    const { x, y } = this.scene.cameras.main.getWorldPoint(
      this.scene.cameras.main.width - 110,
      10
    )

    const healthBar = this.scene.add.graphics()
    const healthText = this.scene.add.text(x, y - 10, 'Player', {
      fontSize: '16px',
      color: '#fff'
    })
    healthText.setOrigin(0.5)
    healthText.setDepth(1)

    this.add([healthBar, healthText])

    player.on('healthChanged', (health: number) => {
      healthBar.clear()
      healthBar.fillStyle(0xff0000, 1)
      healthBar.fillRect(x - 50, y, 100, 10)
      healthBar.fillStyle(0x00ff00, 1)
      healthBar.fillRect(x - 50, y, health * 2, 10)
    })
  }

  createEnemyHealthBar(enemy: Character, index: number) {
    const { x, y } = this.scene.cameras.main.getWorldPoint(110, 10 + index * 20)

    const healthBar = this.scene.add.graphics()
    const healthText = this.scene.add.text(x, y - 10, `Enemy ${index + 1}`, {
      fontSize: '16px',
      color: '#fff'
    })
    healthText.setOrigin(0.5)

    this.add([healthBar, healthText])

    enemy.on('healthChanged', (health: number) => {
      healthBar.clear()
      healthBar.fillStyle(0xff0000, 1)
      healthBar.fillRect(x - 50, y, 100, 10)
      healthBar.fillStyle(0x00ff00, 1)
      healthBar.fillRect(x - 50, y, health * 2, 10)
    })
  }
}

export default HUD
