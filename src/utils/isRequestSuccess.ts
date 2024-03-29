import { RESPONSE_CODE } from '@/consts'

export const isRequestSuccess = (code: number) => RESPONSE_CODE === code
