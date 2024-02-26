<script setup lang="ts">
import ColumnSort from '@/Crud/ColumnSort.vue'
import { _warn } from '@/shared'
import type { CProps, DProps, KV, RProps, UProps } from '@/types'
import {
CloudDownloadOutlined,
DeleteOutlined,
DownOutlined,
EditOutlined,
EyeOutlined,
FullscreenOutlined,
PlusOutlined,
RedoOutlined,
SearchOutlined,
UpOutlined
} from '@ant-design/icons-vue'
import { useFullscreen } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { computed, onBeforeMount, reactive, ref, watch, type Ref } from 'vue'
import Add from './Crud/Add.vue'
import Edit from './Crud/Edit.vue'
import NForm from './Crud/VForm.vue'
import { OPERATION_KEY } from './consts'
import { useExportExcelFile, usePagination, type TColumnConfig } from './hooks'
import { to } from './utils'

type TTableData = {
  list: { [k: string]: unknown }[]
  total: string
}

type TProps = {
  primaryKey: string
  r: RProps
  c: CProps
  u: UProps
  d: DProps
}

const props = defineProps<TProps>()
const emit = defineEmits<{
  (type: 'remove-fail', error: unknown): void
  (type: 'show-one', one: KV): void
}>()

// 显示前
const isLoading = ref(false)
const columnConfig = ref(cloneDeep(props.r.columns))
function changeColumns(columns: any) {
  columnConfig.value = columns
}

// 初始化
onBeforeMount(async () => {
  if (props.r.before) {
    isLoading.value = true
    await props.r.before()
    isLoading.value = false
  }
})

// 表格
const isTableLoading = ref(true)
const dataSource = ref<TTableData['list']>([])

// 顶部筛选
const conditionFormRef = ref<typeof NForm>()
const conditionFormData = ref<KV>({})

// 左侧快捷筛选条件
const quickConditionFormRef = ref<typeof NForm>()
const quickConditionFormData = ref<KV>(
  props.r
    .quickConditionItems?.()
    ?.map((item) => item.name)
    .filter(Boolean)
    .reduce((o, name) => ({ ...o, [name as string]: undefined }), {}) ?? {}
)

watch(
  quickConditionFormData,
  (quickConditionFormData) => {
    for (const key in quickConditionFormData) {
      conditionFormData.value[key] = quickConditionFormData[key]
    }
    console.log(quickConditionFormData)

    fetchTableData()
  },
  { deep: true }
)

// 是否显示更多筛选条件
const isShowMoreCondition = ref(false)
watch(isShowMoreCondition, () => {
  conditionFormRef.value?.toggleItem()
})

// 处理hasShowMore
const conditionItems = props.r.conditionItems || (() => [])
const hasShowMore = conditionItems().some((item) => Object.hasOwn(item, 'toggle'))

// 表格的选择，注意table组件上一定要指定rowKey属性才能生效
const selectedRowKeys = ref<string[]>([])
function onTableSelectChange(keys: string[]) {
  selectedRowKeys.value = keys
}

// 分页
const [pagination, fetchTableData] = usePagination(
  async (pageCurrent: Ref<number>, pageSize: Ref<number>, pageCount: Ref<number>) => {
    isTableLoading.value = true
    // 清空已选行
    selectedRowKeys.value = []
    const [error, data] = await to(
      props.r.done({
        pageNum: pageCurrent.value,
        pageSize: pageSize.value,
        ...conditionFormData.value
      })
    )

    const { list = [], total = 0 } = error === null ? data : {}

    dataSource.value = list
    isTableLoading.value = false
    pageCount.value = Number(total)
    expandedRow(list)
    isTableLoading.value = false
  }
)

const tableSize = ref(props.r.tableProps?.size || 'default')

const otherTableProps = computed(() => {
  const { r, primaryKey } = props
  return {
    pagination: { ...r.pagination, ...pagination.value },
    rowKey: (row: KV) => row[primaryKey],
    rowSelection: r.hideRowSelection
      ? null
      : { selectedRowKeys, onChange: onTableSelectChange, ...r.rowSelection },
    defaultExpandAllRows: true,
    ...r.tableProps,
    size: tableSize.value
  }
})

// 默认展开第一层
const expandedRowKeys = ref<string[]>([])
const { primaryKey } = props
function expandedRow(list: KV[]) {
  list.forEach((row) => expandedRowKeys.value.push(row[primaryKey]))
}

// 重置条件，并加载数据
async function reset() {
  await conditionFormRef.value?.reset()
  await quickConditionFormRef.value?.reset()
  fetchTableData()
}

// ========= 删除 =========
async function remove(keys: string[], row?: KV) {
  const [isSuccess, msg] = await props.d!.done(keys, row)
  if (isSuccess) {
    msg && message.success(msg)
    selectedRowKeys.value = []
    fetchTableData()
  } else {
    msg && message.error(msg)
    emit('remove-fail', msg)
  }
}

// 主要用来初始化默认值
const FormDataAdd = reactive({})
const FormDataEdit = reactive({})

// 新增
const addRef = ref<typeof Add | undefined>()
const isAddFormLoading = ref(false)
async function showAddForm() {
  try {
    isAddFormLoading.value = true
    if (props.c?.before) {
      await props.c.before({})
    }
    addRef.value?.show()
  } catch (error) {
    console.log(error)
  } finally {
    isAddFormLoading.value = false
  }
}

// 编辑
const editRef = ref<typeof Edit | undefined>()
function showEditForm(record: KV) {
  editRef.value?.show(record)
}

// 详情
const isShowOne = ref(false)
const one = ref<any>()
const isOneLoading = ref(false)
async function showOne(row: KV) {
  try {
    isShowOne.value = true
    isOneLoading.value = true
    one.value = await props.r.getOne!(row)
    if (void 0 === one.value) {
      _warn('当前"getOne"函数没有返回值!')
    }
    emit('show-one', row)
  } catch (error) {
    /* empty */
  } finally {
    isOneLoading.value = false
  }
}

// 导出表格
const sheetColumnConfig = computed(() =>
  columnConfig.value?.filter((column: any) => {
    const { title, dataIndex } = column
    return title && dataIndex && dataIndex !== OPERATION_KEY
  })
) as TColumnConfig
const fetchSheetData = async () => await await props.r.exportExcel!.done(conditionFormData)
const [exportExcelLoading, exportExcelFile] = useExportExcelFile(sheetColumnConfig, fetchSheetData)

const { toggle: toggleFullScreen } = useFullscreen()
</script>

<template>
  <a-card class="crud" :loading="isLoading">
    <a-drawer
      v-if="r.getOne"
      v-model:visible="isShowOne"
      title="详情"
      width="50%"
      v-bind="r.drawerProps"
    >
      <a-skeleton :loading="isOneLoading" active>
        <slot name="one" v-bind="one"></slot>
      </a-skeleton>
    </a-drawer>

    <!-- 编辑 -->
    <Edit ref="editRef" v-if="u" v-model="FormDataEdit" v-bind="u" @success="fetchTableData" />

    <!-- 新增 -->
    <Add ref="addRef" v-if="c" v-model="FormDataAdd" v-bind="c" @success="fetchTableData" />

    <!-- 新增&导出按钮 -->
    <div class="mb-4 flex items-center gap-x-2">
      <!-- 批量操作 -->
      <a-button v-if="c" :loading="isAddFormLoading" type="primary" @click="showAddForm">
        <plus-outlined />新建
      </a-button>

      <!-- 导出表格 -->
      <a-button
        v-if="r.exportExcel"
        :loading="exportExcelLoading"
        type="success"
        @click="exportExcelFile(r.exportExcel?.fileName, r.exportExcel?.sheetName)"
      >
        <cloud-download-outlined />导出
      </a-button>

      <a-popconfirm
        v-if="void 0 !== d"
        title="确定要删除吗?"
        ok-text="确定"
        cancel-text="取消"
        @confirm="remove(selectedRowKeys)"
      >
        <a-button class="ml-4" v-show="selectedRowKeys.length > 0" type="primary" ghost danger>
          批量删除({{ selectedRowKeys.length }}条)
        </a-button>
      </a-popconfirm>

      <p class="flex-1" align="right">
        <a-space :size="16">
          <a-tooltip v-if="r.showRefresh" title="刷新表格">
            <a class="icon-reset" @click="reset"><redo-outlined :spin="isTableLoading" /></a>
          </a-tooltip>

          <a-tooltip v-if="r.showFullscreen" title="全屏">
            <a @click.stop="toggleFullScreen"><FullscreenOutlined /></a>
          </a-tooltip>

          <!-- 筛选条件 -->
          <column-sort
            v-if="r.showTableSet && r.columns"
            :columns="columnConfig"
            @change="changeColumns"
          />

          <a-tooltip v-if="r.showTableSizeSelect" title="表格尺寸">
            <a-radio-group
              v-model:value="tableSize"
              size="small"
              option-type="button"
              :options="[
                { label: '宽松', value: 'default' },
                { label: '中等', value: 'middle' },
                { label: '紧凑', value: 'small' }
              ]"
            />
          </a-tooltip>
        </a-space>
      </p>
    </div>

    <section>
      <!-- 筛选条件 -->
      <n-form
        ref="conditionFormRef"
        v-model="conditionFormData"
        v-if="void 0 !== r.conditionItems"
        :items="r.conditionItems"
        layout="inline"
        :label-col="{ span: 5 }"
      >
        <template #after>
          <a-form-item>
            <a-space>
              <a-button :loading="isTableLoading" @click="reset">重置</a-button>
              <a-button type="primary" :loading="isTableLoading" @click="fetchTableData"
                ><search-outlined />查询</a-button
              >
              <a-button
                v-if="hasShowMore"
                @click="isShowMoreCondition = !isShowMoreCondition"
                type="link"
              >
                <template v-if="isShowMoreCondition"><up-outlined />收起</template>
                <template v-else><down-outlined />展开</template>
              </a-button>
            </a-space>
          </a-form-item>
        </template>
      </n-form>
    </section>

    <section class="flex items-start gap-x-2">
      <a-card class="mr-4">
        {{ quickConditionFormData }}
        <n-form
          ref="quickConditionFormRef"
          v-model="quickConditionFormData"
          v-if="void 0 !== r.quickConditionItems"
          :items="r.quickConditionItems"
        >
        </n-form>
      </a-card>

      <!-- 表格数据 -->
      <a-table
        bordered
        :loading="isTableLoading"
        :columns="columnConfig"
        :dataSource="dataSource"
        v-model:expandedRowKeys="expandedRowKeys"
        v-bind="otherTableProps"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === OPERATION_KEY || column.key === OPERATION_KEY">
            <slot name="row-buttons-before" v-bind="record"></slot>

            <a-button v-if="r.getOne" type="link" @click="showOne(record)"
              ><eye-outlined />查看</a-button
            >

            <a-button v-if="void 0 !== u" type="link" size="small" @click="showEditForm(record)">
              <edit-outlined />编辑</a-button
            >
            <a-popconfirm
              v-if="void 0 !== d"
              title="确定要删除吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="remove([record[primaryKey]], record)"
            >
              <a-button type="link" size="small"><delete-outlined />删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </section>
  </a-card>
</template>

<style lang="scss">
.crud {
  &__header {
    background-color: #fff;
  }

  .ant-table-cell:empty {
    &:after {
      content: '暂无';
      text-align: center;
      color: #ccc;
      font-size: 12px;
    }
  }

  .ant-form-inline {
    .ant-form-item {
      margin-bottom: 16px;
    }
  }
}

.icon-reset {
  transform: rotate3d(30deg);
}
</style>
