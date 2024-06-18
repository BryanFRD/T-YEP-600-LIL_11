class NewGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NewGameScene' })
    }

    create() {
        // Logique pour démarrer une nouvelle partie
        this.add.text(400, 300, 'Nouvelle Partie', { fontSize: '32px' }).setOrigin(0.5)
        // Plus de logique ici
    }
}

export default NewGameScene