import type { TReadonlyRef } from '@/components/AddTagModal/types'
import { useEventListener } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { readonly, ref } from 'vue'

/**
 * 1、Non input method not triggered compositionstart、compostionupdate、compositionend event
 * 2、Non CJK input method only triggered input event
 * 3、input method  triggered sort：compositionstart、compostionupdate、input、compositionend
 */
export const useInputListener = (
  inputElement: HTMLInputElement,
  handler: (inputValue: string, e?: KeyboardEvent) => void,
  maxInputLength?: number
) => {
  const isComposing = ref(false)
  const newInputValue = ref('')
  const oldInputValue = ref('')
  const [isOverMaxInputLength, overInputTip] = _useOverMaxInputLengthTip(
    inputElement,
    maxInputLength
  )

  const _executeHandlerTask = async (e: KeyboardEvent) => {
    const inputValue = _getInputValue(e)
    newInputValue.value = inputValue

    if (newInputValue.value !== oldInputValue.value) {
      await handler(inputValue, e)
      oldInputValue.value = inputValue
    }
  }

  useEventListener(inputElement, 'compositionstart', (e: KeyboardEvent) => {
    isComposing.value = true
  })

  useEventListener(inputElement, 'compositionupdate', (e: KeyboardEvent) => {
    isComposing.value = true
  })

  useEventListener(inputElement, 'input', async (e: KeyboardEvent) => {
    overInputTip()

    if (!isComposing.value && !isOverMaxInputLength.value) {
      _executeHandlerTask(e)
    }
  })

  useEventListener(inputElement, 'compositionend', async (e: KeyboardEvent) => {
    isComposing.value = false
    await overInputTip()

    !isOverMaxInputLength.value && _executeHandlerTask(e)
  })
}

const _getInputValue = (e: KeyboardEvent): string => {
  const inputelement = e.target
  if (inputelement instanceof HTMLInputElement) {
    return inputelement.value
  }

  return ''
}

const _useOverMaxInputLengthTip = (
  inputElement: HTMLInputElement,
  maxInputLength?: number
): [TReadonlyRef<boolean>, () => void] => {
  const isAlreadyTip = ref(false)
  const isOverMaxInputLength = ref(false)

  if (maxInputLength && typeof maxInputLength === 'number') {
    inputElement.maxLength = maxInputLength
  }

  const __overInputTip = () => {
    const inputValue = inputElement.value
    if (
      !isAlreadyTip.value &&
      maxInputLength &&
      inputValue &&
      inputValue.length >= maxInputLength
    ) {
      isAlreadyTip.value = true
      isOverMaxInputLength.value = true
      message.error(`最大不超过 ${maxInputLength} 个字符`)
    } else {
      isOverMaxInputLength.value = false
    }
  }

  return [readonly(isOverMaxInputLength), __overInputTip]
}
