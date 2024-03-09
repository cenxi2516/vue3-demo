<template>
  <div class="selected-tag-area">
    <h2 class="mb-12px">{{ '已选标签' }}</h2>
    <div
      class="min-h-50px p-14px flex flex-wrap content-start"
      style="row-gap: 8px"
      :style="DEFAULT_TAG_LIST_STYLE"
    >
      <base-tag
        v-for="item in props.data"
        v-bind="item"
        :key="item.labelId"
        @delete="handleSelectedTagDelete($event, item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TConfirmDeleteFn } from '@/components/BaseTag/types'
import type { TTagOptionItem } from '../types'
import { DEFAULT_TAG_LIST_STYLE } from './../consts'

const props = defineProps<{
  data: TTagOptionItem[]
}>()

const emit = defineEmits<{
  (e: 'delete', item: TTagOptionItem): void
}>()

const handleSelectedTagDelete = async (confirmDelete: TConfirmDeleteFn, item: TTagOptionItem) => {
  await emit('delete', item)
  confirmDelete()
}
</script>

<style lang="scss" scoped></style>
