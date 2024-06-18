class SaveGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SaveGameScene' })
    }

    create() {
        this.add.text(400, 300, 'Enregistrer une Partie', { fontSize: '32px' }).setOrigin(0.5)
        // Ajoutez ici la logique pour enregistrer la partie actuelle
    }
}

export default SaveGameScene;