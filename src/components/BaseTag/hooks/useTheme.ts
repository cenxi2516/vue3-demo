import { computed, readonly, type CSSProperties, type Ref } from 'vue'
import { PresetTheme, ReadonlyStyleKey, SelectedAndDeletedStyleKey } from '../consts'
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
        backgroundColor: tagName[ReadonlyStyleKey.backgroundColor],
        borderColor: tagName[ReadonlyStyleKey.borderColor]
      }
    case TagStatusEnum.SELECTED:
    case TagStatusEnum.DELETED:
      return {
        backgroundColor: tagName[SelectedAndDeletedStyleKey.backgroundColor],
        borderColor: tagName[SelectedAndDeletedStyleKey.borderColor]
      }
  }
}

export const useTheme = (
  theme: TTheme,
  tagStatus: Ref<TagStatusEnum>
): [CSSProperties, Readonly<CSSProperties>] => {
  const tagTheme = _isPresetTheme(theme)
    ? PresetTheme[theme as PresetThemeEnum]
    : (theme as TTagTheme)

  const tagStyle = computed<CSSProperties>(() => _setTagStyle(tagStatus.value, tagTheme))
  const subTitleStyle = { backgroundColor: tagTheme[TThemeFieldEnum.MAIN_COLOR] }

  return [subTitleStyle, readonly(tagStyle)]
}
