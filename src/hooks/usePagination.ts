import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'

type TPagination = ComputedRef<{
  total: number
  current: number
  pageSize: number
  showSizeChanger: boolean
  onChange: (page: number) => void
  onShowSizeChange: (current: number, size: number) => void
}>

export const usePagination = (
  onPageSizeChange: (
    pageCurrent: Ref<number>,
    pageSize: Ref<number>,
    pageCount: Ref<number>
  ) => void,
  defaultPageSize: number = 10
): [TPagination, () => void] => {
  const pageCurrent = ref(1)
  const pageSize = ref(defaultPageSize)
  const pageCount = ref(0)

  let isChangePageSize = false
  const onShowSizeChange = (current: number, size: number) => {
    pageSize.value = size
    pageCurrent.value = 1
    isChangePageSize = true
  }

  const dataFetch = () => {
    onPageSizeChange(pageCurrent, pageSize, pageCount)
  }

  const pagination: TPagination = computed(() => ({
    total: pageCount.value,
    current: pageCurrent.value,
    pageSize: pageSize.value,
    showSizeChanger: true,
    onChange: (page: number) => {
      if (!isChangePageSize) {
        pageCurrent.value = page
      } else {
        isChangePageSize = false
      }
    },
    onShowSizeChange
  }))

  watch([pageCurrent, pageSize], () => dataFetch(), {
    immediate: true
  })

  return [pagination, dataFetch]
}
