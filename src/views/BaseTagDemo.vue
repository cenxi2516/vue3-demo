<template>
  <div class="main">
    <p>只读，非其他公司：<base-tag title="标题" /></p>
    <p>只读，其他公司：<base-tag title="标题" isOtherCompany /></p>
    <p>
      可删除状态场景(无二次确认弹窗)：<base-tag title="标题" canDeleted @delete="handleDelete" />
    </p>
    <p>
      可删除状态场景（有二次确认弹窗）：
      <base-tag title="标题" delConfirm canDeleted @delete="handleDelete">
        <template #cancelButton>
          <div>餐区23</div>
        </template>
      </base-tag>
    </p>
    <p>
      可选中状态场景：
      <base-tag title="标题" canSelected v-model:selected="tagSelected" @select="handleSelect" />
    </p>
    <p>
      餐饮喜好主题色：<base-tag title="标题标题标题标题标题标题" :theme="PresetThemeEnum.CATER" />
    </p>
    <p>其他喜好主题色：<base-tag title="标题标题标题" :theme="PresetThemeEnum.OTHER" /></p>
    <p>测试省略(10)：<base-tag title="标题标题标题标题标题" :theme="PresetThemeEnum.OTHER" /></p>
    <p>测试省略(9)：<base-tag title="标题标题标题标题标" :theme="PresetThemeEnum.OTHER" /></p>
    <p>测试省略(8)：<base-tag title="标题标题标题标题" :theme="PresetThemeEnum.OTHER" /></p>
    <p>测试省略(7)：<base-tag title="标题标题标题题" :theme="PresetThemeEnum.OTHER" /></p>
    <p>测试省略(6)：<base-tag title="标题标题标题" :theme="PresetThemeEnum.OTHER" /></p>
    <p>测试省略(5)：<base-tag title="标题标题标" :theme="PresetThemeEnum.OTHER" /></p>
    <p>测试省略(4)：<base-tag title="标题标题" :theme="PresetThemeEnum.OTHER" /></p>
    <p>
      测试省略(3)：<base-tag
        title="标题标"
        :theme="PresetThemeEnum.OTHER"
      />
    </p>
    <p>
      测试省略(2)：<base-tag
        title="标题"
        :theme="PresetThemeEnum.OTHER"
      />
    </p>
    <p>
      测试省略(1)：<base-tag
        title="标"
        :theme="PresetThemeEnum.OTHER"
      />
    </p>
    <p>
      测试省略(0)：<base-tag
        title=""
        :theme="PresetThemeEnum.OTHER"
      />
    </p>
  </div>
</template>

<script setup lang="ts">
import BaseTag from '@/components/BaseTag/index.vue'
import { PresetThemeEnum, type TConfirmDeleteFn } from '@/components/BaseTag/types'
import { ref } from 'vue'

const tagSelected = ref(false)

const handleSelect = (selected: boolean, title: string) => {}

const handleDelete = (confirmDelete: TConfirmDeleteFn) => {
  console.log('hello world')
  confirmDelete()
}
</script>

<style lang="scss" scoped></style>
