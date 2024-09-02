class OptionsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OptionsScene' })
  }

  init(data) {
    // Récupérer la scène précédente à partir des données passées lors du démarrage de cette scène
    this.previousScene = data.previousScene || null
  }

  create() {
    // Titre du menu des options
    this.add
      .text(400, 100, 'Options', {
        fontSize: '32px',
        color: '#ffffff'
      })
      .setOrigin(0.5)

    // Créer le bouton "Configuration des touches"
    const configButton = this.add
      .text(400, 300, 'Configuration des touches', {
        fontSize: '28px',
        color: '#ffffff',
        backgroundColor: '#000000'
      })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('keyboardConfigScene', {
          previousScene: 'OptionsScene'
        })
      })

    // Ajouter des effets visuels au bouton
    configButton.on('pointerover', () => {
      configButton.setStyle({ fill: '#ff0' })
    })

    configButton.on('pointerout', () => {
      configButton.setStyle({ fill: '#ffffff' })
    })

    // Ajouter le bouton "Mute/Unmute" du son
    const muteButton = this.add
      .text(400, 400, 'Activer le mode silencieux', {
        fontSize: '28px',
        color: '#ffffff',
        backgroundColor: '#000000'
      })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive()

    // Gérer l'état mute/unmute
    let isMuted = false

    muteButton.on('pointerdown', () => {
      isMuted = !isMuted
      this.sound.mute = isMuted // Phaser 3 a un gestionnaire de son intégré
      muteButton.setText(
        isMuted ? 'Desactiver le mode silencieux' : 'Activer le mode silencieux'
      )
    })

    muteButton.on('pointerover', () => {
      muteButton.setStyle({ fill: '#ff0' })
    })

    muteButton.on('pointerout', () => {
      muteButton.setStyle({ fill: '#ffffff' })
    })

    // Ajouter l'étiquette "Volume"
    this.add
      .text(250, 500, 'Volume', {
        fontSize: '24px',
        color: '#ffffff'
      })
      .setOrigin(0.5)

    // Ajouter un slider pour ajuster le volume
    const slider = this.add
      .rectangle(400, 500, 200, 20, 0x666666)
      .setOrigin(0.5)
    const sliderHandle = this.add
      .rectangle(300, 500, 20, 40, 0xffffff)
      .setOrigin(0.5)
      .setInteractive({ draggable: true })

    // Ajuster le volume en fonction du curseur
    sliderHandle.on('drag', (pointer, dragX) => {
      // Limiter le mouvement du curseur à la largeur du slider
      if (dragX >= 300 && dragX <= 500) {
        sliderHandle.x = dragX
        const volume = (dragX - 300) / 200 // Normaliser le volume entre 0 et 1
        this.sound.volume = volume
      }
    })

    // Ajouter le bouton "Retour"
    const backButton = this.add
      .text(400, 600, 'Retour', {
        fontSize: '28px',
        color: '#ffffff',
        backgroundColor: '#000000'
      })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.previousScene) {
          this.scene.start(this.previousScene) // Retour à la scène précédente
        }
      })

    backButton.on('pointerover', () => {
      backButton.setStyle({ fill: '#ff0' })
    })

    backButton.on('pointerout', () => {
      backButton.setStyle({ fill: '#ffffff' })
    })

    // Ajoutez ici d'autres options et éléments du menu si nécessaire
  }
}

export default OptionsScene
