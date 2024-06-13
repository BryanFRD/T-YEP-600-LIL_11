import Weapon from "./weapon";

class Axe {

    weapon: Weapon;

    speed: number = 400;
    attack: number = 15;
    defense: number = 8;
    specialAttack: number = 25;

    constructor(weapon: Weapon) {

        this.weapon = weapon;
        this.weapon.setDisplaySize(48, 48);
        this.weapon.setTintFill(0xffa500);
        this.weapon.setCollideWorldBounds(false);
    }

    update() {
        this.weapon.setVelocity(0, 0);
    }
}

export default Axe;
