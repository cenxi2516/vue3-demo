<template>
  <div class="main">{{ curNum.toFixed(2) }}</div>
</template>

<script setup lang="ts">
import { useNumberAnimation } from '@/hooks'

const curNum = useNumberAnimation(291.668)
</script>

<style lang="scss" scoped></style>
