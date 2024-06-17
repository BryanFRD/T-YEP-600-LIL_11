import Weapon, { IWeapon } from './weapon'

class Sword implements IWeapon {
    weapon: Weapon

    speed: number = 500
    attack: number = 10
    defense: number = 10
    specialAttack: number = 20

    constructor(weapon: Weapon) {
        this.weapon = weapon
        this.weapon.setDisplaySize(32, 32)
        this.weapon.setTintFill(0x787878)
        this.weapon.setCollideWorldBounds(false)
    }

    lightAttack(): void {
        throw new Error('Method not implemented.')
    }
    heavyAttack(): void {
        throw new Error('Method not implemented.')
    }
    grabThrow(): void {
        throw new Error('Method not implemented.')
    }
    special(): void {
        throw new Error('Method not implemented.')
    }
    shield(): void {
        throw new Error('Method not implemented.')
    }
    dodge(): void {
        throw new Error('Method not implemented.')
    }
    moveUp(): void {
        throw new Error('Method not implemented.')
    }
    moveDown(): void {
        throw new Error('Method not implemented.')
    }
    moveLeft(): void {
        throw new Error('Method not implemented.')
    }
    moveRight(): void {
        throw new Error('Method not implemented.')
    }

    update() {}
}

export default Sword
