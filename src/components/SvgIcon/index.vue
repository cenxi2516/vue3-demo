<template>
  <span class="svg-icon svg-external-icon" :style="styleExternalIcon"></span>
</template>

<script setup lang="ts">
import type { PMSIconsEnum } from '@/enums/icon'
import { computed } from 'vue'

type TProps = {
  type: PMSIconsEnum // 仅支持本地svg 类型
}

const props = defineProps<TProps>()

const styleExternalIcon = computed(() => {
  const svgURL = new URL(`@/assets/icons/`, import.meta.url)
  const maskValue = `url(${svgURL.pathname}/${props.type}.svg) no-repeat 50% 50%`

  // mask 遮罩，使用svg形状来做遮罩
  return {
    mask: maskValue,
    '-webkit-mask': maskValue
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.15em;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
