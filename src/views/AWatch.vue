<template>
  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk" @cancel="handleCancel">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  visible: boolean
}>()

const visible = computed(() => props.visible)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleOk = () => {
  emit('close')
}

const handleCancel = () => {
  emit('close')
}
</script>
