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

    <div>
      <a-button @click="captureImg">截取图片</a-button>
    </div>

    <div v-show="isEnabled">
      <video ref="video" width="300" height="200" muted autoplay />
    </div>
  <div v-if="captureResult">
    <p>截图Base64结果：
      <a-textarea :value="captureResult" :autosize="{ minRows: 5, maxRows: 5 }" />
    </p>
    <p>截图图片：<img :src="captureResult" alt=""></p>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, watchEffect } from 'vue'
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


const startVideo = () => {
  captureResult.value = ''
  switchCamera()
}

const captureResult = ref()
const captureImg = () => {
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

  // 将图像质量设置为 0.95（取值范围 0 - 1，越接近 1 质量越高）
  const base64String = canvas.toDataURL('image/jpeg', 0.95)
  captureResult.value = base64String
  console.log('高质量 Base64 字符串:', base64String)

  if(base64String.slice(5, -1)) {
    stopCamera()
  }
}

watchEffect(() => {
  if(!video.value) return

  video.value.srcObject = videoStream.value!
})

</script>
<style lang="scss" scoped></style>