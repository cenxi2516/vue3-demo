<template>
  <div class="selected-tag-area">
    <h2 class="mb-12px">{{ '已选标签' }}</h2>
    <div
      class="min-h-50px p-14px flex flex-wrap content-start"
      style="row-gap: 8px"
      :style="DEFAULT_TAG_LIST_STYLE"
    >
      <!-- <base-tag :title="`标题00${index}`" canDeleted v-for="index in 23" :key="index" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_TAG_LIST_STYLE } from './../consts'
</script>

<style lang="scss" scoped></style>
