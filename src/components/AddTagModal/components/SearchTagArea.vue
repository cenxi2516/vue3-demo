<template>
  <div
    ref="searchTagAreaRef"
    class="search-tag-area-wrapper"
    @click="updateModalPosition($event, BUBBLES_MARK_CLASS_NAME)"
  >
    <a-select
      ref="selectRef"
      class="search-tag-area w-full !mb-15px"
      v-bind="DEFAULT_SEARCH_SELECT_PROPS"
      :open="arrowMenuVisible"
      :searchValue="searchValue"
      @select="handleSelect"
      @focus="searchValue.length && openArrowMenu()"
    >
      <a-select-option
        v-for="option in searchTagOptionData"
        :key="option.labelId"
        :value="JSON.stringify(toRaw(option))"
        :disabled="option.selected"
      >
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">{{ option.labelName }}</span>
          <span
            v-show="!option.created && !option.labelId"
            class="text-right"
            style="font-size: 12px; color: #bfbfbf"
            >创建标签</span
          >
        </div>
      </a-select-option>
    </a-select>
    <TagTypeModal
      v-if="visibleModal"
      :visible="visibleModal"
      :labelName="selectValue"
      :top="top"
      :left="left"
      @close="handleCloseModal"
    />
  </div>
</template>

<script setup lang="ts">
import type { IRESTagItem } from '@/api/tag'
import { DEFAULT_SEARCH_SELECT_PROPS } from '@/components/AddTagModal/consts'
import { useVisible } from '@/hooks'
import { onClickOutside } from '@vueuse/core'
import { ref, toRaw } from 'vue'
import { useOptionPosition } from '../hooks'
import { useSearchTag } from '../hooks/useSearchTag'
import { AddTagTypeEnum, type TTagOptionItem } from '../types'
import { BUBBLES_MARK_CLASS_NAME } from './../consts'
import TagTypeModal from '@/components/AddTagModal/components/TagTypeModal.vue'

export type TProps = {
  selectedData: TTagOptionItem[]
}

const props = defineProps<TProps>()

const emit = defineEmits<{
  (e: 'add', addType: AddTagTypeEnum, tagData: IRESTagItem): void
}>()

const [visibleModal, showModal, closeModal] = useVisible()

const { searchValue, searchTagOptionData, arrowMenuVisible, openArrowMenu, closeArrowMenu } =
  useSearchTag(props)

const getSelectOptionItemByLabelId = (labelId: number) => {
  return searchTagOptionData.value.find((option) => option.labelId == labelId)
}

const getSelectOptionItemByLabelName = (labelName: string) => {
  return searchTagOptionData.value.find((option) => option.labelName == labelName)
}

const selectValue = ref('')
const handleSelect = (selVal: string) => {
  const tagOption = JSON.parse(selVal)

  const isNewCreateTag = !tagOption?.created
  if (isNewCreateTag) {
    selectValue.value = tagOption?.labelName
    showModal()
  } else {
    emit('add', AddTagTypeEnum.COMMON_LIB, tagOption)
    const selectOptionItem = getSelectOptionItemByLabelId(tagOption.labelId)
    if (selectOptionItem) {
      selectOptionItem.selected = true
    }
    closeArrowMenu()
  }
}

const searchTagAreaRef = ref<HTMLDivElement>()
onClickOutside(searchTagAreaRef, () => !visibleModal.value && closeArrowMenu())

const handleCloseModal = (tagData?: IRESTagItem) => {
  if (tagData) {
    emit('add', AddTagTypeEnum.SEARCH_CREATE, tagData)
    const selectOptionItem = getSelectOptionItemByLabelName(tagData.labelName)

    if (selectOptionItem) {
      selectOptionItem.labelId = tagData.labelId
      selectOptionItem.labelType = tagData.labelType
    }
    closeArrowMenu()
  }
  closeModal()
}

const [top, left, updateModalPosition] = useOptionPosition()
</script>

<style lang="scss">
#main-modal-wrapper {
  .tag-type-modal {
    .ant-modal {
      .ant-modal-content {
        overflow: hidden;
        box-shadow:
          0 3px 6px -4px rgba(0, 0, 0, 0.15),
          0 6px 16px 0 rgba(0, 0, 0, 0.11),
          0 9px 28px 8px rgba(0, 0, 0, 0.08);
      }
    }
  }

  .search-tag-area-wrapper {
    .search-tag-area {
      input.ant-select-selection-search-input:focus {
        box-shadow: none !important;
      }

      input.ant-select-selection-search-input {
        font-size: 14px;
      }

      .ant-select-single {
        .ant-select-selector {
          .ant-select-selection-item {
            display: none;
          }

          .ant-select-selection-search::placeholder {
            color: #bfbfbf;
            font-size: 14px;
          }
        }
      }

      .ant-select-selection-placeholder {
        display: none;
      }

      .ant-select-single.ant-select-open {
        .ant-select-selection-item {
          display: none;
        }
      }
    }

    .ant-select-selection-item {
      display: none;
    }
  }
}
</style>
