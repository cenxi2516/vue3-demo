import { readonly, ref, type Ref } from 'vue'

type TFn = () => void

export const useVisible = (initialValue = false): [Readonly<Ref<boolean>>, TFn, TFn] => {
  const visible = ref(initialValue)

  const openView = () => {
    visible.value = true
  }

  const closeView = () => {
    visible.value = false
  }

  return [readonly(visible), openView, closeView]
}
