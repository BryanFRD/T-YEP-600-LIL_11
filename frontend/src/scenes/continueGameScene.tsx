class ContinueGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ContinueGameScene' })
  }

  create() {
    this.add
      .text(400, 300, 'Continuer Partie', { fontSize: '32px' })
      .setOrigin(0.5)
    // Ajoutez ici la logique pour continuer une partie existante
  }
}

export default ContinueGameScene
