import { computed, readonly, ref, watch, type CSSProperties, type Ref } from 'vue'
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

type TProps = {
  theme: TTheme
}

export const useTagTheme = (
  props: TProps,
  tagStatus: Ref<TagStatusEnum>
): [Readonly<CSSProperties>, Readonly<CSSProperties>] => {
  const _changeTheme = () =>
    _isPresetTheme(props.theme)
      ? PRESET_THEME[props.theme as PresetThemeEnum]
      : (props.theme as TTagTheme)

  const tagTheme = ref<TTagTheme>(_changeTheme())

  const tagStyle = computed<CSSProperties>(() => _setTagStyle(tagStatus.value, tagTheme.value))
  const subTitleStyle = computed(() => ({
    backgroundColor: tagTheme.value[TThemeFieldEnum.MAIN_COLOR]
  }))

  watch(
    () => props.theme,
    () => {
      tagTheme.value = _changeTheme()
    }
  )

  return [readonly(subTitleStyle), readonly(tagStyle)]
}
