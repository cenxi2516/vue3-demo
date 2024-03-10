import { queryCommonTagList, type IRESTagItem } from '@/api/tag'
import { useExecuteRequest } from '@/hooks'
import { omit } from 'lodash-es'
import { ref, watch, type Ref } from 'vue'
import { DEFAULT_COMMON_TAG_DATA, DEFAULT_COMMON_TAG_SIZE, LabelTypeThemeMap } from '../consts'
import type { TAddTagModalProps } from '../index.vue'
import {
  LabelTypeEnum,
  type TCommonTagData,
  type TReadonlyRef,
  type TTagOptionItem
} from '../types'

export const useQueryCommonTagLib = (
  props: TAddTagModalProps,
  size: number = DEFAULT_COMMON_TAG_SIZE
): [TReadonlyRef<boolean>, Ref<TCommonTagData>] => {
  const [loading, _fetchTask] = useExecuteRequest(() => queryCommonTagList({ size }))

  const tagLibData = ref<TCommonTagData>(DEFAULT_COMMON_TAG_DATA)

  const _tagLibGroupByLabelType = (tagLibList: IRESTagItem[]) => {
    tagLibList.forEach((item) => {
      const newItem = {
        ...omit(item, ['isLocal', 'labelName', 'labelType']),
        ...{
          title: item.labelName,
          theme: LabelTypeThemeMap[item.labelType],
          canDeleted: false,
          canSelected: true,
          delConfirm: false,
          selected: false,
          isOtherCompany: item.isLocal
        }
      } as TTagOptionItem

      switch (item.labelType) {
        case LabelTypeEnum.ROOM_PREFERENCE:
          tagLibData.value.guestTagList.push(newItem)
          break
        case LabelTypeEnum.DIET_PREFERENCE:
          tagLibData.value.caterTagList.push(newItem)
          break
        case LabelTypeEnum.OTHER_PREFERENCE:
          tagLibData.value.otherTagList.push(newItem)
          break
      }
    })
  }

  const _getCommonTagLibData = async () => {
    tagLibData.value = DEFAULT_COMMON_TAG_DATA
    _tagLibGroupByLabelType(await _fetchTask().catch((err) => []))
  }

  watch(
    () => props.visible,
    (val) => val && _getCommonTagLibData(),
    { immediate: true }
  )

  return [loading, tagLibData]
}
