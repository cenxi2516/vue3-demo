<template>
  <div class="main text-red-600">{{ curNum.toFixed(2) }}</div>
</template>

<script setup lang="ts">
import { useNumberAnimation } from '@/hooks'

const curNum = useNumberAnimation(291.668)
</script>

<style lang="scss" scoped></style>