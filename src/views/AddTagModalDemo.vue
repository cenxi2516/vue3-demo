<template>
  <AddTagModal :visible="visible" @close="closeModal" />

  <a-button type="primary" @click="showModal">新增标签</a-button>
</template>

<script setup lang="ts">
import AddTagModal from '@/components/AddTagModal/index.vue'
import { useVisible } from '@/hooks'

const [visible, showModal, closeModal] = useVisible()
</script>

<style lang="scss" scoped></style>
