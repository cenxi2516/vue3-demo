<template>
  <div
    class="search-tag-area-wrapper"
    @click="updateModalPosition($event, BUBBLES_MARK_CLASS_NAME)"
  >
    <a-select
      class="search-tag-area w-full !mb-15px"
      v-bind="DEFAULT_SEARCH_SELECT_PROPRS"
      :open="openArrowMenu"
      v-model:value="selectvalue"
      @change="handleChange"
      @select="handleSelect"
    >
      <template #notFoundContent>
        <a-spin :spinning="true">
          <a-empty :description="null" />
        </a-spin>
      </template>
      <a-select-option value="jack">
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">Jack</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">创建标签</span>
        </div>
      </a-select-option>
      <a-select-option value="mark" disabled>
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">mark</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">已选标签</span>
        </div>
      </a-select-option>
      <a-select-option value="mark">
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">mark</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">未选标签</span>
        </div>
      </a-select-option>
    </a-select>
    <TagTypeModal
      v-if="visibleModal"
      :visible="visibleModal"
      labelName="Javas的是的是的辅导费"
      :top="top"
      :left="left"
      @close="handleCloseModal"
    />
  </div>
</template>

<script setup lang="ts">
import type { IRESTagItem } from '@/api/tag'
import {
  DEFAULT_SEARCH_SELECT_PROPRS
} from '@/components/AddTagModal/consts'
import { useVisible } from '@/hooks'
import { useOptionPosition } from '../hooks'
import { useSearchTag } from '../hooks/useSearchTag'
import { AddTagTypeEnum } from '../types'
import { BUBBLES_MARK_CLASS_NAME } from './../consts'

const emit = defineEmits<{
  (e: 'add', addType: AddTagTypeEnum, tagData: IRESTagItem): void
}>()

const [selectvalue, openArrowMenu] = useSearchTag()
const [visibleModal, showModal, closeModal] = useVisible()

const handleChange = (selVal: string) => {
  console.log('change: ', selVal)
}

const handleSelect = (selVal: string, option: { disabled: boolean }) => {
  showModal()
  console.log('select: ', selVal, option)
}

const handleCloseModal = (tagData?: IRESTagItem) => {
  if (tagData) {
    emit('add', AddTagTypeEnum.SEARCH_CREATE, tagData)
  }
  closeModal()
}

const [top, left, updateModalPosition] = useOptionPosition()
</script>

<style lang="scss">
.search-tag-area-wrapper {
  .search-tag-area {
    input.ant-select-selection-search-input:focus {
      box-shadow: none !important;
    }
  }
}
</style>
