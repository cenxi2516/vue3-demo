import { readonly, ref } from 'vue'
import type { TReadonlyRef } from '../types'

export const useArrowMenu = (): [TReadonlyRef<boolean>, () => void, () => void] => {
  const arrowMenuVisible = ref(true) // control open down menu

  const _openArrowMenu = () => {
    setTimeout(() => {
      arrowMenuVisible.value = true
    }, 1e2)
  }

  const _closeArrowMenu = () => {
    arrowMenuVisible.value = false
  }

  return [readonly(arrowMenuVisible), _openArrowMenu, _closeArrowMenu]
}
