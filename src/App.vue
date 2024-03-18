<script setup lang="ts">
import SearchBar from '@/components/FullSearch/SearchBar.vue'
import useSearch from '@/components/FullSearch/useSearch'
import { useEventListener } from '@vueuse/core'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { watch } from 'vue'


const {isShow, instance} = useSearch(SearchBar)
useEventListener(window, 'keydown', (e) => {
  if (e.metaKey && e.key === 'k') instance.show()
})

watch(isShow, () => {
	if(!isShow.value) instance.destroy()
})
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<style lang="scss" scoped></style>
