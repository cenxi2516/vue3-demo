<template>
  <div id="main">
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal
      ref="modalRef"
      :z-index="zIndex"
      v-model:visible="visible"
      title="Basic Modal"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import SearchBar from './components/FullSearch/SearchBar.vue'
import useSearch from './components/FullSearch/useSearch'
import { useZIndex } from './hooks'
import { to } from './utils'

const visible = ref<boolean>(false)

const showModal = () => {
  // increase()
  visible.value = true
}

const handleCancel = () => {
  // decrease()
}

const handleOk = (e: MouseEvent) => {
  console.log(e)
  visible.value = false
}

const modalRef = shallowRef<HTMLElement>()
const { isShow, instance } = useSearch(SearchBar)

const handleSearchBar = (e: KeyboardEvent) => {
  e.metaKey && e.key === 'k' && instance.show()
}

const { zIndex, increase, decrease } = useZIndex(modalRef)

onMounted(() => {
  window.addEventListener('keydown', handleSearchBar)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleSearchBar)
})

async function func4() {
	const promise = Promise.resolve({ name: '123' });
	const [err, data] = await to(promise);
	console.log(err, data)
	// null {name: '123'}
}
func4()

</script>
