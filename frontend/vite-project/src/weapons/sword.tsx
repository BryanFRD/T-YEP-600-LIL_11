import Weapon from "./weapon";

class Sword {

    weapon: Weapon;

    speed: number = 500;
    attack: number = 10;
    defense: number = 10;
    specialAttack: number = 20;


    constructor(weapon: Weapon) {

        this.weapon = weapon;
        this.weapon.setDisplaySize(32, 32);
        this.weapon.setTintFill(0x787878);
        this.weapon.setCollideWorldBounds(false);
    }

    update() {
        this.weapon.setVelocity(0, 0);
    }
}


export default Sword