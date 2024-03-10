<template>
  <a-modal
    ref="modalRef"
    :visible="props.visible"
    wrapClassName="tag-type-modal"
    v-bind="totalProps"
    @ok="handleOk"
  >
    <template #title>
      {{ '请选择新增标签类型' }}
      <base-tag
        :title="props.labelName"
        :theme="{
          mainColor: '#d9d9d9'
        }"
      ></base-tag>

      {{ '所属类型' }}
    </template>
    <a-radio-group v-model:value="labelType" name="labelType">
      <a-radio v-for="{ value, label } in LABEL_TYPE_OPTIONS" :value="value" :key="value">{{
        label
      }}</a-radio>
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
import { useZIndex } from '@/hooks'
import { omit } from 'lodash-es'
import { computed, ref } from 'vue'
import { DEFAULT_MODAL_PROPS, LABEL_TYPE_OPTIONS } from '../consts'

const props = defineProps<{
  visible: boolean
  labelName: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
const labelType = ref()
const modalRef = ref()
const { zIndex, increase, decrease } = useZIndex(modalRef)
const totalProps = computed(() => ({
  ...DEFAULT_MODAL_PROPS,
  ...{
    footer: null,
    mask: false,
    closable: false,
    centered: false,
    width: '365px',
    bodyStyle: {}
  },
  ...omit(props, ['visible']),
}))

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
    color: #f40;

    .ant-modal {
      overflow: visible !important;

      .ant-modal-header {
        border: none;
      }

      .ant-modal-body {
        padding-top: 0;
      }
    }
  }
}
</style>
