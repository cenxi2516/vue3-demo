import { calcTextByte } from '@/utils'
import { computed, nextTick, ref, type CSSProperties, type Ref } from 'vue'
import { DEFAULT_MIN_BYTE, PER_BYTE_PX } from '../consts'

export const useTitleEllipsis = (
  limitByte: number,
  text: string
): [
  Ref<boolean>,
  Ref<CSSProperties>,
  Ref<HTMLDivElement | undefined>,
  (visible: boolean) => void
] => {
  const isEllipsis = calcTextByte(text) > limitByte
  const tooltipVisible = ref(false)
  const titleRef = ref<HTMLDivElement>()
  const fontSizeHalf = ref<number>(PER_BYTE_PX)

  const cssStyle = computed(() => ({
    maxWidth: limitByte * fontSizeHalf.value + 'px',
    minWidth: DEFAULT_MIN_BYTE * fontSizeHalf.value + 'px'
  }))

  const handleTooltipVisibleChange = (visible: boolean) => {
    console.log(isEllipsis, tooltipVisible.value, visible)

    if (!isEllipsis) {
      tooltipVisible.value = false
    }
  }

  nextTick(() => {
    if (titleRef.value) {
      fontSizeHalf.value = parseInt(getComputedStyle(titleRef.value).fontSize) / 2
    }
  })

  return [tooltipVisible, cssStyle, titleRef, handleTooltipVisibleChange]
}
