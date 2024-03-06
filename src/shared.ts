import NForm from '@/Crud/VForm.vue'
import type { CProps, DProps, KV, NFormItem, RProps, UProps } from '@/types'
import { to } from '@/utils'
import { message } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { ref, type Ref } from 'vue'

export function useForm(
  done: UProps['done'],
  currentRow: Ref<KV> | undefined,
  onSuccess: (formData: KV) => void,
  onFail: (error?: string) => void,
  onReset = () => {}
) {
  const nFormRef = ref<typeof NForm>()
  // 提交中
  const isSubmitting = ref(false)
  const isShow = ref(false)
  // 默认值
  const formData = ref<KV>({})
  // 保存新增
  async function save() {
    const formRef = nFormRef.value?.formRef
    if (!formRef) return
    isSubmitting.value = true
    // 验证表单
    {
      const [error] = await to(formRef.validateFields())
      if (null !== error) {
        isSubmitting.value = false
        console.log(error)
        return
      }
    }

    // 保存
    const [error, data] = await to(done(formData.value, currentRow ? currentRow.value : {}))
    if (null !== error) {
      isSubmitting.value = false
      throw error
    }
    if (!Array.isArray(data)) {
      isSubmitting.value = false
      throw '"请检查done"函数的返回值格式,预期[boolean,string]!'
    }

    const [isSuccess, msg] = data
    if (isSuccess) {
      msg && message.success(msg)
      reset()
      onSuccess(formData.value)
    } else {
      msg && message.error(msg)
      onFail(msg)
    }
    isShow.value = false
    isSubmitting.value = false
  }

  function reset() {
    onReset()
    nFormRef.value?.reset()
  }

  function setDefault(newFormData: KV) {
    formData.value = cloneDeep(newFormData)
  }

  return {
    nFormRef,
    isShow,
    isSubmitting,
    save,
    reset,
    formData,
    setDefault
  }
}

export function walkTree<Node extends { children?: Node[] }>(
  nodes: Node[],
  each: (node: Node) => void | Node
) {
  const stack: Node[] = []
  _filter(nodes, each, stack)
  while (stack.length > 0) {
    const node = stack.pop()!
    if (node.children?.length) {
      _filter(node.children, each, stack)
    }
  }

  function _filter(nodes: Node[], each: (node: Node) => void | Node, stack: Node[]) {
    let { length } = nodes
    for (let i = 0; i < length; i++) {
      const node = nodes[i]
      if (each(node) === void 0) {
        nodes.splice(i, 1)
        length--
        i--
      } else {
        stack.push(node)
      }
    }
  }
}

export function _warn(...message: any) {
  console.warn('[🔊crud-vue]: ', ...message)
}

export function defineC(config: CProps): CProps {
  return config
}

export function defineU(config: UProps): UProps {
  return config
}

export function defineR(config: RProps): RProps {
  return config
}

export function defineD(config: DProps): DProps {
  return config
}

export function defineF<T extends NFormItem>(formItems: T[]): () => T[] {
  return () => formItems
}
