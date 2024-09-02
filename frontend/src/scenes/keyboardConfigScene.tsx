class KeyboardConfigScene extends Phaser.Scene {
  constructor() {
    super({ key: 'keyboardConfigScene' })
  }

  init(data) {
    // Récupérer la scène précédente à partir des données passées lors du démarrage de cette scène
    this.previousScene = data.previousScene || null
  }

  create() {
    // Titre du menu d'options
    this.add
      .text(400, 50, 'Options - Configuration des touches', {
        fontSize: '32px',
        color: '#ffffff'
      })
      .setOrigin(0.5)

    // Liste des commandes et touches associées
    const controlsText = `
    Flèche Haut (↑) : Déplacement vers le haut
    Flèche Bas (↓) : Déplacement vers le bas
    Flèche Gauche (←) : Déplacement vers la gauche
    Flèche Droite (→) : Déplacement vers la droite
    Touche 'A' : Attaque légère
    Touche 'Z' : Attaque lourde
    Touche 'E' : Attraper ou lancer
    Touche 'Q' : Activer le bouclier
    Touche 'R' : Attaque spéciale
    Touche 'S' : Dash / Esquive rapide
    Touche 'P' : Informations / Menu pause
    `

    // Afficher le texte des commandes
    this.add.text(100, 150, controlsText, {
      fontSize: '24px',
      color: '#ffffff',
      align: 'left'
    })

    // Ajouter le bouton "Retour"
    const backButton = this.add
      .text(400, 500, 'Retour', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000'
      })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.previousScene) {
          this.scene.start(this.previousScene) // Retour à la scène précédente
        } else {
          console.warn('Aucune scène précédente définie !')
        }
      })

    backButton.on('pointerover', () => {
      backButton.setStyle({ fill: '#ff0' })
    })

    backButton.on('pointerout', () => {
      backButton.setStyle({ fill: '#ffffff' })
    })
  }
}

export default KeyboardConfigScene
