import { PresetThemeEnum, TThemeFieldEnum } from './types'
import { setTagTheme } from './utils'

export const OTHER_COMPANY_SIGN = '他店'
export const DEFAULT_SECOND_COLOR = '#fafafa'
export const PRESET_THEME = {
  [PresetThemeEnum.GUEST]: setTagTheme('#ffc8b5', '#ffefe7'),
  [PresetThemeEnum.CATER]: setTagTheme('#ffecb8', '#fefbe7'),
  [PresetThemeEnum.OTHER]: setTagTheme('#bde3fb', '#ecf6fc')
}

export const READONLY_STYLE_KEY = {
  borderColor: TThemeFieldEnum.MAIN_COLOR,
  backgroundColor: TThemeFieldEnum.SECOND_COLOR
}

export const SELECTED_DELETED_STYLE_KEY = {
  borderColor: TThemeFieldEnum.MAIN_COLOR,
  backgroundColor: TThemeFieldEnum.MAIN_COLOR
}

export const TAG_CONFIRM_POP_DEFAULT_PROPS = {
  title: '你确定要删除该标签吗？',
  okText: '确定',
  cancelText: '取消'
}

export const TAG_TOOLTIP_DEFAULT_PROPS = {
  placement: 'topLeft',
  overlayClassName: 'base-tag-tooltip',
  getPopupContainer: (node: Node) => node
}

export const PER_BYTE_PX = 6
export const DEFAULT_MAX_BYTE = 10
export const DEFAULT_MIN_BYTE = 4
