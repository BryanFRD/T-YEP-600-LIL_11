import MenuScene from './menuScene'
import GameScene from './gameScene'
import ContinueGameScene from './continueGameScene'
import NewGameScene from './newGameScene'
import OptionsScene from './optionsScene'

export interface IScene {
}

const Scene = () => {
    const scene = [MenuScene, GameScene, ContinueGameScene, NewGameScene, OptionsScene]
    return scene
}

export default Scene
