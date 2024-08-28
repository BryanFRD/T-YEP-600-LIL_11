import Scene from './scenes/scene'

const config = {
  character: {
    functionCooldowns: {
      light: 250,
      heavy: 1000,
      dash: 500,
      airlight: 250,
      airheavy: 1000,
      airdash: 500,
      walljump: 250,
      walldash: 1000,
      grabThrow: 500,
      special: 1000
    }
  },
  game: {
    type: Phaser.WEBGL,
    width: window.innerWidth,
    height: window.innerHeight,
    fps: {
      target: 60,
      forceSetTimeOut: true
    },
    powerPreference: 'high-performance',
    scene: Scene(),
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 50,
          x: 0
        },
        debug: true
      }
    }
  },
  map: {
    example: {
      name: 'example',
      tilesetsPath: [
        `assets/maps/mapTest/tileset-extruded.png`,
        `assets/maps/mapTest/tileset-cloud-extruded.png`
      ],
      tilesetsSizes: [
        { frameWidth: 16, frameHeight: 16 },
        { frameWidth: 16, frameHeight: 16 }
      ],
      tilesetsMargin: [1, 1],
      tilesetsSpacing: [2, 2],
      tilesetsNames: ['tileset', 'tileset-cloud'],
      tilesetsOffset: [
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ],
      tilesetsGid: [0, 78],
      tilemapPath: `assets/maps/mapTest/mapTest.json`,
      zoom: 3
    }
  }
}

export default config
