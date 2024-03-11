import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode, type CSSProperties } from 'vue'
import { PresetThemeEnum } from '../BaseTag/types'
import { CreateTagTypeEnum, LabelTypeEnum, ThemeKeyEnum, type TCommonTagData } from './types'
import { getContainer } from './utils'

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
  },
  getContainer
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
export const DEFAULT_SEARCH_TAG_SIZE = 20

export const LabelTypeThemeMap = {
  [LabelTypeEnum.ROOM_PREFERENCE]: PresetThemeEnum.GUEST,
  [LabelTypeEnum.DIET_PREFERENCE]: PresetThemeEnum.CATER,
  [LabelTypeEnum.OTHER_PREFERENCE]: PresetThemeEnum.OTHER
}

export const DEFAULT_COMMON_TAG_DATA: TCommonTagData = {
  [ThemeKeyEnum.GUEST]: [],
  [ThemeKeyEnum.CATER]: [],
  [ThemeKeyEnum.OTHER]: []
}

export const ThemeKeyAndLabelTypeMap = {
  [PresetThemeEnum.GUEST]: ThemeKeyEnum.GUEST,
  [PresetThemeEnum.CATER]: ThemeKeyEnum.CATER,
  [PresetThemeEnum.OTHER]: ThemeKeyEnum.OTHER
}

export const ADD_TAG_TWO_CONFIRM_CONFIG = {
  title: `${'温馨提示'}`,
  icon: createVNode(ExclamationCircleOutlined),
  style: { ...DEFAULT_MODAL_PROPS.style } as CSSProperties,
  content: `${'你已添加了标签，是否添加后退出'}`,
  okText: `${'添加并退出'}`,
  cancelText: `${'不添加'}`
}

export const DEFAULT_SEARCH_SELECT_PROPRS = {
  style: {
    width: '100%'
  },
  dropdownStyle: {
    borderRadius: '3px',
    top: '35px'
  },
  placeholder: '请搜索/创建标签',
  showArrow: false,
  showSearch: true,
  defaultActiveFirstOption: false,
  filterOption: false,
  listHeight: 168,
  notFoundContent: null,
  getPopupContainer: (node: Node) => node
}

const LabelTypeAndTextMap = {
  [LabelTypeEnum.ROOM_PREFERENCE]: '房客喜好',
  [LabelTypeEnum.DIET_PREFERENCE]: '餐饮喜好',
  [LabelTypeEnum.OTHER_PREFERENCE]: '其他喜好'
}

export const LABEL_TYPE_OPTIONS = Object.entries(LabelTypeAndTextMap).map(([value, label]) => ({
  value,
  label
}))

export const BUBBLES_MARK_CLASS_NAME = 'search-tag-item'

export const ADD_TYPE_MODAL_DEFAULT_PROPS = {
  ...DEFAULT_MODAL_PROPS,
  ...{
    footer: null,
    mask: false,
    closable: false,
    centered: false,
    width: '365px',
    bodyStyle: {}
  }
}

export const CreateTagTypeAndValueMap = {
  [CreateTagTypeEnum.NOT_CREATED]: '创建标签',
  [CreateTagTypeEnum.NOT_SELECTED]: '添加标签',
  [CreateTagTypeEnum.SELECTED]: '已选标签'
}

export const MAX_SEARCH_TEXT_LENGTH = 50
