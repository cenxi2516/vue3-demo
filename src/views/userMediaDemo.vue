<template>
  <div class="flex flex-col gap-4 text-center">
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
      <a-button @click="captureImg">截取图片</a-button>
    </div>
    <div>
      <video ref="video" muted autoplay class="h-100 w-auto" />
    </div>
  <div v-if="captureResult">
    <p>截图Base64结果：{{ captureResult }}</p>
    <p>截图图片：<img :src="captureResult" alt=""></p>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useDevicesList, useUserMedia } from '@vueuse/core'
import { reactive, ref, shallowRef, useTemplateRef, watchEffect } from 'vue'

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

const startVideo = () => {
  captureResult.value = ''
  enabled.value = !enabled.value
}

const captureResult = ref()
const captureImg = () => {
  if(!enabled.value) return

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if(!context || !video.value) return

  context.drawImage(video.value, 0, 0, canvas.width, canvas.height)
  // 将图像质量设置为 0.95（取值范围 0 - 1，越接近 1 质量越高）
  const base64String = canvas.toDataURL('image/jpeg', 0.95)
  captureResult.value = base64String
  console.log('高质量 Base64 字符串:', base64String)

  if(base64String) {
    enabled.value = false
  }
}

watchEffect(() => {
  if(video.value) {
    video.value.srcObject = stream.value!
  }
})

</script>
<style lang="scss" scoped></style>