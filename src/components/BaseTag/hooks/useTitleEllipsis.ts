import { computed, onMounted, ref, type Ref } from 'vue'
import { DEFAULT_MIN_BYTE, PER_BYTE_PX } from '../consts'

export const useTitleEllipsis = (
  limitByte: number,
  text: string
): [Ref<boolean>, Ref<HTMLDivElement | undefined>, (visible: boolean) => Promise<void>] => {
  const isEllipsis = ref(false)
  const tooltipVisible = ref(false)
  const titleRef = ref<HTMLDivElement>()
  const fontSizeHalf = ref<number>(PER_BYTE_PX)
  const maxWidth = computed(() => limitByte * fontSizeHalf.value)
  const minWidth = computed(() => DEFAULT_MIN_BYTE * fontSizeHalf.value)

  const _checkVisibleTooltip = () => {
    const titleFirstElement = titleRef.value?.firstElementChild
    if (titleFirstElement) {
      const titleStyle = getComputedStyle(titleFirstElement)
      const { width: titleContentWidth } = titleFirstElement.getBoundingClientRect()
      fontSizeHalf.value = parseInt(titleStyle.fontSize) / 2

      isEllipsis.value = maxWidth.value < titleContentWidth
    } else {
      isEllipsis.value = true
    }
  }

  const _handleTooltipVisibleChange = async (visible: boolean) => {
    await _checkVisibleTooltip()
    if (!isEllipsis.value) {
      tooltipVisible.value = false
    }
  }

  onMounted(() => {
    if (titleRef.value) {
      titleRef.value.style.minWidth = minWidth.value + 'px'
      titleRef.value.style.maxWidth = maxWidth.value + 'px'
    }
  })

  return [tooltipVisible, titleRef, _handleTooltipVisibleChange]
}
