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
      @search="handleSearch"
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
      <a-select-option value="mark">
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">mark</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">创建标签</span>
        </div>
      </a-select-option>
      <a-select-option value="yarn">
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">yarn</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">创建标签</span>
        </div>
      </a-select-option>
      <a-select-option value="pnpm" disabled>
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">pnpm</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">创建标签</span>
        </div>
      </a-select-option>
      <a-select-option value="npm">
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">npm</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">创建标签</span>
        </div>
      </a-select-option>
      <a-select-option value="css">
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">css</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">创建标签</span>
        </div>
      </a-select-option>
      <a-select-option value="js">
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">js</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">创建标签</span>
        </div>
      </a-select-option>
      <a-select-option value="ts">
        <div class="flex justify-between w-full" :class="[BUBBLES_MARK_CLASS_NAME]">
          <span class="text-left !font-normal">ts</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">创建标签</span>
        </div>
      </a-select-option>
    </a-select>
    <TagTypeModal
      v-if="visibleModal"
      :visible="visibleModal"
      labelName="Javas的是的是的辅导费"
      :top="top"
      :left="left"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_SEARCH_SELECT_PROPRS } from '@/components/AddTagModal/consts'
import { useVisible } from '@/hooks'
import { useOptionPosition } from '../hooks'
import { useSearchTag } from '../hooks/useSearchTag'
import { BUBBLES_MARK_CLASS_NAME } from './../consts'

const [selectvalue, openArrowMenu, handleChangeOrSearch] = useSearchTag()
const [visibleModal, showModal, closeModal] = useVisible()

const handleSearch = (inpVal: string) => {
  console.log('search: ', inpVal)
}

const handleChange = (selVal: string) => {
  console.log('change: ', selVal)
}

const handleSelect = (selVal: string, option: { disabled: boolean }) => {
  showModal()
  console.log('select: ', selVal, option)
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
