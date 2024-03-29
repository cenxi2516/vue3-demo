import { readonly, ref, type Ref } from 'vue'

export const useTagPopConfirm = (): [Readonly<Ref<boolean>>, (isShowPop: boolean) => void] => {
  const visible = ref(false)

  const switchPopConfirm = (isVisible: boolean) => {
    visible.value = isVisible
  }

  return [readonly(visible), switchPopConfirm]
}
