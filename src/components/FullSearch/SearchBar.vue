<template>
  <div
    id="searchBarWrapper"
    ref="searchBarWrapperRef"
    :style="searchBarStyle"
    class="w-1/2 bg-red-200 p-2.5 searchbar"
  >
    <a-input ref="inputRef" v-model:value="searchData" placeholder="Basic usage" />
    <close-outlined style="cursor: pointer" />
  </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref, shallowRef, type CSSProperties } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { useZIndex } from '@/hooks'

const searchBarStyle: CSSProperties = {
  position: 'absolute',
  top: '120px',
  left: 'calc(50% - 310px)',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  columnGap: '10px'
}

const searchBarWrapperRef = shallowRef()
const inputRef = shallowRef<HTMLInputElement>()
const searchData = ref<string>()

const { zIndex, increase, decrease } = useZIndex(searchBarWrapperRef)

onMounted(() => {})

nextTick(() => {
  inputRef.value?.focus()
})
</script>
<style lang="scss" scoped>
@keyframes transitionY {
  0% {
    transform: translateY(50%);
    opacity: 0;
  }

  100% {
    transform: translateY(0%);
  }
}

.searchbar {
  animation: transitionY 0.5s;
}
</style>
