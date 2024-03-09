<template>
  <div class="common-tag-area mb-15px">
    <h2 class="mb-12px">{{ `标签库-常用标签` }}</h2>
    <div class="h-320px p-1em" :style="DEFAULT_TAG_LIST_STYLE">
      <TagListArea title="客房喜好" :theme="PresetThemeEnum.GUEST" />
      <TagListArea title="餐饮喜好" :theme="PresetThemeEnum.CATER" />
      <TagListArea title="其他喜好" :theme="PresetThemeEnum.OTHER" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PresetThemeEnum } from '@/components/BaseTag/types'
import { DEFAULT_TAG_LIST_STYLE } from './../consts'
import TagListArea from './TagListArea.vue'
</script>

<style lang="scss" scoped>
.common-tag-area {
  .common-tag-item:last-of-type {
    margin-bottom: 0;
  }
}
</style>
