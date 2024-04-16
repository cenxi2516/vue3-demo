<template>
  <div class="main">
    {{ network }}
  </div>
</template>

<script setup lang="ts">
import { useNetwork } from '@/hooks'



const network = useNetwork()
console.log(network);


</script>

<style lang="scss"></style>
