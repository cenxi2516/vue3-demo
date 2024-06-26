import type { IRESTagItem } from '@/api/tag'
import { ref, type Ref, watch } from 'vue'
import { ThemeKeyAndLabelTypeMap } from '../consts'
import { AddTagTypeEnum, type TCommonTagData } from '../types'
import { useScrollToTop } from './../hooks'
import type { TTagOptionItem } from './../types'
import { convertTagOptionItemData } from './useQueryCommonTagLib'

export const useAddGuestTag = (
  tagLibData: Ref<TCommonTagData>
): [
  Ref<TTagOptionItem[]>,
  (item: TTagOptionItem) => void,
  (addType: AddTagTypeEnum, item: IRESTagItem) => void
] => {
  const selectedGuestTagData = ref<TTagOptionItem[]>([])
  const manualAddTagData = ref<TTagOptionItem[]>([])

  const _becomeCanDeleteTag = (tagList: TTagOptionItem[]) =>
    tagList.map((tagOptionItem) => ({
      ...tagOptionItem,
      canDeleted: true,
      canSelected: false
    }))

  const _filterCommonLibSelectedTag = () => {
    const allTagLibData = [
      ...tagLibData.value.guestTagList,
      ...tagLibData.value.caterTagList,
      ...tagLibData.value.otherTagList
    ]

    return allTagLibData.filter((tagOptionItem) => tagOptionItem.selected)
  }

  const _getCommonLibTagItem = (item: TTagOptionItem) => {
    const tagClassList = tagLibData.value[ThemeKeyAndLabelTypeMap[item.theme]]

    return tagClassList.find((tagItem) => item.labelId === tagItem.labelId)
  }

  const _handleCommonLibTagDelete = (item: TTagOptionItem) => {
    const tagItem = _getCommonLibTagItem(item)

    tagItem && (tagItem.selected = false)
  }

  const _handleManualAddTagDelete = (item: TTagOptionItem) => {
    const index = manualAddTagData.value.findIndex((tagItem) => item.labelId === tagItem.labelId)

    index > -1 && manualAddTagData.value.splice(index, 1)
  }

  const _handleSelectedTagDelete = (item: TTagOptionItem) => {
    _handleCommonLibTagDelete(item)
    _handleManualAddTagDelete(item)
  }

  const _handleCommonLibTagAdd = (item: TTagOptionItem) => {
    const tagItem = _getCommonLibTagItem(item)

    tagItem && (tagItem.selected = true)

    return tagItem
  }

  const _manualAddTag = (addType: AddTagTypeEnum, item: IRESTagItem) => {
    const newItem = convertTagOptionItemData(item)

    switch (addType) {
      case AddTagTypeEnum.COMMON_LIB:
        !_handleCommonLibTagAdd(newItem) && manualAddTagData.value.push(newItem)
        break
      case AddTagTypeEnum.SEARCH_CREATE:
        manualAddTagData.value.push(newItem)
        break
    }
  }

  const _combineSelectedTag = () => {
    const commonLibSelectedTags = _filterCommonLibSelectedTag()

    selectedGuestTagData.value = _becomeCanDeleteTag([
      ...commonLibSelectedTags,
      ...manualAddTagData.value
    ])
  }

  watch([tagLibData, manualAddTagData], () => _combineSelectedTag(), {
    deep: true
  })

  useScrollToTop(selectedGuestTagData)

  return [selectedGuestTagData, _handleSelectedTagDelete, _manualAddTag]
}
