<template>
  <a-modal
    :visible="props.visible"
    wrapClassName="tag-type-modal"
    v-bind="totalProps"
    @ok="handleOk"
  >
    <template #title>
      <span>{{ '请选择新增标签' }}</span>
      <base-tag
        :title="props.labelName"
        style="margin-left: 8px; vertical-align: 2px"
        :theme="theme"
      />
      <span>{{ '所属类型' }}</span>
    </template>
    <a-radio-group v-model:value="labelType" name="labelType">
      <a-radio v-for="{ value, label } in LABEL_TYPE_OPTIONS" :value="value" :key="value">
        {{ label }}
      </a-radio>
    </a-radio-group>
    <div class="text-right mt-4">
      <a-space>
        <a-button size="small" @click="handleCancel">取消</a-button>
        <a-button size="small" type="primary" @click="handleOk">确认</a-button>
      </a-space>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import BaseTag from '@/components/BaseTag/index.vue'
import { omit } from 'lodash-es'
import { computed } from 'vue'
import { DEFAULT_MODAL_PROPS, LABEL_TYPE_OPTIONS } from '../consts'
import { useAddTagTheme } from '../hooks'

const props = defineProps<{
  visible: boolean
  labelName: string
  top: number
  left: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const totalProps = computed(() => ({
  ...DEFAULT_MODAL_PROPS,
  ...{
    footer: null,
    mask: false,
    closable: false,
    centered: false,
    width: '365px',
    bodyStyle: {},
    style: {
      ...DEFAULT_MODAL_PROPS.style,
      ...(props.top && props.left
        ? {
            top: `${props.top}px`,
            left: `${props.left}px`
          }
        : {
            bottom: 0,
            top: '30%',
            left: 0,
            right: 0,
            margin: 'auto'
          })
    }
  },
  ...omit(props, ['visible'])
}))

const [theme, labelType] = useAddTagTheme()

const closeModal = () => emit('close')
const handleOk = () => {
  closeModal()
}
const handleCancel = () => {
  closeModal()
}
</script>

<style lang="scss">
#main-modal-wrapper {
  .tag-type-modal {
    .ant-modal {
      overflow: visible !important;
      bottom: 'auto';
      right: 'auto';
      margin: 0;

      .ant-modal-content {
        border-radius: 5px;

        .ant-modal-header {
          display: flex;
          align-items: center;
          border: none;
        }

        .ant-modal-body {
          padding-top: 0;
        }
      }
    }
  }
}
</style>
