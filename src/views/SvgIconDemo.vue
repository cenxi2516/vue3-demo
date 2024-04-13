<template>
  <ul>
    <li v-for="(type, key) in PMSIconsEnum" :key="key">
      <SvgIcon
        :type="type"
        origin
        :style="{
          color: '#f40'
          // fontSize: '40px'
        }"
      />
      <span>{{ type }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import { PMSIconsEnum } from '@/enums/icon'
</script>

<style lang="scss" scoped></style>
