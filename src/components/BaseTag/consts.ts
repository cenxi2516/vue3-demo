import { PresetThemeEnum } from './types'
import { setTagTheme } from './utils'

export const OTHER_COMPANY_SIGN = '他店'
export const DEFAULT_SECOND_COLOR = '#0ff'
export const PresetTheme = {
  [PresetThemeEnum.GUEST]: setTagTheme('#f00'),
  [PresetThemeEnum.CATER]: setTagTheme('#0f0'),
  [PresetThemeEnum.OTHER]: setTagTheme('#00f')
}
