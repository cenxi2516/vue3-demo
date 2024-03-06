<template>
  <div class="main">
    <ul>
      <li v-for="({ message }, i) in items" :key="i">
        {{ parentMessage + ' -- ' + message + ' -- ' + i }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
const parentMessage = ref('parentMessage')
</script>

<style lang="scss" scoped></style>
