<template>
  <div class="study-container">
    <a-button @click="handleClick1">打开1</a-button>
    <a-button @click="handleClick2" type="primary">打开2</a-button>
    <a-watch :visible="visible" @close="handleClose"></a-watch>
  </div>
</template>

<script setup lang="ts">
import useCommandModal from '@/hooks/useCommandModal';
import { ref } from 'vue';
import AWatch from './AWatch.vue';

const [isShow, myModal] = useCommandModal(AWatch)
const visible = ref(false)

const handleClick1 = () => {
  visible.value = true
}

const handleClick2 = () => {
  myModal({
    okText: 'Ok',
    cancelText: 'Cancel',
    maskClosable: false
  })
	console.log(isShow);

}

const handleClose = () => {
  visible.value = false
  console.log(3434)
}
</script>

<style lang="scss" scoped>
.study-container {
  padding: 1em;
}
</style>
