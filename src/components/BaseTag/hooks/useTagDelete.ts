import { readonly, ref, type Ref } from 'vue'
import type { TConfirmDeleteFn } from '../types'

export const useTagDelete = (): [Readonly<Ref<boolean>>, TConfirmDeleteFn] => {
  const tagVisible = ref(true)

  const _confirmDelete = async () => {
    tagVisible.value = false
  }

  return [readonly(tagVisible), _confirmDelete]
}
