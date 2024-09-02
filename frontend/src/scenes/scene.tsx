import ContinueGameScene from './continueGameScene'
import GameHud from './gameHud'
import GameScene from './gameScene'
import MenuScene from './menuScene'
import NewGameScene from './newGameScene'
import OptionsScene from './optionsScene'
import SaveGameScene from './saveGameScene'
import KeyboardConfigScene from './keyboardConfigScene'

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
    ContinueGameScene,
    KeyboardConfigScene
  ]
  return scene
}

export default Scene
