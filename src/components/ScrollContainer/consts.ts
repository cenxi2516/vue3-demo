import type { TBar, TYScrollData } from '@/components/ScrollContainer/types'

const BAR_DEFAULT_STYLE: TBar = {
  backgroundColor: '#ccc',
  borderRadius: '5px'
}

export const X_BAR_DEFAULT_STYLE: TBar = {
  ...BAR_DEFAULT_STYLE,
  height: '5px'
}

export const Y_BAR_DEFAULT_STYLE: TBar = {
  ...BAR_DEFAULT_STYLE,
  width: '5px'
}

export const SCROLL_CONTENT_PADDING_BOTTOM = 20
export const SCROLL_CONTENT_PADDING_RIGHT = 20

export const Y_SCROLL_INITIAL_DATA: TYScrollData = {
  containerClientHeight: 0,
  containerScrollHeight: 0,
}
