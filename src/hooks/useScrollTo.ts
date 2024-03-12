import type { Ref } from 'vue'

export const useScrollTo = (el: Ref<HTMLElement | undefined>): [() => void, () => void] => {
  const scrollToTop = () => {
    if (el.value instanceof HTMLElement) {
      el.value.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  const scrollToBottom = () => {
    if (el.value instanceof HTMLElement) {
      el.value.scrollTo({
        top: el.value.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  return [scrollToBottom, scrollToTop]
}
