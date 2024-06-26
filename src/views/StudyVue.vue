<template>
  <div class="main text-red-600">{{ curNum.toFixed(2) }}</div>
  <div>
    <img-view :imgList="['https://picsum.photos/200/200']" />
  </div>
</template>

<script setup lang="ts">
import { pinyin } from 'pinyin-pro'
import ImgView from '@/components/ImgView/index.vue'
import { useNumberAnimation } from '@/hooks'

const curNum = useNumberAnimation(291.668)

console.log(pinyin('李顺祥'))
</script>

<style lang="scss" scoped></style>
