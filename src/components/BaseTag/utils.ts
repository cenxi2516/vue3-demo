import { DEFAULT_SECOND_COLOR } from './consts'
import { PresetThemeEnum, type TTheme } from './types'

export const setTagTheme = (mainColor: string, secondColor: string = DEFAULT_SECOND_COLOR) => ({
  mainColor,
  secondColor
})

export const isPresetTheme = (theme: TTheme) =>
  Object.keys(PresetThemeEnum).includes(theme as PresetThemeEnum)
