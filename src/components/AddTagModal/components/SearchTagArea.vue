<template>
  <a-select class="search-tag-area w-full !mb-15px" v-bind="DEFAULT_SEARCH_SELECT_PROPRS" :open="openArrowMenu"
    v-model:value="selectvalue" @search="handleSearch" @change="handleChange" @select="handleSelect">
    <template #notFoundContent>
      <a-spin :spinning="true">
        <a-empty :description="null" />
      </a-spin>
    </template>
    <a-select-option value="jack">
      <div class="search-tag-item flex justify-between w-full">
        <span class="text-left !font-normal">Jack</span>
        <span class="text-right" style="font-size: 12px; color: #bfbfbf">创建标签</span>
      </div>
    </a-select-option>
  </a-select>
  <TagTypeModal :visible="visibleModal" labelName="Javas的是的是的辅导费" @close="closeModal" />
</template>

<script setup lang="ts">
import { DEFAULT_SEARCH_SELECT_PROPRS } from '@/components/AddTagModal/consts'
import { useVisible } from '@/hooks'
import { useSearchTag } from '../hooks/useSearchTag'

const [selectvalue, openArrowMenu, handleChangeOrSearch] = useSearchTag()
const [visibleModal, showModal, closeModal] = useVisible()

const handleSearch = (inpVal: string) => {
  console.log('search: ', inpVal)
}

const handleChange = (selVal: string) => {
  console.log('change: ', selVal)
}

const handleSelect = (selVal: string) => {
  showModal()
  console.log('select: ', selVal)
}
</script>

<style lang="scss">
.search-tag-area {
  input.ant-select-selection-search-input:focus {
    box-shadow: none !important;
  }
}
</style>
