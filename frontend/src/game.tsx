import Phaser from 'phaser'
import { useEffect, useRef } from 'react'

import config from './config'
import logger from './logger/logger'
import useServerContext from './context/export/ServerContextExport'

const PhaserGame = () => {
  const gameRef = useRef(null)
  const gameInstanceRef = useRef<Phaser.Game | null>(null)

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
    </div>
  )
}

export default PhaserGame
