<template>
  <div class="tag-list-area mb-14px">
    <h3 v-if="props.title" class="font-normal">{{ props.title }}</h3>
    <div class="tag-list flex flex-wrap h-60px overflow-y-auto content-start" style="row-gap: 8px">
      <base-tag
        v-for="item in props.data"
        v-bind="item"
        :theme="props.theme"
        :key="item.labelId"
        v-model:selected="item.selected"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TTheme } from '@/components/BaseTag/types'
import type { TTagOptionItem } from '../types'

const props = defineProps<{
  title: string
  theme: TTheme
  data: TTagOptionItem[]
}>()

</script>

<style lang="scss" scoped>
</style>
