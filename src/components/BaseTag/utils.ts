import { DEFAULT_SECOND_COLOR } from './consts'
import { TThemeFieldEnum } from './types'

export const setTagTheme = (mainColor: string, secondColor: string = DEFAULT_SECOND_COLOR) => ({
  [TThemeFieldEnum.MAIN_COLOR]: mainColor,
  [TThemeFieldEnum.SECOND_COLOR]: secondColor
})
