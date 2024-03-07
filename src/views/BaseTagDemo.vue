<template>
  <div class="main">
    <p>只读，非其他公司：<base-tag title="标题" /></p>
    <p>只读，其他公司：<base-tag title="标题" isOtherCompany /></p>
    <p>
      可删除状态场景(无二次确认弹窗)：<base-tag title="标题" canDeleted @delete="handleDelete" />
    </p>
    <p>
      可删除状态场景（有二次确认弹窗）：
      <base-tag title="标题" delConfirm canDeleted @delete="handleDelete" />
    </p>
    <p>
      可选中状态场景：
      <base-tag title="标题" canSelected v-model:selected="tagSelected" @select="handleSelect" />
    </p>
    <p>餐饮喜好主题色：<base-tag title="标题" :theme="PresetThemeEnum.CATER" /></p>
    <p>其他喜好主题色：<base-tag title="标题" :theme="PresetThemeEnum.OTHER" /></p>
  </div>
</template>

<script setup lang="ts">
import BaseTag from '@/components/BaseTag/index.vue';
import { PresetThemeEnum, type TConfirmDeleteFn } from '@/components/BaseTag/types';
import { ref } from 'vue';

const tagSelected = ref(false)

const handleSelect = (selected: boolean, title: string) => {}

const handleDelete = (title: string, confirmDelete: TConfirmDeleteFn) => {
  console.log('hello world')
  confirmDelete()
}
</script>

