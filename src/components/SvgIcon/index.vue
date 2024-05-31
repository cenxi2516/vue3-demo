<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${props.type}`" />
  </svg>
</template>

<script setup lang="ts">
import type { PMSIconsEnum } from '@/enums/icon'

type TProps = {
  type: PMSIconsEnum // 仅支持本地svg 类型
}

const props = defineProps<TProps>()
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
