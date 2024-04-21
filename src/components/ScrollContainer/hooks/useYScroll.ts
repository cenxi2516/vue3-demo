import {
  computed,
  type ComputedRef,
  type CSSProperties,
  onMounted,
  type Ref,
  ref,
  watch
} from 'vue'
import type { TProps, TYScrollData } from '@/components/ScrollContainer/types'
import {
  SCROLL_CONTENT_PADDING_BOTTOM,
  SCROLL_CONTENT_PADDING_RIGHT,
  Y_SCROLL_INITIAL_DATA
} from '@/components/ScrollContainer/consts'
import {
  handleNaNNum,
  translateFirstChildDom,
  unSelectTheText
} from '@/components/ScrollContainer/utils'
import { useEventListener, useScroll } from '@vueuse/core'

export const useYScroll = (props: TProps, scrollRef: Ref<HTMLDivElement | undefined>) => {
  const scrollData = useScroll(scrollRef, {
    behavior: props.behavior
  })
  const yScrollData = ref<TYScrollData>({
    ...Y_SCROLL_INITIAL_DATA
  })

  const initYScroll = () => scrollRef.value?.scrollTo(0, props.yOffset || 0)

  const initYScrollData = () => {
    if (scrollRef.value instanceof HTMLDivElement) {
      const containerClientHeight =
        handleNaNNum(scrollRef.value.clientHeight) - SCROLL_CONTENT_PADDING_BOTTOM
      const containerScrollHeight =
        handleNaNNum(scrollRef.value.scrollHeight) - SCROLL_CONTENT_PADDING_BOTTOM
      yScrollData.value = {
        containerClientHeight,
        containerScrollHeight
      }
    } else {
      yScrollData.value = {
        ...Y_SCROLL_INITIAL_DATA
      }
    }
  }

  const isYOverflow = computed(
    () => yScrollData.value.containerScrollHeight > yScrollData.value.containerClientHeight
  )
  const yBarHeight = computed(() => {
    const { containerClientHeight, containerScrollHeight } = yScrollData.value
    if (!isYOverflow.value) return 0

    return handleNaNNum(containerClientHeight ** 2 / containerScrollHeight)
  })
  const yContainerMaxScrollHeight = computed(
    () => yScrollData.value.containerScrollHeight - yScrollData.value.containerClientHeight
  )
  const yBarTranslateY = ref(0)
  const yBarMaxTranslateY = computed(
    () => yScrollData.value.containerClientHeight - yBarHeight.value
  )
  const yBarStyle: ComputedRef<CSSProperties> = computed(() => ({
    ...props.yBar,
    height: `${yBarHeight.value}px`,
    transform: `translateY(${yBarTranslateY.value}px)`
  }))
  const scrollContentStyle: ComputedRef<CSSProperties> = computed(() => ({
    paddingRight: `${SCROLL_CONTENT_PADDING_RIGHT}px`,
    paddingBottom: `${SCROLL_CONTENT_PADDING_BOTTOM}px`,
    width: isYOverflow.value ? `calc(100% - ${props.yBar?.width || 0})` : `100%`
  }))

  const scrollBarYMouseDown = (e: MouseEvent) => {
    const yBarStartYPos = e.clientY
    const yBarOffsetTop = yBarTranslateY.value
    const yBarAlreadyMoveYLen = scrollData.y.value
    const yBarMouseMoveHandler = (e: MouseEvent) => {
      unSelectTheText()
      const yBarMoveY = e.clientY - yBarStartYPos
      const yBarFinalPos = Math.min(yBarMaxTranslateY.value, Math.max(0, yBarOffsetTop + yBarMoveY))

      yBarTranslateY.value = yBarFinalPos
      const firstChildTranslateYLen = -handleNaNNum(
        (yBarFinalPos / yBarMaxTranslateY.value) * yContainerMaxScrollHeight.value -
          yBarAlreadyMoveYLen
      )

      scrollRef.value && translateFirstChildDom(scrollRef.value, 0, firstChildTranslateYLen)
    }

    document.addEventListener('mousemove', yBarMouseMoveHandler)
    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', yBarMouseMoveHandler)
        if (scrollRef.value instanceof HTMLDivElement) {
          scrollRef.value.scrollTo(
            0,
            (yBarTranslateY.value / yBarMaxTranslateY.value) * yContainerMaxScrollHeight.value
          )
          translateFirstChildDom(scrollRef.value, 0, 0)
        }
      },
      { once: true }
    )
  }

  const yBarRef = ref<HTMLDivElement>()

  const showBar = () => {
    if (yBarRef.value instanceof HTMLDivElement && props.yBarHover) {
      yBarRef.value.style.visibility = 'visible'
    }
  }

  const hiddenBar = () => {
    if (yBarRef.value instanceof HTMLDivElement && props.yBarHover) {
      yBarRef.value.style.visibility = 'hidden'
    }
  }

  onMounted(() => {
    hiddenBar()
    initYScroll()
    initYScrollData()
    useEventListener(yBarRef.value, 'mousedown', scrollBarYMouseDown)
  })

  watch(
    scrollData.y,
    () => {
      yBarTranslateY.value = handleNaNNum(
        (scrollData.y.value / yContainerMaxScrollHeight.value) * yBarMaxTranslateY.value
      )
    },
    {
      immediate: true
    }
  )

  return {
    yBarRef,
    yBarStyle,
    scrollContentStyle,
    initYScrollData,
    showBar,
    hiddenBar
  }
}
