<template>
  <div
    ref="searchTagAreaRef"
    class="search-tag-area-wrapper"
    @click="updateModalPosition($event, BUBBLES_MARK_CLASS_NAME)"
  >
    <a-select
      class="search-tag-area w-full !mb-15px"
      v-bind="DEFAULT_SEARCH_SELECT_PROPRS"
      :open="openArrowMenu"
      :value="searchValue"
      @change="handleChange"
      @select="handleSelect"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <a-select-option
        v-for="option in searchTagOptionData"
        :key="option.labelName"
        :value="JSON.stringify(toRaw(option))"
        :disabled="option.selected"
      >
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">{{ option.labelName }}</span>
          <span
            v-if="!option.created && !option.labelId"
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
import { DEFAULT_SEARCH_SELECT_PROPRS } from '@/components/AddTagModal/consts'
import { useVisible } from '@/hooks'
import { onClickOutside } from '@vueuse/core'
import { ref, toRaw } from 'vue'
import { useOptionPosition } from '../hooks'
import { useSearchTag } from '../hooks/useSearchTag'
import { AddTagTypeEnum, type TTagOptionItem } from '../types'
import { BUBBLES_MARK_CLASS_NAME } from './../consts'

export type TProps = {
  selectedData: TTagOptionItem[]
}

const props = defineProps<TProps>()

const emit = defineEmits<{
  (e: 'add', addType: AddTagTypeEnum, tagData: IRESTagItem): void
}>()

const [searchValue, searchTagOptionData, openArrowMenu] = useSearchTag(props)
const [visibleModal, showModal, closeModal] = useVisible()

const handleChange = (selVal: string) => {
  console.log('change: ', selVal, searchValue.value)
  const inputElement = document.querySelector(
    '.search-tag-area-wrapper .search-tag-area input[type=search]'
  )
  if (inputElement instanceof HTMLInputElement) {
    inputElement.value = searchValue.value
  }
}

const selectValue = ref('')
const handleSelect = (selVal: string, option: { disabled: boolean }) => {
  const tagOption = JSON.parse(selVal)
  selectValue.value = tagOption?.labelName

  const isNewCreateTag = !tagOption?.created
  if (isNewCreateTag) {
    showModal()
  } else {
    // openArrowMenu.value = false
  }

  console.log('select: ', selVal, tagOption)
}

const handleBlur = (e: Event) => {
  console.log('失去焦点', e)
  if (!visibleModal.value) {
    // openArrowMenu.value = false
  }
  console.log(searchValue.value)
}

const searchTagAreaRef = ref<HTMLDivElement>()
onClickOutside(searchTagAreaRef, (e) => {
  console.log(e, '点击元素外区域');
  if(!visibleModal.value) {
    // openArrowMenu.value = false
  }
})

const handleFocus = (e: Event) => {
  console.log('获取焦点')

  if (searchValue.value.length) {
    // openArrowMenu.value = true
  }

  console.log(searchValue.value, e)
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
