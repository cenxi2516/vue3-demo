<script setup lang="ts">
import SearchBar from '@/components/FullSearch/SearchBar.vue'
import CurdTable from '@/views/CurdTable.vue'
import ModalDemo from '@/views/ModalDemo.vue'
import StudyVue from '@/views/StudyVue.vue'
import { useEventListener } from '@vueuse/core'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ref, watch } from 'vue'
import useSearch from './components/FullSearch/useSearch'


const activeKey = ref('1')
const {isShow, instance} = useSearch(SearchBar)
useEventListener(window, 'keydown', (e) => {
	if(e.metaKey && e.key === 'k'){
		instance.show()
	}
})

watch(isShow, () => {
	console.log(isShow);

	if(!isShow.value) instance.destroy()
})
</script>

<template>
  <a-config-provider :locale="zhCN">
    <div class="p-4">
      <a-tabs v-model:activeKey="activeKey" class="px-10">
        <a-tab-pane key="1" tab="CURD表格">
          <CurdTable />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Vue实验">
          <StudyVue />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Modal实例" force-render>
					<modal-demo />
				</a-tab-pane>
      </a-tabs>
    </div>
  </a-config-provider>
</template>

<style lang="scss" scoped>
#app {
  font-family: 微软雅黑, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
