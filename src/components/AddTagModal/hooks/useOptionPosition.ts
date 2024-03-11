import { readonly, ref } from 'vue'
import type { TReadonlyRef } from '../types'

const X_FILL_VALUE = -12
const Y_FILL_VALUE = 6

export const useOptionPosition = (): [
  TReadonlyRef<number>,
  TReadonlyRef<number>,
  (e: MouseEvent, markClassName: string) => void
] => {
  const topPos = ref(0)
  const leftPos = ref(0)

  const _updateModalPosition = (e: MouseEvent, markClassName: string) => {
    const targetDom = e.target
    if (targetDom instanceof HTMLElement && targetDom.classList.contains(markClassName)) {
      const { left, bottom } = targetDom.getBoundingClientRect()
      topPos.value = bottom + Y_FILL_VALUE
      leftPos.value = left + X_FILL_VALUE
    }
  }

  return [readonly(topPos), readonly(leftPos), _updateModalPosition]
}
