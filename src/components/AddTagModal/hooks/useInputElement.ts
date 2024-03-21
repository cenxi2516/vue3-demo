import { POP_MOUNT_CONTAINER_ID } from '@/consts'
import { useInputListener } from '@/hooks'
import { nextTick, onMounted, ref, type Ref } from 'vue'
import { DEFAULT_SEARCH_SELECT_PROPS, MAX_SEARCH_TEXT_LENGTH } from '../consts'

export const useInputElement = (
  handler: (searchVal: string, e: InputEvent | CompositionEvent) => void
): [Ref<HTMLInputElement | undefined>, (newValue: string) => void] => {
  const inputElementRef = ref<HTMLInputElement>()

  const _setInputElementValue = (newValue: string) => {
    nextTick(() => {
      if (inputElementRef.value instanceof HTMLInputElement) {
        inputElementRef.value.value = newValue
      }
    })
  }

  onMounted(() => {
    const inputElement = document.querySelector(
      `#${POP_MOUNT_CONTAINER_ID} .search-tag-area-wrapper .search-tag-area input[type=search]`
    )

    if (inputElement instanceof HTMLInputElement) {
      inputElementRef.value = inputElement
      inputElement.placeholder = DEFAULT_SEARCH_SELECT_PROPS.placeholder
      useInputListener(inputElement, handler, MAX_SEARCH_TEXT_LENGTH)
    }
  })

  return [inputElementRef, _setInputElementValue]
}
