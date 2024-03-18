import type { TReadonlyRef } from '@/components/AddTagModal/types'
import { useEventListener } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { readonly, ref } from 'vue'

/**
 * 1、Non input method not triggered compositionstart、compositionupdate、compositionend event
 * 2、Non CJK input method only triggered input event
 * 3、input method  triggered sort：compositionstart、compositionupdate、input、compositionend
 */
export const useInputListener = (
  inputElement: HTMLInputElement,
  handler: (inputValue: string, e: InputEvent | CompositionEvent) => Promise<void> | void,
  maxInputLength?: number
) => {
  const isComposing = ref(false)
  const [isOverMaxInputLength, overInputTip] = _useOverMaxInputLengthTip(
    inputElement,
    maxInputLength
  )

  const _executeHandlerTask = async (e: InputEvent | CompositionEvent) => {
    await handler(_getInputValue(e), e)
  }

  useEventListener(inputElement, 'compositionstart', () => {
    isComposing.value = true
  })

  useEventListener(inputElement, 'compositionupdate', () => {
    isComposing.value = true
  })

  useEventListener(inputElement, 'input', async (e: InputEvent) => {
    overInputTip()

    if (!isComposing.value && !isOverMaxInputLength.value) {
      await _executeHandlerTask(e)
    }
  })

  useEventListener(inputElement, 'compositionend', async (e: CompositionEvent) => {
    isComposing.value = false
    overInputTip()

    !isOverMaxInputLength.value && (await _executeHandlerTask(e))
  })
}

const _getInputValue = (e: InputEvent | CompositionEvent): string => {
  const inputElement = e.target
  if (inputElement instanceof HTMLInputElement) {
    return inputElement.value
  }

  return ''
}

const _useOverMaxInputLengthTip = (
  inputElement: HTMLInputElement,
  maxInputLength?: number
): [TReadonlyRef<boolean>, () => void] => {
  const isAlreadyTip = ref(false)
  const isOverMaxInputLength = ref(false)

  if (maxInputLength) {
    inputElement.maxLength = maxInputLength
  }

  const __overInputTip = async () => {
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
