import Phaser from "phaser";

class MenuScene extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    preload() {
    }

    create() {
        this.add.text(100, 100, 'Hello Phaser!', { color: '#0f0' });

        const rect = this.add.rectangle(100, 200, 100, 100, 0x00ff00);
        rect.setInteractive();
        rect.on('pointerdown', () => {
            this.scene.start('game');
        });

        this.add.circle(200, 200, 50, 0xff0000);
    }
}

export default MenuScene;
