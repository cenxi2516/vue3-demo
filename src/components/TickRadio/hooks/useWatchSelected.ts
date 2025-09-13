import type { TOFTickRadioProps } from '../types'
import { computed } from 'vue'

export const useWatchSelected = (props: TOFTickRadioProps) => {
  const wrapClass = computed(() => ({
    selected: props.selected,
    disabled: props.disabled
  }))

  return {
    wrapClass
  }
}
