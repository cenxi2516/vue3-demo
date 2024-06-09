<template>
  <div class="main text-red-600">{{ curNum.toFixed(2) }}</div>
</template>

<script setup lang="ts">
import { pinyin } from 'pinyin-pro'
import { useNumberAnimation } from '@/hooks'

const curNum = useNumberAnimation(291.668)

console.log(pinyin('李顺祥'))
</script>

<style lang="scss" scoped></style>