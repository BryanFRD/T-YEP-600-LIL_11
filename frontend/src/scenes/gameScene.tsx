import { randomInt } from 'mathjs'
import Phaser from 'phaser'

import Character from '../characters/character'
import { EntitiesAndTileCollision } from '../characters/collideManager'
import ControllerManager from '../characters/controllerManager'
import config from '../config'
import { InputKey } from '../input/InputEnum'
import InputManager from '../manager/InputManager'
import Weapon from '../weapons/weapon'
import DetailsScene from './detailsScene'
import HUD from './gameHud'
import { IScene } from './scene'

class GameScene extends Phaser.Scene implements IScene, InputManager {
  controllerManager: ControllerManager | undefined
  detailsScene: DetailsScene | undefined
  camera: Phaser.Cameras.Scene2D.Camera | undefined
  mapName: string
  mapConfig: (typeof config.map)[keyof typeof config.map]

  player?: Character
  enemies?: Character[]

  layerPlatform: Phaser.Tilemaps.TilemapLayer | null
  objectsBackground:
    | Phaser.GameObjects.Sprite[]
    | Phaser.GameObjects.GameObject[]
    | null
  objectsDeath:
    | Phaser.GameObjects.Sprite[]
    | Phaser.GameObjects.GameObject[]
    | null

  Hud: Phaser.Scenes.ScenePlugin | null = null

  constructor(mapName: string = 'example') {
    super('game')
    this.mapName = mapName
    this.mapConfig = config.map[mapName as keyof typeof config.map]

    this.layerPlatform = null
    this.objectsDeath = null
    this.objectsBackground = null
  }

  preload() {
    for (let i = 0; i < this.mapConfig.tilesetsPath.length; i++) {
      this.load.image(
        this.mapConfig.tilesetsNames[i],
        this.mapConfig.tilesetsPath[i]
      )
    }
    this.load.tilemapTiledJSON(
      `tilemap_${this.mapName}`,
      this.mapConfig.tilemapPath
    )
    this.camera = this.cameras.main
  }

  create() {
    const map = this.make.tilemap({
      key: `tilemap_${this.mapName}`,
      tileWidth: 16,
      tileHeight: 16
    })
    if (!map) {
      console.error('Tilemap not found')
      return
    }

    const tilesets = []
    for (let i = 0; i < this.mapConfig.tilesetsPath.length; i++) {
      const tileset = map.addTilesetImage(
        this.mapConfig.tilesetsNames[i],
        this.mapConfig.tilesetsNames[i],
        this.mapConfig.tilesetsSizes[i].frameWidth,
        this.mapConfig.tilesetsSizes[i].frameHeight,
        this.mapConfig.tilesetsMargin[i],
        this.mapConfig.tilesetsSpacing[i],
        this.mapConfig.tilesetsGid[i]
      )
      tilesets.push(tileset)
    }

    console.log(tilesets[0])
    if (tilesets.filter(tileset => tileset !== null).length > 0) {
      this.createLayers(map, tilesets as Phaser.Tilemaps.Tileset[])
    } else {
      console.error('Tileset not found')
      return
    }
    this.setupDeathObjects(map)

    this.enemies = [
      new Character(this, randomInt(400, 1040), randomInt(0, 100), 'warrior'),
      new Character(this, randomInt(400, 1040), randomInt(0, 100), 'warrior'),
      new Character(this, randomInt(400, 1040), randomInt(0, 100), 'warrior')
    ]

    this.controllerManager = new ControllerManager(
      this,
      new Character(this, randomInt(400, 1040), randomInt(0, 100), 'mage')
    )
    this.player = this.controllerManager.character

    if (!this.camera) {
      throw new Error('Invalid camera')
    }

    this.camera.startFollow(this.controllerManager.character, false, 0.05, 0.05)
    this.camera.setBounds(
      0,
      0,
      map.widthInPixels * this.mapConfig.zoom,
      map.heightInPixels * this.mapConfig.zoom
    )
    this.camera.setZoom(1.1)

    this.physics.add.collider(
      this.children.getAll().filter(child => child instanceof Character),
      this.objectsDeath as Phaser.GameObjects.Sprite[],
      character => {
        ;(character as Character).deleteCharacter()
        if (character === this.controllerManager?.character) {
          this.controllerManager = undefined
        }
      }
    )

    this.Hud = this.scene.launch('gameHud', {
      player: this.player,
      enemies: this.enemies
    })
  }

  private createLayers(
    map: Phaser.Tilemaps.Tilemap,
    tilesets: Phaser.Tilemaps.Tileset[]
  ) {
    const layerBackground = map.createLayer('BACKGROUND', tilesets[0], 0, 0)
    const layerSky = map.createLayer('SKY', tilesets[1], 0, 0)
    this.layerPlatform = map.createLayer('PLATFORM', tilesets[0], 0, 0)
    const layerDecoration = map.createLayer('DECORATION', tilesets[0], 0, 0)

    if (
      !this.layerPlatform ||
      !layerDecoration ||
      !layerBackground ||
      !layerSky
    ) {
      console.error('One or more layers not found')
      return
    }

    const zoom = this.mapConfig.zoom
    layerDecoration.setScale(zoom)
    this.layerPlatform.setScale(zoom)
    this.layerPlatform.setCollisionByExclusion([-1])
    layerBackground.setScale(zoom)
    layerSky.setScale(zoom)
    layerSky.setScrollFactor(0.5)
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
      this.children.getAll().filter((child: Phaser.GameObjects.GameObject) => {
        return (
          child instanceof Character ||
          (child instanceof Weapon && child.character === null)
        )
      }) as (Character | Weapon)[],
      this.layerPlatform
    )

    this.children.each(child => {
      if (child.update) {
        child.update(time, delta)
      }
    })
    this.controllerManager?.update(time, delta)
    this.detailsScene?.update(time, delta)
  }

  handleInput(key: InputKey, status: boolean): void {
    if (key === InputKey.INFORMATIONS && status) {
      this.detailsScene?.switchVisible()
    }
  }
}

export default GameScene
