<template>
  <a-modal :visible="props.visible" v-bind="totalProps" @ok="handleOk">
    <template #title>{{ '新增标签' }}</template>
    <template #closeIcon><close-outlined @click="handleCancel" style="font-size: 14px" /></template>
    <SearchTagArea />
    <CommonTagArea />
    <SelectedTagArea />
    <template #footer>
      <a-space size="middle">
        <a-button v-bind="DEFAULT_BUTTON_PROPS" @click="handleCancel">取消</a-button>
        <a-button
          :disabled="disabledAdd"
          v-bind="DEFAULT_BUTTON_PROPS"
          type="primary"
          :loading="confirmLoading"
          @click="handleOk"
          >确认</a-button
        >
      </a-space>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { useAsyncConfirm } from '@/hooks'
import { CloseOutlined } from '@ant-design/icons-vue'
import { omit } from 'lodash-es'
import { computed } from 'vue'
import CommonTagArea from './components/CommonTagArea.vue'
import SearchTagArea from './components/SearchTagArea.vue'
import SelectedTagArea from './components/SelectedTagArea.vue'
import { DEFAULT_BUTTON_PROPS, DEFAULT_MODAL_PROPS } from './consts'
import { useAddGuestTag } from './hooks'

const props = defineProps<{ visible: boolean }>()

const emit = defineEmits<{ (e: 'close'): void }>()

const totalProps = computed(() => ({
  ...DEFAULT_MODAL_PROPS,
  ...omit(props, ['visible'])
}))


const [disabledAdd, handleAddGuestTag] = useAddGuestTag()
const [confirmLoading, executeAddGuestTagTask] = useAsyncConfirm(handleAddGuestTag)

const closeModal = () => emit('close')

const handleOk = () => {
  closeModal()
}

const handleCancel = () => {
  closeModal()
}
</script>

<style lang="scss" scoped></style>
