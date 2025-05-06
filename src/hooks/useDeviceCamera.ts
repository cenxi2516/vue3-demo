import { useDevicesList, useUserMedia, useWindowSize } from '@vueuse/core'
import { computed, reactive, readonly, ref } from 'vue'

enum videoDeviceType {
  BACK = 'back',
  FRONT = 'front',
}

export const useDeviceCamera = () => {
  // 获取摄像头列表
  const currentCamera = ref<string>()
  const cameraType = ref<videoDeviceType>(videoDeviceType.BACK)
  const _initCurrentCamera = () => {
    const videoDeviceNum = videoInputs.value.length
    if(videoDeviceNum === 0) {
      console.warn('当前设备无摄像头')
      return
    }

    if(videoDeviceNum === 1) {
      // PC端设备
      currentCamera.value = videoInputs.value[0]?.deviceId
      return
    }

    // 移动设备，包含back为后置摄像头、包含front为前置摄像头
    currentCamera.value = (videoInputs.value.find((i) => i.label.includes(cameraType.value)) || videoInputs.value[0])?.deviceId
  }
  const { videoInputs } = useDevicesList({
    requestPermissions: true,
    onUpdated: _initCurrentCamera,
    constraints: {
      audio: false,
      video: true
    }
  })

  // 获取相机视频流
  const {
    stream,
    enabled
  } = useUserMedia({
    constraints: reactive({ video: { deviceId: currentCamera } })
  })

  // 切换摄像头
  const isCanSwitchVideoType = computed(() => videoInputs.value.length >= 2 && enabled.value)
  const switchVideoTypeLoading = ref(false)
  const switchVideoType = () => {
    if(!isCanSwitchVideoType.value) return false

    switchVideoTypeLoading.value = true
    stopCamera()
    requestAnimationFrame(() => {
      if(cameraType.value === videoDeviceType.BACK) {
        cameraType.value = videoDeviceType.FRONT
      } else {
        cameraType.value = videoDeviceType.BACK
      }
      _initCurrentCamera()
      startCamera()
      switchVideoTypeLoading.value = false
    })

    return true
  }

  const startCamera = () => {
    enabled.value = true
  }

  const stopCamera = () => {
    enabled.value = false
  }

  const switchCamera = () => {
    enabled.value = !enabled.value
  }

  const checkOrientation = () => {
    const { width, height } = useWindowSize();

    return width.value > height.value
  }


  return {
    isEnabled: readonly(enabled),
    isCanSwitchVideoType,
    switchVideoTypeLoading: readonly(switchVideoTypeLoading),
    videoStream: stream,
    switchVideoType,
    startCamera,
    stopCamera,
    switchCamera,
    checkOrientation
  }
}