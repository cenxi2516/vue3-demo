import { to } from '@/utils'
import { readonly, ref, type Ref } from 'vue'
import { isRequestSuccess } from '../utils'

export type IRES = {
  code: number
  data: any
  msg: string
}

export const useAsyncConfirm = (
  fetchAPI: () => Promise<IRES>
): [Ref<boolean>, () => Promise<void>] => {
  const loading = ref(false)

  const _fetchTask = async () => {
    loading.value = true
    const [error, res] = await to(fetchAPI())
    loading.value = false

    if (error === null && isRequestSuccess(res?.code)) {
      // success
      return res?.data
    } else {
      // fail
      throw res?.msg
    }
  }

  return [readonly(loading), _fetchTask]
}
