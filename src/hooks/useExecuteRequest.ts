import { to } from '@/utils'
import { readonly, ref, type Ref } from 'vue'
import { isRequestSuccess } from '../utils'

export interface IRES<T> {
  code: number
  data: T
  msg: string
}

export const useExecuteRequest = <T>(
  fetchAPI: () => Promise<IRES<T>>
): [Readonly<Ref<boolean>>, () => Promise<T>] => {
  const loading = ref(false)

  const _fetchTask = async (): Promise<T> => {
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
