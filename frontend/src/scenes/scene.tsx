import GameScene from './gameScene'
import MenuScene from './menuScene'

export interface IScene {
  scene: unknown
}

const Scene = () => {
  const scene = [MenuScene, GameScene]
  return scene
}

export default Scene
