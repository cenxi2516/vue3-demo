import type { CSSProperties } from 'vue'
import { DEFAULT_SECOND_COLOR, ReadonlyStyleKey, SelectedAndDeletedStyleKey } from './consts'
import { PresetThemeEnum, TagStatusEnum, type TTagTheme, type TTheme } from './types'

export const setTagTheme = (mainColor: string, secondColor: string = DEFAULT_SECOND_COLOR) => ({
  mainColor,
  secondColor
})
