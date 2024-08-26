import { InputKey } from '../input/InputEnum';

export default interface InputManager {
  handleInput(key: InputKey, status: boolean): void
}

export function implementsInputManager(object: object): object is InputManager {
  return 'handleInput' in object && typeof object['handleInput'] === 'function' && object['handleInput'].length === 2;
}