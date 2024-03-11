import { queryCommonTagList } from '@/api/tag'
import { useExecuteRequest, useInputListener } from '@/hooks'
import { to } from '@/utils'
import { debounce } from 'lodash-es'
import { onMounted, ref, watch, type Ref } from 'vue'
import type { TProps } from '../components/SearchTagArea.vue'
import { DEFAULT_SEARCH_TAG_SIZE, MAX_SEARCH_TEXT_LENGTH } from '../consts'
import type { ISearchTagOption } from '../types'

type TFn = (val: string) => void

export const useSearchTag = (
  props: TProps,
  size: number = DEFAULT_SEARCH_TAG_SIZE
): [Ref<string>, Readonly<Ref<ISearchTagOption[]>>, Ref<boolean>] => {
  const searchValue = ref('')
  const searchTagOptionData = ref<ISearchTagOption[]>([])
  const openArrowMenu = ref(true) // control open down menu

  const [_loadingSearch, _fetchTagLibTask] = useExecuteRequest(() =>
    queryCommonTagList({ size, labelName: searchValue.value })
  )

  const _checkTagSelected = (labelId?: number) =>
    props.selectedData.some((tagOption) => tagOption.labelId === labelId)

  const _addSearchValueToTagOptions = (isExistSearchValueTagName: boolean) => {
    if (isExistSearchValueTagName) return

    searchTagOptionData.value.push({
      labelId: undefined,
      labelType: undefined,
      labelName: searchValue.value,
      selected: false,
      created: false
    })
  }

  const _getSearchTagData = async () => {
    searchTagOptionData.value = []
    let isExistSearchValueTagName = false

    const [error, data] = await to(_fetchTagLibTask())
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
    openArrowMenu.value = true
  }

  const _fetchTagLibTaskDebounce = debounce(_getSearchTagData, 5e2)
  const _handleSearch = (searchVal: string, e: InputEvent | CompositionEvent) => {
    searchValue.value = searchVal.trim()

    if (searchValue.value.length === 0) {
      searchTagOptionData.value = []
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

  onMounted(() => {
    const inputElement = document.querySelector(
      '.search-tag-area-wrapper .search-tag-area input[type=search]'
    )

    if (inputElement instanceof HTMLInputElement) {
      useInputListener(inputElement, _handleSearch, MAX_SEARCH_TEXT_LENGTH)
    }
  })

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

  return [searchValue, searchTagOptionData, openArrowMenu]
}
