import { ref, watch, type Ref } from 'vue'
import { ThemeKeyAndLabelTypeMap } from '../consts'
import type { TCommonTagData, TTagOptionItem } from '../types'

export const useAddGuestTag = (
  tagLibData: Ref<TCommonTagData>
): [Ref<TTagOptionItem[]>, (item: TTagOptionItem) => Promise<void>] => {
  const selectedGuestTagData = ref<TTagOptionItem[]>([])

  const _filterSelectedTag = () => {
    const allTagLibData = [
      ...tagLibData.value.guestTagList,
      ...tagLibData.value.caterTagList,
      ...tagLibData.value.otherTagList
    ]

    selectedGuestTagData.value = allTagLibData
      .filter((tagOptionItem) => tagOptionItem.selected)
      .map((tagOptionItem) => ({
        ...tagOptionItem,
        canDeleted: true,
        canSelected: false
      }))
  }

  const _handleSelectedTagDelete = async (item: TTagOptionItem) => {
    const tagClassList = tagLibData.value[ThemeKeyAndLabelTypeMap[item.theme]]
    const tagItem = tagClassList.find((tagItem) => item.labelId === tagItem.labelId)

    if (tagItem) {
      tagItem.selected = false
    }
  }

  watch(tagLibData, () => _filterSelectedTag(), {
    deep: true
  })

  return [selectedGuestTagData, _handleSelectedTagDelete]
}
