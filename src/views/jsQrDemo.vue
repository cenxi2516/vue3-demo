<template>
    <div>
      <a-button @click="startVideo">
        {{ enabled ? '暂停' : '开始' }}
      </a-button>
    </div>

    <div>
      <div
        v-for="camera of cameras"
        :key="camera.deviceId"
        class="px-2 py-1 cursor-pointer"
        :class="{ 'text-primary': currentCamera === camera.deviceId }"
        @click="currentCamera = camera.deviceId"
      >
        {{ camera.label }}
      </div>
    </div>
    <div>
      <video ref="video" muted autoplay class="h-100 w-auto" />
    </div>
  <div v-if="scanResult">识别结果：{{ scanResult }}</div>
</template>

<script lang="ts" setup>
import { useDevicesList, useUserMedia } from '@vueuse/core'
import { onBeforeUnmount, reactive, ref, shallowRef, useTemplateRef, watchEffect } from 'vue'
import jsQR from 'jsqr'

const currentCamera = shallowRef<string>()
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if(!cameras.value.find(i => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId
  }
})

const video = useTemplateRef<HTMLVideoElement>('video')
const {
  stream,
  enabled
} = useUserMedia({
  constraints: reactive({ video: { deviceId: currentCamera } })
})

const animationMark = ref(0)
const scanResult = ref()
const scanQR = () => {
  if(!enabled.value) return

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if(!context || !video.value) return

  context.drawImage(video.value, 0, 0, canvas.width, canvas.height)
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  const code = jsQR(imageData.data, imageData.width, imageData.height)
  if(code) {
    scanResult.value = code.data
    enabled.value = false
    cancelAnimationFrame(animationMark.value)
    console.log('识别到的二维码内容: ', code.data)
    return
  }
  scanResult.value = ''
  console.log('未识别到二维码内容')

  animationMark.value = requestAnimationFrame(scanQR)
}

const startVideo = () => {
  scanResult.value = ''
  enabled.value = !enabled.value
  if(enabled.value) {
    cancelAnimationFrame(animationMark.value)
  }
}

watchEffect(() => {
  if(video.value) {
    video.value.srcObject = stream.value!
    scanQR()
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationMark.value)
})
</script>

<style lang="scss" scoped>

</style>