<template>
  <div class="scroll-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div ref="scrollRef" class="scroll-content" :style="scrollContentStyle">
      <div>
        <slot name="default" />
      </div>
    </div>
    <div ref="yBarRef" class="scroll-y-bar" :style="yBarStyle"></div>
    <div class="scroll-x-bar" :style="props.xBar"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { X_BAR_DEFAULT_STYLE, Y_BAR_DEFAULT_STYLE } from '@/components/ScrollContainer/consts'
import type { TProps } from '@/components/ScrollContainer/types'
import { useYScroll } from '@/components/ScrollContainer/hooks'

const props = withDefaults(defineProps<TProps>(), {
  xBar: () => ({
    ...X_BAR_DEFAULT_STYLE
  }),
  yBar: () => ({
    ...Y_BAR_DEFAULT_STYLE
  }),
  xOffset: 0,
  yOffset: 0,
  behavior: 'auto',
  xBarHidden: false,
  yBarHidden: false,
  xBarHover: true,
  yBarHover: true
})

const scrollRef = ref<HTMLDivElement>()

const { yBarRef, yBarStyle, scrollContentStyle, initYScrollData, showBar, hiddenBar } = useYScroll(
  props,
  scrollRef
)
const handleMouseEnter = () => {
  initYScrollData()
  showBar()
}

const handleMouseLeave = () => {
  hiddenBar()
}
</script>

<style lang="scss" scoped>
.scroll-container {
  position: relative;
  box-sizing: content-box;
  overflow: hidden;
}

.scroll-content {
  box-sizing: inherit;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.scroll-x-bar,
.scroll-y-bar {
  position: absolute;
}

.scroll-y-bar {
  top: 0;
  right: 0;
}

.scroll-x-bar {
  bottom: 0;
  left: 0;
}
</style>
