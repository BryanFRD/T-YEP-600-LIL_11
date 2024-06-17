import Weapon, { IWeapon } from './weapon'

class Axe implements IWeapon {
    weapon: Weapon

    speed: number = 400
    attack: number = 15
    defense: number = 8
    specialAttack: number = 25

    constructor(weapon: Weapon) {
        this.weapon = weapon
        this.weapon.setDisplaySize(48, 48)
        this.weapon.setTintFill(0xffa500)
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

export default Axe
