import { useWindowSize } from '@vueuse/core'

export const create2DCanvas = (image: CanvasImageSource, iWidth: number, iHeight: number) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if(!context) return

  const {
    width,
    height
  } = useWindowSize()
  const isLandscape = width.value > height.value
  canvas.width = isLandscape ? iWidth : iHeight
  canvas.height = isLandscape ? iHeight : iWidth

  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  return {
    canvas,
    context
  }
}