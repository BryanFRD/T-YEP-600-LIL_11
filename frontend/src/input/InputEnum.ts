export enum InputKey {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  LIGHT_ATTACK = 'light',
  HEAVY_ATTACK = 'heavy',
  GRAB_THROW = 'grabThrow',
  SPECIAL = 'special',
  SHIELD = 'shield',
  DASH = 'dash',
  INFORMATIONS = 'informations'
}

export const HOLDABLE_KEYS = [InputKey.UP, InputKey.DOWN, InputKey.LEFT, InputKey.RIGHT]