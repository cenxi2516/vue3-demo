<template>
  <a-modal
    :visible="props.visible"
    v-bind="totalProps"
    wrapClassName="add-tag-modal"
    @ok="handleOk"
  >
    <template #title>{{ '新增标签' }}</template>
    <template #closeIcon><close-outlined @click="handleCancel" style="font-size: 14px" /></template>
    <a-spin :spinning="commonLibTagLoading">
      <SearchTagArea :selectedData="selectedGuestTagData" @add="manualAddTag" />
      <CommonTagArea :data="tagLibData" />
      <SelectedTagArea :data="selectedGuestTagData" @delete="handleSelectedTagDelete" />
    </a-spin>
    <template #footer>
      <a-space size="middle">
        <a-button v-bind="DEFAULT_BUTTON_PROPS" @click="handleCancel">取消</a-button>
        <a-button
          :disabled="!isCanAddGuestTag"
          v-bind="DEFAULT_BUTTON_PROPS"
          type="primary"
          :loading="guestTagAddLoading"
          @click="handleOk"
          >确认</a-button
        >
      </a-space>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { addGuestTag } from '@/api/tag'
import { useExecuteRequest } from '@/hooks'
import { to } from '@/utils'
import { CloseOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import { omit } from 'lodash-es'
import { computed } from 'vue'
import CommonTagArea from './components/CommonTagArea.vue'
import SearchTagArea from './components/SearchTagArea.vue'
import SelectedTagArea from './components/SelectedTagArea.vue'
import { ADD_TAG_TWO_CONFIRM_CONFIG, DEFAULT_BUTTON_PROPS, DEFAULT_MODAL_PROPS } from './consts'
import { useAddGuestTag, useQueryCommonTagLib } from './hooks'

export type TAddTagModalProps = {
  visible: boolean
  guestId: number
}

const props = defineProps<TAddTagModalProps>()

const emit = defineEmits<{ (e: 'close', isAdd: boolean): void }>()

const totalProps = computed(() => ({
  ...DEFAULT_MODAL_PROPS,
  ...omit(props, ['visible'])
}))

const [commonLibTagLoading, tagLibData] = useQueryCommonTagLib(props)
const [selectedGuestTagData, handleSelectedTagDelete, manualAddTag] = useAddGuestTag(tagLibData)
const isCanAddGuestTag = computed(() => selectedGuestTagData.value.length)
const [guestTagAddLoading, addTagToGuestTask] = useExecuteRequest(() =>
  addGuestTag({
    guestId: props.guestId,
    preferLabelIdList: selectedGuestTagData.value.map((item) => item.labelId)
  })
)

const closeModal = (isAdd: boolean) => emit('close', isAdd)
const handleOk = async () => {
  const [error, data] = await to(addTagToGuestTask())
  if (error === null && data) {
    message.success('添加标签成功')
    closeModal(true)
  }
}

const handleCancel = () => {
  if (isCanAddGuestTag.value) {
    Modal.confirm({
      ...ADD_TAG_TWO_CONFIRM_CONFIG,
      async onOk() {
        handleOk()
      },
      onCancel() {
        closeModal(false)
      }
    })
  } else {
    closeModal(false)
  }
}
</script>

<style lang="scss" scoped></style>
