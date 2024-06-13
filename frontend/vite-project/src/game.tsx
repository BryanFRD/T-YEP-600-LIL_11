import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import Scene from './scenes/scene';

const PhaserGame = () => {
  const gameRef = useRef(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (gameInstanceRef.current) {
      // L'instance de Phaser.Game existe déjà, on ne fait rien
      console.log('gameInstanceRef.current', gameInstanceRef.current);
      return;
    }

    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: Scene(),
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: 50,
            x: 0
          },
          debug: false
        }
      }
    };

    const game = new Phaser.Game(config);
    gameInstanceRef.current = game;

    return () => {
      game.destroy(true);
      gameInstanceRef.current = null;
    };
  }, []);

  return <div ref={gameRef}></div>
};

export default PhaserGame;
