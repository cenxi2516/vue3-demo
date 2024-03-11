import { queryCommonTagList } from '@/api/tag'
import { useExecuteRequest, useInputListener } from '@/hooks'
import { onMounted, readonly, ref, type Ref } from 'vue'
import { DEFAULT_SEARCH_TAG_SIZE, MAX_SEARCH_TEXT_LENGTH } from '../consts'
import type { TReadonlyRef } from '../types'

type TFn = (val: string) => void

export const useSearchTag = (
  size: number = DEFAULT_SEARCH_TAG_SIZE
): [Ref<string>, TReadonlyRef<boolean>] => {
  const inputValue = ref('')
  const selectValue = ref('')
  const openArrowMenu = ref(true) // control open down menu
  const [loadingSearch, _fetchTask] = useExecuteRequest(() =>
    queryCommonTagList({ size, labelName: selectValue.value })
  )

  const _handleSearch = (searchVal: string, e?: KeyboardEvent) => {
    console.log(searchVal)
  }

  const _handleChangeAndSearch = (val: string) => {
    console.log(val)
  }

  onMounted(() => {
    const inputElement = document.querySelector(
      '.search-tag-area-wrapper .search-tag-area input[type=search]'
    )

    if (inputElement instanceof HTMLInputElement) {
      useInputListener(inputElement, _handleSearch, MAX_SEARCH_TEXT_LENGTH)
    }
  })

  return [selectValue, readonly(openArrowMenu)]
}
