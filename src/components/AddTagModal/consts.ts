import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode, type CSSProperties } from 'vue'
import { PresetThemeEnum } from '../BaseTag/types'
import { LabelTypeEnum, ThemeKeyEnum, type TCommonTagData } from './types'

export const DEFAULT_MODAL_PROPS = {
  centered: true,
  width: '1000px',
  maskClosable: false,
  destroyOnClose: true,
  style: {
    borderRadius: '5px',
    overflow: 'hidden',
    userSelect: 'none'
  },
  bodyStyle: {
    height: '500px',
    overflowY: 'auto',
    boxSizing: 'content-box'
  }
}

export const DEFAULT_BUTTON_PROPS = {
  style: {
    borderRadius: '5px'
  }
}

export const DEFAULT_TAG_LIST_STYLE = {
  border: '1px solid #e0e0e0',
  borderRadius: '2px'
}

export const DEFAULT_COMMON_TAG_SIZE = 20

export const LabelTypeThemeMap = {
  [LabelTypeEnum.ROOM_PREFERENCE]: PresetThemeEnum.GUEST,
  [LabelTypeEnum.DIET_PREFERENCE]: PresetThemeEnum.CATER,
  [LabelTypeEnum.OTHER_PREFERENCE]: PresetThemeEnum.OTHER
}

export const DEFAULT_COMMON_TAG_DATA: TCommonTagData = {
  guestTagList: [],
  caterTagList: [],
  otherTagList: []
}

export const ThemeKeyAndLabelTypeMap = {
  [PresetThemeEnum.GUEST]: ThemeKeyEnum.GUEST,
  [PresetThemeEnum.CATER]: ThemeKeyEnum.CATER,
  [PresetThemeEnum.OTHER]: ThemeKeyEnum.OTHER
}

export const ModalConfirmConfig = {
  title: `${'温馨提示'}`,
  icon: createVNode(ExclamationCircleOutlined),
  style: { ...DEFAULT_MODAL_PROPS.style } as CSSProperties,
  content: `${'你已添加了标签，是否添加后退出'}`,
  okText: `${'添加并退出'}`,
  cancelText: `${'不添加'}`
}
