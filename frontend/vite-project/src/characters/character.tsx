// character.ts

import Phaser from 'phaser'
import Warrior from './warrior'
import Mage from './mage'
import Weapon from '../weapons/weapon'

export type CharacterType = {
    warrior: Warrior
    mage: Mage
}

export type CharacterName = keyof CharacterType
export type CharacterObject = CharacterType[keyof CharacterType]

export interface ICharacter {
    character: Character
    weapon: Weapon
    speed: number
    health: number
    attack: number
    defense: number
    specialAttack: number

    lightAttack(): void
    heavyAttack(): void
    grabThrow(): void
    special(): void
    shield(): void
    dodge(): void
    moveUp(): void
    moveDown(): void
    moveLeft(): void
    moveRight(): void
}

class Character extends Phaser.Physics.Arcade.Sprite {
    character: CharacterObject
    text: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, characterName: CharacterName) {
        super(scene, x, y, characterName)

        scene.physics.world.enableBody(this)

        if (!this.body) {
            throw new Error('Invalid character name')
        }

        this.setCollideWorldBounds(true)
        this.setBounce(0.9)
        this.setGravityY(500)
        this.setGravityX(0)

        this.scene.add.existing(this)

        this.character = this.getCharacter(characterName)
        //add collide bewtenn this character and other characters
        this.scene.physics.add.collider(
            this,
            this.scene.children.getAll().filter((child) => child instanceof Character && child !== this)
        )

        this.text = this.scene.add.text(0, 0, characterName, { color: '#0f0' })
        this.text.setOrigin(0.5) // set the origin of the text object to the center
        this.text.setPosition(this.body.center.x, this.body.center.y) // set the position of the text object to the center of the sprite
    }

    update(time: number, delta: number) {
        if (!this.body) {
            throw new Error('Invalid character name')
        }

        this.character.update(time, delta)

        this.text.x = this.x + (this.body.velocity.x * delta) / 1000
        this.text.y = this.y + (this.body.velocity.y * delta) / 1000

        if (this.character.character.body && this.character.weapon.body) {
            this.character.weapon.body.velocity.x = this.character.character.body.velocity.x
            this.character.weapon.body.velocity.y = this.character.character.body.velocity.y

            const weaponSidePosition = this.character.character.body.velocity.x < 0 ? -50 : 50
            this.character.weapon.body.position.x =
                this.character.character.x +
                (this.character.character.body.velocity.x * delta) / 1000 +
                weaponSidePosition -
                this.character.weapon.body.width / 2
            this.character.weapon.body.position.y =
                this.character.character.y +
                (this.character.character.body.velocity.y * delta) / 1000 -
                this.character.weapon.body.height / 2
        } else {
            throw new Error('Invalid character name')
        }
    }

    getCharacter(characterName: CharacterName): CharacterObject {
        switch (characterName) {
            case 'warrior':
                return new Warrior(this)
            case 'mage':
                return new Mage(this)
            default:
                throw new Error('Invalid character name')
        }
    }
}

export default Character
