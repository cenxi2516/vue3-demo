import { POP_MOUNT_CONTAINER_ID } from '@/consts'
import { useScrollTo } from '@/hooks'
import { nextTick, onMounted, ref, watch, type Ref } from 'vue'
import { SCROLL_BUFFER_SIZE } from '../consts'
import type { TTagOptionItem } from '../types'

export const useScrollToTop = (selectedGuestTagData: Ref<TTagOptionItem[]>) => {
  const modalBodyRef = ref<HTMLDivElement>()
  const [scrollToBottom, scrollToTop] = useScrollTo(modalBodyRef)

  onMounted(() => {
    const modalElement = document.querySelector(
      `#${POP_MOUNT_CONTAINER_ID} .add-tag-modal .ant-modal-body`
    )
    if (modalElement instanceof HTMLDivElement) {
      modalBodyRef.value = modalElement
    }
  })

  watch(selectedGuestTagData, () => {
    nextTick(() => {
      if (modalBodyRef.value instanceof HTMLDivElement) {
        const { scrollHeight, clientHeight } = modalBodyRef.value
        scrollHeight - clientHeight > SCROLL_BUFFER_SIZE && scrollToBottom()
      }
    })
  })
}
