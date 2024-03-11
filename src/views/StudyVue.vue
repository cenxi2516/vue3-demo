<template>
  <div class="main">
    <a-select
      class="search-tag-area w-full !mb-15px"
      v-bind="{...DEFAULT_SEARCH_SELECT_PROPRS, getPopupContainer: undefined}"
      :open="open"
      v-model:value="value"
      @search="handleSearch"
      @change="handleChange"
    >
      <template #notFoundContent>
        <a-empty :description="null" />
      </template>
      <a-select-option value="jack">
        <div class="search-tag-item flex justify-between w-full">
          <span class="text-left">Jack</span>
          <span class="text-right" style="font-size: 12px; color: #bfbfbf">创建标签</span>
        </div>
      </a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_SEARCH_SELECT_PROPRS } from '@/components/AddTagModal/consts'
import { debounce } from 'lodash-es'
import { ref } from 'vue'

const value = ref('')
const inputValue = ref('')
const open = ref(false)

const options = ref([
  {
    value: 'china',
    label: 'China (中国)'
  },
  {
    value: 'usa',
    label: 'USA (美国)'
  },
  {
    value: 'japan',
    label: 'Japan (日本)'
  },
  {
    value: 'korea',
    label: 'Korea (韩国)'
  }
])

const handleSearch = debounce((val: string) => {
  console.log(val, 'search', value)
  open.value = true
  inputValue.value = val
}, 5e2)

const handleChange = (val: string) => {
  value.value = inputValue.value
  console.log(val, 'change')
}
</script>

<style lang="scss">
.search-tag-area {
  input.ant-select-selection-search-input:focus {
    box-shadow: none !important;
  }
}
</style>
