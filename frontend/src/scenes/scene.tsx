import ContinueGameScene from './continueGameScene'
import GameHud from './gameHud'
import GameScene from './gameScene'
import MenuScene from './menuScene'
import NewGameScene from './newGameScene'
import OptionsScene from './optionsScene'
import SaveGameScene from './saveGameScene'

export interface IScene {
  scene: unknown
}

const Scene = () => {
  const scene = [
    MenuScene,
    GameScene,
    GameHud,
    SaveGameScene,
    NewGameScene,
    OptionsScene,
    ContinueGameScene
  ]
  return scene
}

export default Scene
