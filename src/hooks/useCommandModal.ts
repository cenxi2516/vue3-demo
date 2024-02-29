import {
	createVNode,
	getCurrentInstance,
	render,
	type AppContext,
	type Component,
	type ComponentPublicInstance,
	type VNode
} from 'vue'

export interface Options {
  visible?: boolean // 控制弹窗组件打开和关闭
  onClose?: () => void // 命令式关闭弹窗组件时，需要处理的业务逻辑
  appendTo?: HTMLElement | string // 将弹窗组件添加到哪里
  [key: string]: unknown
}

export interface CommandComponent {
  (options: Options): VNode
  close: () => void
}

// 获取要添加到哪的真实DOM元素，默认为body元素
const getAppendToElement = (props: Options): HTMLElement => {
  let appendTo: HTMLElement | null = document.body

  if (props.appendTo) {
    if (typeof props.appendTo === 'string') {
      appendTo = document.querySelector<HTMLElement>(props.appendTo)
    }
    if (props.appendTo instanceof HTMLElement) {
      appendTo = props.appendTo
    }
    if (!(appendTo instanceof HTMLElement)) {
      appendTo = document.body
    }
  }

  return appendTo
}

// 将组件生成真实DOM，并挂载到真实DOM元素上
const initInstance = <T extends Component>(
  Component: T,
  props: Options,
  container: HTMLElement,
  appContext: AppContext | null = null
) => {
  const vNode = createVNode(Component, props)
  vNode.appContext = appContext
  render(vNode, container)

  getAppendToElement(props).appendChild(container)
  return vNode
}

export const useCommandModal = <T extends Component>(Component: T): CommandComponent => {
  const appContext = getCurrentInstance()?.appContext
  if (appContext) {
    const currentProvides = (getCurrentInstance() as any)?.provides
    Reflect.set(appContext, 'provides', { ...appContext.provides, ...currentProvides })
  }

  const container = document.createElement('div')

  const close = () => {
    render(null, container)
    container.parentNode?.removeChild(container)
  }

  const CommandModal = (options: Options): VNode => {
    if (!Reflect.has(options, 'visible')) {
      options.visible = true
    }
    if (typeof options.onClose !== 'function') {
      options.onClose = close
    } else {
      const originOnClose = options.onClose
      options.onClose = () => {
        originOnClose()
        close()
      }
    }
    const vNode = initInstance<T>(Component, options, container, appContext)
    const vm = vNode.component?.proxy as ComponentPublicInstance<Options>
    for (const prop in options) {
      if (Reflect.has(options, prop) && !Reflect.has(vm.$props, prop)) {
        vm[prop as keyof ComponentPublicInstance] = options[prop]
      }
    }
    return vNode
  }

  CommandModal.close = close

  return CommandModal
}

export default useCommandModal
