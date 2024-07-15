import Phaser from 'phaser'
import { useContext, useEffect, useRef } from 'react'

import config from './config'
import ServerContext from './context/ServerContext'
import logger from './logger/logger'

const PhaserGame = () => {
  const gameRef = useRef(null)
  const gameInstanceRef = useRef<Phaser.Game | null>(null)
  const { ping } = useContext(ServerContext)

  useEffect(() => {
    logger.info('PhaserGame useEffect')
    if (gameInstanceRef.current) {
      // L'instance de Phaser.Game existe déjà, on ne fait rien
      return
    }

    const game = new Phaser.Game({ ...config.game })
    gameInstanceRef.current = game

    return () => {
      game.destroy(true)
      gameInstanceRef.current = null
    }
  }, [])

  return (
    <div ref={gameRef}>
      <h1 className="fixed top-4 left-4 z-50 text-red-600">Ping: {ping}</h1>
    </div>
  )
}

export default PhaserGame
