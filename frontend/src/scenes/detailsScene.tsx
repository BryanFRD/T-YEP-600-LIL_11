import logger from '../logger/logger'
import Server from '../server/Server'

class DetailsScene {
  private scene: Phaser.Scene
  private server: Server | null = null
  private debugText: Phaser.GameObjects.Text | null = null

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  create() {
    this.server = Server.getInstance()
    this.debugText = this.scene.add.text(10, 10, '', { fontSize: '16px' })
    this.debugText.visible = false
  }

  update(time: number, delta: number): void {
    if (this.server && this.debugText?.visible) {
      this.debugText.setText([
        `Ping: ${this.server.ping === -1 ? 'N/A' : this.server.ping + 'ms'}`,
        `FPS: ${this.scene.game.loop.actualFps.toFixed(2)}`,
        `Delta: ${delta.toFixed(2)}`
      ])
    }
  }

  switchVisible(): void {
    if (this.debugText) {
      this.debugText.visible = !this.debugText.visible
    }
  }
}

export default DetailsScene
