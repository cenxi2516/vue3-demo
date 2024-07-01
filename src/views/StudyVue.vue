<template>
  <div class="main text-red-600">{{ curNum.toFixed(2) }}</div>
  <div>
    <img-view :imgList="['https://picsum.photos/200/200']" />
  </div>
  <div class="h-500px">
    <PDFView url="https://view.officeapps.live.com/op/view.aspx?src=https://test.img.betterwood.com/sys/pms-images/pms-team-info/TestCaseTemplate-kcjVHbxh6U1MGchfwPUTnq.docx" class="h-500px" @load="(loaded) => console.log(loaded)" />
  </div>
</template>

<script setup lang="ts">
import { pinyin } from 'pinyin-pro'
import ImgView from '@/components/ImgView/index.vue'
import PDFView from '@/components/IframeView/index.vue'
import { useNumberAnimation } from '@/hooks'


const curNum = useNumberAnimation(291.668)

console.log(pinyin('李顺祥'))
</script>

<style lang="scss" scoped></style>
