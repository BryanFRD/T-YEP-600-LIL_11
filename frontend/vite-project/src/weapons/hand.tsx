import Weapon from "./weapon";

class Hand {

    weapon: Weapon;

    speed: number = 600;
    attack: number = 8;
    defense: number = 5;
    specialAttack: number = 15;

    constructor(weapon: Weapon) {

        this.weapon = weapon;
        this.weapon.setDisplaySize(16, 16);
        this.weapon.setTintFill(0xffffff);
        this.weapon.setCollideWorldBounds(false);
    }

    update() {
        this.weapon.setVelocity(0, 0);
    }
}

export default Hand;
