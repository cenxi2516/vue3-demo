<template>
   <div class="flex flex-col gap-4 text-center">
      <div>
        <a-button @click="startVideo">
          {{ isEnabled ? '暂停' : '开始' }}
        </a-button>
      </div>

      <div v-if="isCanSwitchVideoType">
        <a-button @click="switchVideoType">切换摄像头</a-button>
      </div>
      <div v-show="isEnabled">
        <video ref="video" muted autoplay width="300" height="200" />
      </div>
      <div v-if="scanResult">识别结果：{{ scanResult }}</div>
   </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, useTemplateRef, watchEffect } from 'vue'
import jsQR from 'jsqr'
import { useDeviceCamera } from '@/hooks'

const {
  videoStream,
  switchCamera,
  isEnabled,
  stopCamera,
  switchVideoType,
  isCanSwitchVideoType,
  checkOrientation
} = useDeviceCamera()

const video = useTemplateRef<HTMLVideoElement>('video')
const animationMark = ref(0)
const scanResult = ref()
const scanQR = () => {
  if(!isEnabled.value) return

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if(!context || !video.value) return

  const isLandscape = checkOrientation()
  const {
    width,
    height
  } = video.value
  canvas.width = isLandscape ? width : height
  canvas.height = isLandscape ? height : width

  context.drawImage(video.value, 0, 0, canvas.width, canvas.height)

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  const code = jsQR(imageData.data, imageData.width, imageData.height)
  if(code) {
    scanResult.value = code.data
    cancelAnimationFrame(animationMark.value)
    console.log('识别到的二维码内容: ', code.data)
    setTimeout(() => {
      stopCamera()
    }, 3e2)
    return
  }
  scanResult.value = ''
  console.log('未识别到二维码内容')

  animationMark.value = requestAnimationFrame(scanQR)
}

const startVideo = () => {
  scanResult.value = ''
  switchCamera()
  if(isEnabled.value) {
    cancelAnimationFrame(animationMark.value)
  }
}

watchEffect(() => {
  if(video.value) {
    video.value.srcObject = videoStream.value!
    scanQR()
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationMark.value)
})
</script>

<style lang="scss" scoped>

</style>