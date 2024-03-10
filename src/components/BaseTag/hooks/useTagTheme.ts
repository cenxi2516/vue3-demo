import { computed, readonly, type CSSProperties, type Ref } from 'vue'
import { PRESET_THEME, READONLY_STYLE_KEY, SELECTED_DELETED_STYLE_KEY } from '../consts'
import {
  PresetThemeEnum,
  TThemeFieldEnum,
  TagStatusEnum,
  type TTagTheme,
  type TTheme
} from '../types'

const _isPresetTheme = (theme: TTheme) =>
  Object.values(PresetThemeEnum).includes(theme as PresetThemeEnum)

const _setTagStyle = (tagStatus: TagStatusEnum, tagName: TTagTheme): CSSProperties => {
  switch (tagStatus) {
    case TagStatusEnum.READONLY:
      return {
        backgroundColor: tagName[READONLY_STYLE_KEY.backgroundColor],
        borderColor: tagName[READONLY_STYLE_KEY.borderColor]
      }
    case TagStatusEnum.SELECTED:
    case TagStatusEnum.DELETED:
      return {
        backgroundColor: tagName[SELECTED_DELETED_STYLE_KEY.backgroundColor],
        borderColor: tagName[SELECTED_DELETED_STYLE_KEY.borderColor]
      }
  }
}

export const useTagTheme = (
  theme: TTheme,
  tagStatus: Ref<TagStatusEnum>
): [CSSProperties, Readonly<CSSProperties>] => {
  const tagTheme = _isPresetTheme(theme)
    ? PRESET_THEME[theme as PresetThemeEnum]
    : (theme as TTagTheme)

  const tagStyle = computed<CSSProperties>(() => _setTagStyle(tagStatus.value, tagTheme))
  const subTitleStyle = { backgroundColor: tagTheme[TThemeFieldEnum.MAIN_COLOR] }

  return [subTitleStyle, readonly(tagStyle)]
}
