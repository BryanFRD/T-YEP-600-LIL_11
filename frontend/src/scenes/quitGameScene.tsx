class OptionsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OptionsScene' })
  }

  create() {
    this.add.text(400, 300, 'Options', { fontSize: '32px' }).setOrigin(0.5)
    // Ajoutez ici la logique pour afficher et modifier les options du jeu
  }
}

export default OptionsScene