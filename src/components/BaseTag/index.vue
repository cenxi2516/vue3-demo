<template>
  <a-tag v-if="tagVisible" class="select-none" style="padding: 0; line-height: 1" :style="tagStyle">
    <a-popconfirm
      v-bind="{ ...TagPopConfirmDefaultProps, ...props.popConfirmProps }"
      title="Are you sure delete this task?"
      ok-text="Yes"
      cancel-text="No"
      :visible="props.delConfirm && popVisible"
      @confirm="handleDelete"
      @cancel="switchPopConfirm(false)"
    >
      <div class="tag-wrapper flex items-center" @click="handleSelect">
        <div class="title">
          {{ props.title }}
        </div>
        <div v-if="props.isOtherCompany" class="sub-title" :style="subTitleStyle">
          {{ OTHER_COMPANY_SIGN }}
        </div>
        <div
          v-else-if="props.canDeleted"
          class="delete cursor-pointer"
          @click.stop.prevent="handleDelete"
        >
          <close-outlined />
        </div>
        <div class="select" v-show="isShowSelected">
          <check-outlined />
        </div>
      </div>
    </a-popconfirm>
  </a-tag>
</template>

<script setup lang="ts">
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { throttle } from 'lodash-es'
import { computed } from 'vue'
import { OTHER_COMPANY_SIGN, TagPopConfirmDefaultProps } from './consts'
import { useTagDelete, useTagPopConfirm, useTagTheme } from './hooks'
import { PresetThemeEnum, TagStatusEnum, type TConfirmDeleteFn, type TTagProps } from './types'

const props = withDefaults(defineProps<TTagProps>(), {
  theme: PresetThemeEnum.GUEST,
  isOtherCompany: false,
  canSelected: false,
  canDeleted: false,
  selected: false,
  delConfirm: false
})

const emit = defineEmits<{
  (e: 'delete', title: string, confirmDelete: TConfirmDeleteFn): void
  (e: 'select', selected: boolean, title: string): void
  (e: 'update:selected', selected: boolean): void
}>()

const tagStatus = computed(() => {
  const { isOtherCompany, canSelected, canDeleted, selected } = props
  if (isOtherCompany) {
    return TagStatusEnum.READONLY
  } else if (canDeleted) {
    return TagStatusEnum.DELETED
  } else if (canSelected && selected) {
    return TagStatusEnum.SELECTED
  } else {
    return TagStatusEnum.READONLY
  }
})

const isShowSelected = computed(() => !props.canDeleted && props.canSelected && props.selected)

const [subTitleStyle, tagStyle] = useTagTheme(props.theme, tagStatus)

const [popVisible, switchPopConfirm] = useTagPopConfirm()

const handleSelect = throttle(() => {
  const { canSelected, selected, title } = props

  if (canSelected && [TagStatusEnum.READONLY, TagStatusEnum.SELECTED].includes(tagStatus.value)) {
    emit('select', !selected, title)
    emit('update:selected', !selected)
  }
}, 3e2)

const [tagVisible, confirmDelete] = useTagDelete()

const handleDelete = async () => {
  if (tagStatus.value !== TagStatusEnum.DELETED) return

  switchPopConfirm(true)
  emit('delete', props.title, confirmDelete)
}
</script>

<style lang="scss" scoped>
.tag-wrapper {
  .title,
  .sub-title {
    padding: 5px 4px;
  }

  .delete,
  .select {
    margin: 5px 4px;
    font-size: 10px;
    margin-left: 0;
  }
}
</style>
