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
  }
}

export default config
