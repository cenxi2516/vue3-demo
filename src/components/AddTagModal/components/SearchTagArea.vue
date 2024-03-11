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
            v-show="!option.created && !option.labelId"
            class="text-right"
            style="font-size: 12px; color: #bfbfbf"
            >创建标签</span
          >
        </div>
      </a-select-option>
      <a-select-option
        :value="
          JSON.stringify(
            toRaw({
              labelId: 23324,
              labelType: 'ROOM_PREFERENCE',
              labelName: '的观点分隔符挂号费会覆盖后',
              selected: false,
              created: true
            })
          )
        "
      >
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">的观点分隔符挂号费会覆盖后</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">未选标签</span>
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
import { nextTick, ref, toRaw } from 'vue'
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
  nextTick(() => {
    const inputElement = document.querySelector(
      '.search-tag-area-wrapper .search-tag-area input[type=search]'
    )
    if (inputElement instanceof HTMLInputElement) {
      inputElement.value = searchValue.value
    }
  })
}
const getSelectOptionItemByLabelId = (labelId: number) => {
  return searchTagOptionData.value.find((option) => option.labelId == labelId)
}

const getSelectOptionItemByLabelName = (labelName: string) => {
  return searchTagOptionData.value.find((option) => option.labelName == labelName)
}

const selectValue = ref('')
const handleSelect = (selVal: string, option: { disabled: boolean }) => {
  const tagOption = JSON.parse(selVal)
  selectValue.value = tagOption?.labelName

  const isNewCreateTag = !tagOption?.created
  if (isNewCreateTag) {
    showModal()
  } else {
    console.log(tagOption)

    emit('add', AddTagTypeEnum.COMMON_LIB, tagOption)
    const selectOptionItem = getSelectOptionItemByLabelId(tagOption.labelId)
    if (selectOptionItem) {
      selectOptionItem.selected = true
    }
    openArrowMenu.value = false
  }

  console.log('select: ', selVal, tagOption)
}

const searchTagAreaRef = ref<HTMLDivElement>()
onClickOutside(searchTagAreaRef, (e) => {
  console.log(e, '点击元素外区域')
  if (!visibleModal.value) {
    openArrowMenu.value = false
  }
  nextTick(() => {
    const inputElement = document.querySelector(
      '.search-tag-area-wrapper .search-tag-area input[type=search]'
    )
    if (inputElement instanceof HTMLInputElement) {
      inputElement.value = searchValue.value
    }
  })
})

const handleFocus = (e: Event) => {
  console.log('获取焦点')

  if (searchValue.value.length) {
    openArrowMenu.value = true
  }

  nextTick(() => {
    const inputElement = document.querySelector(
      '.search-tag-area-wrapper .search-tag-area input[type=search]'
    )
    if (inputElement instanceof HTMLInputElement) {
      inputElement.value = searchValue.value
    }
  })

  console.log(searchValue.value, e)
}

const handleCloseModal = (tagData?: IRESTagItem) => {
  if (tagData) {
    emit('add', AddTagTypeEnum.SEARCH_CREATE, tagData)
    const selectOptionItem = getSelectOptionItemByLabelName(tagData.labelName)
    if (selectOptionItem) {
      selectOptionItem.labelId = tagData.labelId
      selectOptionItem.labelType = tagData.labelType
    }
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
    .ant-select-single {
      .ant-select-selector {
        .ant-select-selection-item {
          display: none;
        }

        .ant-select-selection-search::placeholder {
          color: #bfbfbf;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
