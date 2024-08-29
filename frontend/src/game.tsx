import Phaser from 'phaser'
import { useEffect, useRef } from 'react'

import config from './config'
import { useSelector } from 'react-redux'
import { RootState } from './store'

const PhaserGame = () => {

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  console.log(isAuthenticated, user);

  const gameRef = useRef(null)
  const gameInstanceRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (gameInstanceRef.current) {
      // L'instance de Phaser.Game existe déjà, on ne fait rien
      return
    }

    const game = new Phaser.Game({ ...config.game,  callbacks: {
      preBoot: (game) => {
        game.registry.set('user', user)
      }
    } })
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
