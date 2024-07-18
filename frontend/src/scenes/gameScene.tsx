import { randomInt } from 'mathjs'
import Phaser from 'phaser'

import Character from '../characters/character'
import { EntitiesAndTileCollision } from '../characters/collideManager'
import ControllerManager from '../characters/controllerManager'
import config from '../config'
import Weapon from '../weapons/weapon'
import { IScene } from './scene'

class GameScene extends Phaser.Scene implements IScene {
  controllerManager: ControllerManager | undefined
  mapName: string
  mapConfig: (typeof config.map)[keyof typeof config.map]

  layerPlatform: Phaser.Tilemaps.TilemapLayer | null

  constructor(mapName: string = 'exemple') {
    super('game')
    this.mapName = mapName
    this.controllerManager = undefined
    this.mapConfig = config.map[mapName as keyof typeof config.map]

    this.layerPlatform = null
  }

  preload() {
    this.load.image('tileset_' + this.mapName, this.mapConfig.tilesetPath)

    this.load.tilemapTiledJSON(
      'tilemap_' + this.mapName,
      this.mapConfig.tilemapPath
    )

    this.cameras.main.setBackgroundColor('#000000')
  }

  create() {
    const map = this.make.tilemap({ key: 'tilemap_' + this.mapName })
    if (!map) {
      console.error('Tilemap not found')
      return
    }

    const tileset = map.addTilesetImage(
      'tileTest',
      'tileset_' + this.mapName,
      16,
      16,
      1,
      2
    )
    if (!tileset) {
      console.error('Tileset not found')
      return
    }

    const layerBackground = map.createLayer('BACKGROUND', tileset, 0, 0)
    this.layerPlatform = map.createLayer('PLATFORM', tileset, 0, 0)
    const layerDecoration = map.createLayer('DECORATION', tileset, 0, 0)

    this.layerPlatform?.setCollisionBetween(1, 21)

    const collideDeath = map.createFromObjects('DEATH', {
      key: 'tileset_' + this.mapName,
      gid: 1
    })

    if (
      !layerBackground ||
      !this.layerPlatform ||
      !layerDecoration ||
      !collideDeath
    ) {
      console.error('One or more layers not found')
      return
    }

    layerBackground.setScale(3)
    this.layerPlatform.setScale(3)
    layerDecoration.setScale(3)

    this.layerPlatform.setCollisionByProperty({ collides: true })

    for (let i = 0; i < 5; i++) {
      new Character(this, randomInt(100, 700), randomInt(100, 500), 'warrior')
    }

    this.controllerManager = new ControllerManager(
      this,
      new Character(this, randomInt(100, 700), randomInt(100, 500), 'mage')
    )

    this.physics.add.collider(
      this.controllerManager.character,
      collideDeath,
      () => {
        this.controllerManager?.character.deleteCharacter()
      }
    )
  }

  update(time: number, delta: number) {
    if (!this.layerPlatform) {
      throw new Error('Invalid layer')
    }
    EntitiesAndTileCollision(
      this.children
        .getAll()
        .filter(child => child instanceof (Character || Weapon)),
      this.layerPlatform
    )

    this.children.each(child => {
      if (child.update) {
        child.update(time, delta)
      }
    })
    this.controllerManager?.update(time, delta)
  }
}

export default GameScene
