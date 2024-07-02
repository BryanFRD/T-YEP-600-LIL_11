import Phaser from 'phaser'
import { useEffect, useRef } from 'react'

import Scene from './scenes/scene'

const PhaserGame = () => {
  const gameRef = useRef(null)
  const gameInstanceRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (gameInstanceRef.current) {
      // L'instance de Phaser.Game existe déjà, on ne fait rien
      return
    }

    const config = {
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

    const game = new Phaser.Game(config)
    gameInstanceRef.current = game

    return () => {
      game.destroy(true)
      gameInstanceRef.current = null
    }
  }, [])

  return <div ref={gameRef}></div>
}

export default PhaserGame
