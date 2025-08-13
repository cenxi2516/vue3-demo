import { useEventListener } from '@vueuse/core'
import type { TPromiseVoidFn, TVoidFn } from '@/types'

export const useDocumentVisibleEvent = (
  visibleFn?: TVoidFn | TPromiseVoidFn,
  hiddenFn?: TVoidFn | TPromiseVoidFn
) =>
  useEventListener(document, 'visibilitychange', () => {
    // 可见
    if (document.visibilityState === 'visible') return visibleFn?.()

    // 隐藏
    if (document.visibilityState === 'hidden') return hiddenFn?.()
  })
