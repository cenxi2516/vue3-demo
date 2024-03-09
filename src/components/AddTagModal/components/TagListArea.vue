<template>
  <div class="tag-list-area mb-14px">
    <h3 v-if="props.title" class="font-normal">{{ props.title }}</h3>
    <div class="tag-list flex flex-wrap h-60px overflow-y-auto content-start" style="row-gap: 8px">
      <!-- <base-tag
        :title="`标题0${index}`"
        canSelected
        :theme="props.theme"
        v-for="index in 20"
        :key="index"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TTheme } from '@/components/BaseTag/types'

const props = defineProps<{
  title: string
  theme: TTheme
}>()
</script>

<style lang="scss" scoped>
</style>
