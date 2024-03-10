import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { DEFAULT_MIN_BYTE, PER_BYTE_PX } from '../consts'

type TProps = {
  title: string
  limitByte: number
}

export const useTitleEllipsis = (
  props: TProps
): [Ref<boolean>, Ref<HTMLDivElement | undefined>, (visible: boolean) => Promise<void>] => {
  const isEllipsis = ref(false)
  const isComputedEllipsis = ref(false) // avoid repeat computed ellipsis
  const tooltipVisible = ref(false)
  const titleRef = ref<HTMLDivElement>()
  const fontSizeHalf = ref<number>(PER_BYTE_PX)
  const maxWidth = computed(() => props.limitByte * fontSizeHalf.value)
  const minWidth = computed(() => DEFAULT_MIN_BYTE * fontSizeHalf.value)

  const _checkVisibleTooltip = () => {
    if (isComputedEllipsis.value) return

    isComputedEllipsis.value = true
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

  watch([() => props.title, () => props.limitByte], () => {
    isComputedEllipsis.value = false
  })

  return [tooltipVisible, titleRef, _handleTooltipVisibleChange]
}
