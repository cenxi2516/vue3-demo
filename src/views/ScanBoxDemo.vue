<template>
  <ScanBoxInput :visible="props.visible" v-model:value="scanInputValue" />
</template>

<script lang="ts" setup>
import ScanBoxInput from '@/components/ScanBoxInput/index.vue'
import { ref } from 'vue'

const props = defineProps<{
  visible: boolean
}>()
const scanInputValue = ref('')
</script>

<style lang="scss" scoped></style>
