<script setup lang="ts">
import SearchBar from '@/components/FullSearch/SearchBar.vue'
import useSearch from '@/components/FullSearch/useSearch'
import { POP_MOUNT_CONTAINER_ID } from '@/consts'
import CurdTable from '@/views/CurdTable.vue'
import ModalDemo from '@/views/ModalDemo.vue'
import StudyVue from '@/views/StudyVue.vue'
import { useEventListener } from '@vueuse/core'
import { ref, watch } from 'vue'
import AddTagModalDemo from './AddTagModalDemo.vue'
import BaseTagDemo from './BaseTagDemo.vue'
import SvgIconDemo from './SvgIconDemo.vue'


const activeKey = ref('1')
const { isShow, instance } = useSearch(SearchBar)
useEventListener(window, 'keydown', (e) => {
	if (e.metaKey && e.key === 'k') {
		instance.show()
	}
})

watch(isShow, () => {
	console.log(isShow);

	if (!isShow.value) instance.destroy()
})

</script>

<template>
	<div class="p-4">
		<a-tabs v-model:activeKey="activeKey" class="px-10">
			<a-tab-pane key="1" tab="Vue实验">
				<StudyVue />
			</a-tab-pane>
			<a-tab-pane key="2" tab="CURD表格">
				<CurdTable />
			</a-tab-pane>
			<a-tab-pane key="3" tab="Modal实例" force-render>
				<modal-demo />
			</a-tab-pane>
			<a-tab-pane key="4" tab="tag封装" force-render>
				<base-tag-demo />
			</a-tab-pane>
			<a-tab-pane key="5" tab="新增tag弹窗" force-render>
				<add-tag-modal-demo />
			</a-tab-pane>
			<a-tab-pane key="6" tab="基础Icon" force-render>
				<SvgIconDemo />
			</a-tab-pane>
		</a-tabs>
	</div>
	<div :id="POP_MOUNT_CONTAINER_ID" class="!relative !overflow-visible"></div>
</template>

<style lang="scss" scoped></style>
