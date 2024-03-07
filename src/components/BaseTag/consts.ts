import { PresetThemeEnum, TThemeFieldEnum } from './types'
import { setTagTheme } from './utils'

export const OTHER_COMPANY_SIGN = '他店'
export const DEFAULT_SECOND_COLOR = '#ccc'
export const PresetTheme = {
  [PresetThemeEnum.GUEST]: setTagTheme('#ffc8b5', '#ffefe7'),
  [PresetThemeEnum.CATER]: setTagTheme('#ffecb8', '#fefbe7'),
  [PresetThemeEnum.OTHER]: setTagTheme('#bde3fb', '#ecf6fc')
}

export const ReadonlyStyleKey = {
  borderColor: TThemeFieldEnum.MAIN_COLOR,
  backgroundColor: TThemeFieldEnum.SECOND_COLOR
}

export const SelectedAndDeletedStyleKey = {
  borderColor: TThemeFieldEnum.MAIN_COLOR,
  backgroundColor: TThemeFieldEnum.MAIN_COLOR
}
