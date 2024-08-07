import { ref } from 'vue'

enum messageTypeEnum {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  WARN = 'warn',
  LOADING = 'loading',
  OPEN = 'open',
  NONE = 'none',
}

type TInfoRecord = {
  type: messageTypeEnum
  text: string
  isShow: boolean
}

const INFO_RECORD_DEFAULT = {
  type: messageTypeEnum.NONE,
  text: '',
  isShow: false,
}

export const useMessage = () => {
  const infoRecord = ref<TInfoRecord>({
    ...INFO_RECORD_DEFAULT,
  })

  const messageSuccess = () => {}

  const messageError = () => {}

  const messageInfo = () => {}

  const messageWarning = () => {}

  const messageWarn = () => {}

  const messageOpen = () => {}

  const messageLoading = () => {}

  return {
    messageSuccess,
    messageError,
    messageInfo,
    messageWarning,
    messageWarn,
    messageOpen,
    messageLoading,
  }
}
