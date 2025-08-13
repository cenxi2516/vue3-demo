import { onUnmounted, ref } from 'vue'
import { useDocumentVisibleEvent } from '@/hooks/useDocumentVisibleEvent'
import { isUndefined } from 'lodash-es'
import type { TVoidFn } from '@/types'

export const useVisibleInterval = (callback: TVoidFn, delay = 1e3, visibleIsExecute = true) => {
  const _timer = ref<number>()

  const startInterval = () => {
    if (!isUndefined(_timer.value)) return

    _timer.value = window.setInterval(callback, delay)
  }

  const stopInterval = () => {
    window.clearInterval(_timer.value)
    _timer.value = undefined
  }

  const resetInterval = () => {
    stopInterval()
    startInterval()
  }

  useDocumentVisibleEvent(() => {
    startInterval()
    visibleIsExecute && callback()
  }, stopInterval)

  onUnmounted(stopInterval)

  return {
    startInterval,
    stopInterval,
    resetInterval
  }
}
