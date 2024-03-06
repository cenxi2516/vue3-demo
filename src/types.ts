import type {
  ColProps,
  DrawerProps,
  FormItemProps,
  FormProps,
  ModalProps,
  TableProps
} from 'ant-design-vue'
import type { Component as C1, VNode } from 'vue'

export interface KV<T = any> {
  [k: string | number]: T
}

export interface NFormItem extends FormItemProps {
  is: VNode | C1 | string
  name?: string
  modelName?: string
  props?: KV
  span?: ColProps['span']
  defaultValue?: any
  toggle?: boolean
}

interface UC {
  formProps?: FormProps
  // modelValue不暴露给defineC函数
  // modelValue: KV;
  items: (formData: KV) => NFormItem[]
}

/**
 * "新增"表单组件的属性
 */
export interface CProps extends UC {
  modalProps?: ModalProps
  before?: ((formData: KV) => Promise<void>) | (() => void)
  done: (formData: KV) => Promise<[boolean, string?]>
}

/**
 * "编辑"表单组件的属性
 */
export interface UProps extends UC {
  drawerProps?: DrawerProps
  before?: ((formData: KV) => Promise<KV>) | (() => void)
  done: (formData: KV, currentRow: KV) => Promise<[boolean, string?]>
}

export interface RProps extends TableProps {
  // 表格挂载前钩子函数
  before?: () => void
  drawerProps?: DrawerProps
  // 筛选条件配置
  conditionItems?: (shared?: KV) => NFormItem[]
  // 左侧筛选条件
  quickConditionItems?: (shared?: KV) => NFormItem[]
  tableProps?: TableProps
  // 表格数据加载，数据格式：{list: [], total: number}
  done: (params: KV) => Promise<{ list: KV[]; total: number }>
  // 显示多选，默认显示
  hideRowSelection?: boolean
  // 获取一条
  getOne?: (params: KV) => Promise<KV>
  // 导出excel
  exportExcel?: {
    done: (condition: KV) => Promise<KV[]>
    fileName?: string
    sheetName?: string
  }
  // 全屏，默认值隐藏
  showFullscreen?: boolean
  // 显示表格尺寸调整， 默认值隐藏
  showTableSizeSelect?: boolean
  // 显示表格刷新，默认值隐藏
  showRefresh?: boolean
  // 显示表格设置， 默认值隐藏
  showTableSet?: boolean
}

export interface DProps {
  /**
   * 点击删除后执行
   * @param keys 主键的数组,
   * @param row 删除当行时, 当前行信息
   */
  done: (keys: string[], row?: KV) => Promise<[boolean, string]>
}
