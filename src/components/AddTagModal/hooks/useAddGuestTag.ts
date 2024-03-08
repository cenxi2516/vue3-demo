import type { IRES } from '@/hooks'
import { readonly, ref } from 'vue'
import type { TRBool } from '../types'

export const useAddGuestTag = (): [TRBool, () => Promise<IRES>] => {
  const disabledAdd = ref(true)
  const handleAddGuestTag = async () => {
    return Promise.resolve({
      code: 1,
      data: null,
      msg: ''
    })
  }

  return [readonly(disabledAdd), handleAddGuestTag]
}
