import Phaser from 'phaser'
import Sword from './sword'
import Hand from './hand'
import Axe from './axe'

export type WeaponType = {
    sword: Sword
    hand: Hand
    axe: Axe
}

export type WeaponName = keyof WeaponType
export type WeaponObject = WeaponType[keyof WeaponType]

export interface IWeapon {
    weapon: Weapon
    speed: number
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

class Weapon extends Phaser.Physics.Arcade.Sprite {
    weapon: WeaponObject
    text: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, weaponName: WeaponName) {
        super(scene, x, y, weaponName)
        scene.physics.world.enableBody(this)

        if (!this.body) {
            throw new Error('Invalid weapon name')
        }

        this.body.gravity.y = 0
        this.body.gravity.x = 0

        this.name = 'weapon: ' + weaponName
        this.weapon = this.getWeapon(weaponName)
        this.setCollideWorldBounds(false)
        //add collide bewtenn this weapon and other weapons
        this.scene.add.existing(this)

        this.text = this.scene.add.text(0, 0, weaponName, { color: '#0f0' })
        this.text.setOrigin(0.5) // set the origin of the text object to the center
        this.text.setPosition(this.body.center.x, this.body.center.y) // set the position of the text object to the center of the sprite

        this.setFriction(0, 0)
    }

    update(time: number, delta: number) {
        if (!this.body) {
            throw new Error('Invalid weapon name')
        }

        this.text.x = this.x + (this.body.velocity.x * delta) / 1000
        this.text.y = this.y + (this.body.velocity.y * delta) / 1000

        this.weapon.update()
    }

    getWeapon(weaponName: WeaponName): WeaponObject {
        switch (weaponName) {
            case 'sword':
                return new Sword(this)
            case 'hand':
                return new Hand(this)
            case 'axe':
                return new Axe(this)
            default:
                throw new Error('Invalid weapon name')
        }
    }
}

export default Weapon
