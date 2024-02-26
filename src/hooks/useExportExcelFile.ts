import type { KV } from '@/types'
import { to } from '@/utils'
import { readonly, ref, type Ref } from 'vue'
import { utils, writeFile } from 'xlsx'

type TColumnItem = {
  title: string
  dataIndex: string
  key?: string
  [K: string]: any
}
export type TColumnConfig = Ref<TColumnItem[]>

const _exportExcelFile = async (
  columnConfig: TColumnConfig,
  fetchData: () => Promise<KV[]>,
  fileName = 'data',
  sheetName = 'sheet'
) => {
  const keyAndTitleMap: KV = {}
  const headerKeys: string[] = []

  columnConfig.value?.forEach((column: any) => {
    const { title, dataIndex } = column
    keyAndTitleMap[dataIndex] = title
    headerKeys.push(dataIndex)
  })

  // 表格数据：数据获取、格式处理
  const dataSource = await fetchData()
  const sheetContentData = dataSource.map((row) => {
    const newRow: Record<string, any> = {}

    // 过滤多余数据
    for (const key in row) {
      if (Object.hasOwn(row, key) && keyAndTitleMap[key]) {
        newRow[key] = row[key]
      }
    }

    return newRow
  })
  // 添加表头
  sheetContentData.unshift(keyAndTitleMap)

  const sheet = utils.json_to_sheet(sheetContentData, { skipHeader: true, header: headerKeys })

  const book = utils.book_new()
  book.SheetNames.push(sheetName)
  book.Sheets[sheetName] = sheet

  writeFile(book, `${fileName}.xlsx`, { bookType: 'xlsx', type: 'binary' })
}

export const useExportExcelFile = (
  columnConfig: TColumnConfig,
  fetchData: () => Promise<KV[]>,
  options = {
    onSuccess: () => void 0,
    onError: (error: any) => void error
  }
): [Ref<boolean>, (fileName?: string, sheetName?: string) => Promise<void>] => {
  const _exportLoading = ref(false)
  const exportLoading = readonly(_exportLoading)

  const exportExcelFile = async (fileName = 'data', sheetName = 'sheet') => {
    _exportLoading.value = true
    const [error] = await to(_exportExcelFile(columnConfig, fetchData, fileName, sheetName))
    _exportLoading.value = false

    if (error === null) {
      options.onSuccess?.()
    } else {
      options.onError?.(error)
    }
  }

  return [exportLoading, exportExcelFile]
}
