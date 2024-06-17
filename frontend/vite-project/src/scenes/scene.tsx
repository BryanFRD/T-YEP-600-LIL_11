import MenuScene from './menuScene'
import GameScene from './gameScene'

export interface IScene {
    scene: any
}

const Scene = () => {
    const scene = [MenuScene, GameScene]
    return scene
}

export default Scene
