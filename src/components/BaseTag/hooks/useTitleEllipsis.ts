import { computed, onMounted, ref, type Ref } from 'vue'
import { DEFAULT_MIN_BYTE, PER_BYTE_PX } from '../consts'

export const useTitleEllipsis = (
  limitByte: number,
  text: string
): [Ref<boolean>, Ref<HTMLDivElement | undefined>, (visible: boolean) => void] => {
  const isEllipsis = ref(false)
  const tooltipVisible = ref(false)
  const titleRef = ref<HTMLDivElement>()
  const fontSizeHalf = ref<number>(PER_BYTE_PX)
  const maxWidth = computed(() => limitByte * fontSizeHalf.value)
  const minWidth = computed(() => DEFAULT_MIN_BYTE * fontSizeHalf.value)

  const handleTooltipVisibleChange = (visible: boolean) => {
    if (!isEllipsis.value) {
      tooltipVisible.value = false
    }
  }

  onMounted(() => {
    if (titleRef.value) {
      const titleStyle = getComputedStyle(titleRef.value)
      fontSizeHalf.value = parseInt(titleStyle.fontSize) / 2
      isEllipsis.value = maxWidth.value < parseFloat(titleStyle.width)

      titleRef.value.style.minWidth = minWidth.value + 'px'
      titleRef.value.style.maxWidth = maxWidth.value + 'px'
    }
  })

  return [tooltipVisible, titleRef, handleTooltipVisibleChange]
}
