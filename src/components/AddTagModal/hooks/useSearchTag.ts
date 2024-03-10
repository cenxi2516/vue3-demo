import { readonly, ref, type Ref } from 'vue'
import type { TReadonlyRef } from '../types'

type TFn = (val: string) => void

export const useSearchTag = (): [Ref<string>, TReadonlyRef<boolean>, TFn] => {
  const inputValue = ref('')
  const selectValue = ref('')
  const openArrowMenu = ref(true) // control open down menu

  const _handleChangeAndSearch = (val: string) => {
    console.log(val)
  }

  return [selectValue, readonly(openArrowMenu), _handleChangeAndSearch]
}
