<template>
  <a-modal v-model:visible="props.visible" v-bind="totalProps" @ok="handleOk">
    <template #title>{{ '新增标签' }}</template>
    <template #closeIcon><close-outlined @click="handleCancel" style="font-size: 14px" /></template>
    <template #footer>
      <a-button v-bind="DEFAULT_BUTTON_PROPS" @click="handleCancel">取消</a-button>
      <a-button
        :disabled="disabledAdd"
        v-bind="DEFAULT_BUTTON_PROPS"
        type="primary"
        :loading="confirmLoading"
        @click="handleOk"
        >确认</a-button
      >
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script setup lang="ts">
import { useAsyncConfirm } from '@/hooks'
import { CloseOutlined } from '@ant-design/icons-vue'
import { omit } from 'lodash-es'
import { computed } from 'vue'
import { DEFAULT_BUTTON_PROPS, DEFAULT_MODAL_PROPS } from './consts'
import { useAddGuestTag } from './hooks'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close', isAddTag?: boolean, addGuestTag?: () => Promise<unknown>): void
  (e: 'update:visible', value: boolean): void
}>()

const totalProps = computed(() => ({
  ...DEFAULT_MODAL_PROPS,
  ...omit(props, ['visible'])
}))

const [disabledAdd, handleAddGuestTag] = useAddGuestTag()
const [confirmLoading, executeAddGuestTagTask] = useAsyncConfirm(handleAddGuestTag)

const handleOk = () => emit('close', !disabledAdd, executeAddGuestTagTask)

const handleCancel = () => emit('close', !disabledAdd, executeAddGuestTagTask)

defineExpose({ executeAddGuestTagTask })
</script>

<style lang="scss" scoped></style>
