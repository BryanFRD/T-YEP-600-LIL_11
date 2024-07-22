import { randomInt } from 'mathjs'
import Phaser from 'phaser'

import Character from '../characters/character'
import { EntitiesAndTileCollision } from '../characters/collideManager'
import ControllerManager from '../characters/controllerManager'
import config from '../config'
import Weapon from '../weapons/weapon'
import { IScene } from './scene'

class GameScene extends Phaser.Scene implements IScene {
  controllerManager?: ControllerManager
  mapName: string
  mapConfig: (typeof config.map)[keyof typeof config.map]

  layerPlatform: Phaser.Tilemaps.TilemapLayer | null
  objectsDeath:
    | Phaser.GameObjects.Sprite[]
    | Phaser.GameObjects.GameObject[]
    | null

  constructor(mapName: string = 'example') {
    super('game')
    this.mapName = mapName
    this.mapConfig = config.map[mapName as keyof typeof config.map]

    this.layerPlatform = null
    this.objectsDeath = null
  }

  preload() {
    this.load.image(`tileset_${this.mapName}`, this.mapConfig.tilesetPath)
    this.load.tilemapTiledJSON(
      `tilemap_${this.mapName}`,
      this.mapConfig.tilemapPath
    )
    this.cameras.main.setBackgroundColor('#000000')
  }

  create() {
    const map = this.make.tilemap({ key: `tilemap_${this.mapName}` })
    if (!map) {
      console.error('Tilemap not found')
      return
    }

    const tileset = map.addTilesetImage(
      'tileTest',
      `tileset_${this.mapName}`,
      this.mapConfig.tilesetSizes.frameWidth,
      this.mapConfig.tilesetSizes.frameHeight,
      this.mapConfig.tilesetMargin,
      this.mapConfig.tilesetSpacing
    )
    if (!tileset) {
      console.error('Tileset not found')
      return
    }

    this.createLayers(map, tileset)
    this.setupDeathObjects(map)
    console.log(window.innerWidth, window.innerHeight)

    for (let i = 0; i < 5; i++) {
      new Character(this, randomInt(400, 1040), randomInt(0, 100), 'warrior')
    }

    this.controllerManager = new ControllerManager(
      this,
      new Character(this, randomInt(100, 700), randomInt(100, 500), 'mage')
    )

    this.physics.add.collider(
      this.children.getAll().filter(child => child instanceof Character),
      this.objectsDeath as Phaser.GameObjects.Sprite[],
      (character, object) => {
        ;(character as Character).deleteCharacter()
        if (character === this.controllerManager?.character) {
          this.controllerManager = undefined
        }
      }
    )
  }

  private createLayers(
    map: Phaser.Tilemaps.Tilemap,
    tileset: Phaser.Tilemaps.Tileset
  ) {
    const layerBackground = map.createLayer('BACKGROUND', tileset, 0, 0)
    this.layerPlatform = map.createLayer('PLATFORM', tileset, 0, 0)
    const layerDecoration = map.createLayer('DECORATION', tileset, 0, 0)

    if (!layerBackground || !this.layerPlatform || !layerDecoration) {
      console.error('One or more layers not found')
      return
    }

    const zoom = this.mapConfig.zoom
    layerBackground.setScale(zoom)
    this.layerPlatform.setScale(zoom)
    layerDecoration.setScale(zoom)
    this.layerPlatform.setCollisionBetween(1, 21)
  }

  private setupDeathObjects(map: Phaser.Tilemaps.Tilemap) {
    this.objectsDeath = map.createFromObjects('DEATH', {})
    if (!this.objectsDeath) {
      console.error('Death objects not found')
      return
    }

    const zoom = this.mapConfig.zoom
    this.objectsDeath.forEach(object => {
      const objectDeath = object as Phaser.GameObjects.Sprite & {
        body: Phaser.Physics.Arcade.Body
      }
      this.physics.world.enableBody(objectDeath)

      if (!objectDeath.body) {
        console.error('Invalid object')
        return
      }

      objectDeath.body.allowGravity = false
      objectDeath.body.immovable = true
      objectDeath.x = objectDeath.x * zoom
      objectDeath.y = objectDeath.y * zoom
      objectDeath.displayWidth = objectDeath.displayWidth * zoom
      objectDeath.displayHeight = objectDeath.displayHeight * zoom
      objectDeath.visible = false
    })
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
