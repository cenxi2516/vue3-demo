import type { MaybeRefOrGetter } from 'vue'

export type TBar = {
  width?: string
  height?: string
  backgroundColor?: string
  borderRadius?: string
}

export type TProps = {
  xOffset?: number
  yOffset?: number
  behavior?:  MaybeRefOrGetter<ScrollBehavior>
  xBar?: TBar
  yBar?: TBar
  xBarHidden?: boolean
  yBarHidden?: boolean
  xBarHover?: boolean
  yBarHover?: boolean
}

export type TYScrollData = {
  containerClientHeight: number,
  containerScrollHeight: number,
}