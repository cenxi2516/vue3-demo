import { queryCommonTagList } from '@/api/tag'
import { useExecuteRequest } from '@/hooks'
import { to } from '@/utils'
import type { Select } from 'ant-design-vue'
import { debounce } from 'lodash-es'
import { ref, watch, type Ref } from 'vue'
import type { TProps } from '../components/SearchTagArea.vue'
import { DEFAULT_SEARCH_TAG_SIZE } from '../consts'
import { useArrowMenu, useInputElement } from '../hooks'
import type { ISearchTagOption, TReadonlyRef } from '../types'

type TFn = (val: string) => void

type TSearchReturnValue = {
  searchValue: Ref<string>
  searchTagOptionData: Readonly<Ref<ISearchTagOption[]>>
  arrowMenuVisible: TReadonlyRef<boolean>
  openArrowMenu: () => void
  closeArrowMenu: () => void
  selectRef: Ref<InstanceType<typeof Select> | null>
  inputElementRef: Ref<HTMLInputElement | undefined>
  setInputElementValue: (newValue: string) => void
}

export const useSearchTag = (
  props: TProps,
  size: number = DEFAULT_SEARCH_TAG_SIZE
): TSearchReturnValue => {
  const searchValue = ref('')
  const searchTagOptionData = ref<ISearchTagOption[]>([])
  const selectRef = ref<InstanceType<typeof Select> | null>(null)

  const [arrowMenuVisible, openArrowMenu, closeArrowMenu] = useArrowMenu()
  const [_loadingSearch, _fetchTagLibTask] = useExecuteRequest(() =>
    queryCommonTagList({ size, labelName: searchValue.value })
  )

  const _checkTagSelected = (labelId?: number) =>
    props.selectedData.some((tagOption) => tagOption.labelId === labelId)

  const _addSearchValueToTagOptions = (isExistSearchValueTagName: boolean) => {
    if (isExistSearchValueTagName || !searchValue.value) return

    searchTagOptionData.value.unshift({
      labelId: undefined,
      labelType: undefined,
      labelName: searchValue.value,
      selected: false,
      created: false
    })
  }

  const clearSearchTagOptionData = () => {
    searchTagOptionData.value = []
  }

  const _getSearchTagData = async () => {
    let isExistSearchValueTagName = false
    if (!searchValue.value.length) return

    const [error, data] = await to(_fetchTagLibTask())
    clearSearchTagOptionData()

    if (error === null && data) {
      data.forEach((tagOption) => {
        if (!isExistSearchValueTagName && tagOption.labelName === searchValue.value) {
          isExistSearchValueTagName = true
        }

        const newTagOption = {
          ...tagOption,
          selected: _checkTagSelected(tagOption.labelId),
          created: true
        } as ISearchTagOption

        searchTagOptionData.value.push(newTagOption)
      })
    }

    await _addSearchValueToTagOptions(isExistSearchValueTagName)
    openArrowMenu()
  }

  const _fetchTagLibTaskDebounce = debounce(_getSearchTagData, 2e2)
  const _handleSearch = (searchVal: string, e: InputEvent | CompositionEvent) => {
    searchValue.value = searchVal.trim()

    if (searchValue.value.length === 0) {
      closeArrowMenu()
      clearSearchTagOptionData()
      return
    }

    switch (e.type) {
      case 'input':
        // debounce
        _fetchTagLibTaskDebounce()
        break
      case 'compositionend':
        // not debounce
        _getSearchTagData()
        break
      default:
        // debounce
        _fetchTagLibTaskDebounce()
    }
  }
  const [inputElementRef, setInputElementValue] = useInputElement(_handleSearch)

  watch(props.selectedData, () => {
    if (!searchTagOptionData.value.length) return

    searchTagOptionData.value.forEach((option) => {
      if (_checkTagSelected(option.labelId)) {
        Object.assign(option, {
          selected: true,
          created: true
        })
      }
    })
  })

  return {
    searchValue,
    searchTagOptionData,
    arrowMenuVisible,
    openArrowMenu,
    closeArrowMenu,
    selectRef,
    inputElementRef,
    setInputElementValue
  }
}
