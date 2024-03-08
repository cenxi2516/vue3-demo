<template>
  <AddTagModal v-model:visible="visible" @close="handleClose" />

  <a-button type="primary" @click="showModal">新增标签</a-button>
</template>

<script setup lang="ts">
import AddTagModal from '@/components/AddTagModal/index.vue'
import { ref } from 'vue'

const visible = ref(false)

const showModal = () => {
  visible.value = true
}

const handleClose = (isAddTag?: boolean, executeAddGuestTagTask?: () => Promise<unknown>) => {
  visible.value = false
	console.log(isAddTag, executeAddGuestTagTask);

}
</script>

<style lang="scss" scoped></style>
