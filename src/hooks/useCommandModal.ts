import {
	createVNode,
	getCurrentInstance,
	readonly,
	ref,
	render,
	type AppContext,
	type Component,
	type ComponentPublicInstance,
	type Ref,
	type VNode
} from 'vue'

export interface Options {
  onClose?: () => void
  appendTo?: HTMLElement | string
  [key: string]: unknown
}

export interface CommandComponent {
  (options: Options): VNode
  close: () => void
}

const _getAppendToElement = (props: Options): HTMLElement => {
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

const _initInstance = <T extends Component>(
  Component: T,
  props: Options,
  container: HTMLElement,
  appContext: AppContext | null = null
) => {
  const vNode = createVNode(Component, props)
  vNode.appContext = appContext
  render(vNode, container)
  _getAppendToElement(props).appendChild(container)

  return vNode
}

export const useCommandModal = <T extends Component>(
  Component: T
): [Ref<boolean>, CommandComponent] => {
  const appContext = getCurrentInstance()?.appContext
  if (appContext) {
    const currentProvides = (getCurrentInstance() as any)?.provides
    Reflect.set(appContext, 'provides', { ...appContext.provides, ...currentProvides })
  }

  const container = document.createElement('div')
  const isVisible = ref(false)

  const _close = () => {
    isVisible.value = false
    render(null, container)
    container.parentNode?.removeChild(container)
  }

  const _commandModal = (options: Options): VNode => {
    isVisible.value = true
    if (!Reflect.has(options, 'visible')) {
      options.visible = true
    }

    if (typeof options.onClose !== 'function') {
      options.onClose = _close
    } else {
      const originOnClose = options.onClose
      options.onClose = () => {
        originOnClose()
        _close()
      }
    }

    const vNode = _initInstance<T>(Component, options, container, appContext)
    const vm = vNode.component?.proxy as ComponentPublicInstance<Options>

    for (const prop in options) {
      if (Reflect.has(options, prop) && !Reflect.has(vm.$props, prop)) {
        vm[prop as keyof ComponentPublicInstance] = options[prop]
      }
    }

    return vNode
  }

  _commandModal.close = _close

  return [readonly(isVisible), _commandModal]
}

export default useCommandModal
