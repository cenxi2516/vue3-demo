import type { TTheme } from '@/components/BaseTag/types'
import { readonly, ref, watch, type Ref } from 'vue'
import { LabelTypeEnum, type TReadonlyRef } from '../types'
import { PresetThemeEnum } from './../../BaseTag/types'

export const useAddTagTheme = (): [
  TReadonlyRef<TTheme | undefined>,
  Ref<LabelTypeEnum | undefined>
] => {
  const theme = ref<TTheme | undefined>()
  const labelType = ref<LabelTypeEnum | undefined>()

  const _changeTheme = () => {
    switch (labelType.value) {
      case LabelTypeEnum.ROOM_PREFERENCE:
        theme.value = PresetThemeEnum.GUEST
        break
      case LabelTypeEnum.DIET_PREFERENCE:
        theme.value = PresetThemeEnum.CATER
        break
      case LabelTypeEnum.OTHER_PREFERENCE:
        theme.value = PresetThemeEnum.OTHER
        break
      default:
        theme.value = { mainColor: '#d9d9d9' }
    }
  }

  watch(labelType, () => _changeTheme(), { immediate: true })

  return [readonly(theme), labelType]
}
