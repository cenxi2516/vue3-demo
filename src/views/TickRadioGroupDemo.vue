<template>
  <TickRadioGroup v-model:value="sexValue" disabled :options="sexList" required> </TickRadioGroup>
</template>

<script lang="ts" setup>
import TickRadioGroup from '@/components/TickRadioGroup/index.vue'
import { ref } from 'vue'

const sexList = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  },
  {
    label: '未知',
    value: 3
  }
]

const sexValue = ref(3)
</script>

<style lang="scss" scoped></style>
