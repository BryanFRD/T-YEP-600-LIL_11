import Phaser from 'phaser'

import Character from '../characters/character'

class GameHud extends Phaser.Scene {
  player: Character | null = null
  enemies: Character[] | null = null
  playerHealthBar: Phaser.GameObjects.Graphics | null = null
  playerHealthText: Phaser.GameObjects.Text | null = null
  enemyHealthBars: Phaser.GameObjects.Graphics[] = []
  enemyHealthTexts: Phaser.GameObjects.Text[] = []

  timeTexts: Phaser.GameObjects.Text | null = null
  startTime: number = Date.now()

  constructor() {
    super('gameHud')
  }

  init(data: { player: Character; enemies: Character[] }) {
    this.player = data['player']
    this.enemies = data['enemies']
    // reset time when entering the game
    this.startTime = Date.now()
  }

  create() {
    if (!this.player || !this.enemies) return

    // Create Player Health Bar
    this.playerHealthBar = this.add.graphics()

    // Player Health Text
    this.playerHealthText = this.add.text(120, 45, '', {
      fontSize: '16px',
      color: '#fff'
    })
    this.playerHealthText.setOrigin(0.5)

    // Create health bars and texts for each enemy
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i]

      // Create Enemy Health Bar
      const enemyHealthBar = this.add.graphics()
      this.enemyHealthBars.push(enemyHealthBar)

      // Enemy Health Text
      const enemyHealthText = this.add.text(
        window.innerWidth - 120,
        45 + 30 * i,
        '',
        {
          fontSize: '16px',
          color: '#fff'
        }
      )
      enemyHealthText.setOrigin(0.5)
      this.enemyHealthTexts.push(enemyHealthText)
    }

    // Create Time Text
    this.timeTexts = this.add.text(window.innerWidth / 2, 20, '00:00', {
      fontSize: '16px',
      color: '#fff'
    })
    this.timeTexts.setOrigin(0.5)
  }

  updateHealthBar() {
    if (!this.playerHealthBar || !this.player) return

    // Update Player Health Bar
    this.updateSingleHealthBar(
      this.playerHealthBar,
      this.player.character.health,
      this.player.character.maxHealth,
      20,
      35,
      200
    )

    // Update Player Health Text
    if (this.playerHealthText) {
      this.playerHealthText.setText(
        `${this.player.character.health}/${this.player.character.maxHealth}`
      )
    }

    // Update Enemies' Health Bars and Texts
    if (this.enemies) {
      for (let i = 0; i < this.enemies.length; i++) {
        const enemy = this.enemies[i]
        const enemyHealthBar = this.enemyHealthBars[i]
        const enemyHealthText = this.enemyHealthTexts[i]

        if (enemy.dead) {
          enemyHealthBar.destroy()
          enemyHealthText.destroy()
          // Remove the enemy from the list
          this.enemies.splice(i, 1)
          this.enemyHealthBars.splice(i, 1)
          this.enemyHealthTexts.splice(i, 1)
          // update text positions
          for (let j = i; j < this.enemies.length; j++) {
            this.enemyHealthTexts[j].y = 45 + 30 * j
          }
        }

        if (enemyHealthBar && enemy) {
          this.updateSingleHealthBar(
            enemyHealthBar,
            enemy.character.health,
            enemy.character.maxHealth,
            window.innerWidth - 220,
            35 + 30 * i,
            200
          )
        }

        if (enemyHealthText) {
          enemyHealthText.setText(
            `${enemy.character.health}/${enemy.character.maxHealth}`
          )
        }
      }
    }
  }

  updateSingleHealthBar(
    healthBar: Phaser.GameObjects.Graphics,
    currentHealth: number,
    maxHealth: number,
    x: number,
    y: number,
    fullWidth: number
  ) {
    // Clear the previous bar
    healthBar.clear()

    // Calculate the width based on health percentage
    const healthPercentage = Phaser.Math.Clamp(currentHealth / maxHealth, 0, 1)
    const barWidth = healthPercentage * fullWidth

    // Set the color based on the health level
    let barColor = 0x00ff00 // green
    if (healthPercentage <= 0.5) barColor = 0xffff00 // yellow
    if (healthPercentage <= 0.25) barColor = 0xff0000 // red

    // Draw the health bar
    healthBar.fillStyle(barColor, 1)
    healthBar.fillRoundedRect(x, y, barWidth, 20, 5)
  }

  update() {
    if (!this.player) return

    // Continuously update the player's and enemies' health bars and texts
    this.updateHealthBar()

    // Update the time text
    if (this.timeTexts) {
      const time = Date.now() - this.startTime
      const minutes = Math.floor(time / 60000)
      const seconds = ((time % 60000) / 1000).toFixed(0)
      this.timeTexts.setText(
        `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`
      )
    }
  }
}

export default GameHud
