<template>
  <a-tag
    class="select-none"
		style="padding: 0; line-height: 1"
    :style="tagStyle"
  >
    <div class="tag-wrapper flex items-center">
      <div class="title">
        {{ props.title }}
      </div>
      <div
        v-if="props.otherCompany"
        class="sub-title"
        :style="subTitleStyle"
      >
        {{ OTHER_COMPANY_SIGN }}
      </div>
      <div
        v-else-if="props.canDeleted"
        class="delete cursor-pointer"
      >
        <close-outlined />
      </div>
      <div class="select" v-else-if="props.canSelected">
        <check-outlined />
      </div>
    </div>
  </a-tag>
</template>

<script setup lang="ts">
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { OTHER_COMPANY_SIGN } from './consts'
import { useTheme } from './hooks'
import { PresetThemeEnum, TagStatusEnum, type TTagProps } from './types'

const props = withDefaults(defineProps<TTagProps>(), {
  theme: PresetThemeEnum.GUEST,
  otherCompany: false,
  canSelected: false,
  canDeleted: true
})

const tagStatus = computed(() => {
	if (props.otherCompany) {
    return TagStatusEnum.READONLY
  } else {
    return TagStatusEnum.DELETED
  }
})

const [subTitleStyle, tagStyle] = useTheme(props.theme, tagStatus)
</script>

<style lang="scss" scoped>
.tag-wrapper {
  .title,
  .sub-title,
  .delete,
  .select {
    padding: 5px 4px;
  }
}
</style>
