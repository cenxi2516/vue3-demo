<template>
  <viewer :images="props.imgList" class="img-desc-box">
    <img
      v-for="(imgSrc, index) in props.imgList"
      :key="index"
      :src="imgSrc"
      :style="{ 'object-fit': props.objectFit, 'border-radius': props.borderRadius }"
      alt=""
    />
  </viewer>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'

type TImgViewProps = {
  imgList: string[]
  objectFit?: CSSProperties['object-fit']
  borderRadius?: CSSProperties['border-radius']
}

const props = withDefaults(defineProps<TImgViewProps>(), {
  objectFit: 'contain',
  borderRadius: 0
})
</script>

<style lang="scss" scoped>
.img-desc-box {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: baseline;

  img {
    width: 90%;
    height: 80%;
    margin: 5px 1%;
    cursor: zoom-in;
  }
}
</style>
