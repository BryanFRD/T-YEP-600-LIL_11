import Phaser from "phaser"
import Sword from "./sword"
import Hand from "./hand"
import Axe from "./axe"
import { identity } from "mathjs";



export type WeaponType = {
    sword: Sword;
    hand: Hand;
    axe: Axe;
};

export type WeaponName = keyof WeaponType;
export type WeaponObject = WeaponType[keyof WeaponType];

class Weapon extends Phaser.Physics.Arcade.Sprite {

    weapon: WeaponObject;
    text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, weaponName: WeaponName) {
        super(scene, x, y, weaponName);
        scene.physics.world.enableBody(this);

        if (!this.body){
            throw new Error('Invalid weapon name');
        }
        this.name = "weapon: " + weaponName
        this.weapon =  this.getWeapon(weaponName);
        //add collide bewtenn this weapon and other weapons
        this.scene.add.existing(this);

        this.text = this.scene.add.text(0, 0, weaponName, { color: '#0f0' });
        this.text.setOrigin(0.5); // set the origin of the text object to the center
        this.text.setPosition(this.body.center.x, this.body.center.y); // set the position of the text object to the center of the sprite
    }

    update(time : number, delta : number) {

        this.text.x = this.x;
        this.text.y = this.y;
        this.weapon.update();
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
                throw new Error('Invalid weapon name');
        }
    }
}

export default Weapon;
