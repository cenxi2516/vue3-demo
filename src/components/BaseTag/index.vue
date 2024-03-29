<template>
  <a-tag v-if="tagVisible" class="select-none" style="padding: 0; line-height: 1" :style="tagStyle">
    <a-popconfirm
      v-bind="{ ...TAG_CONFIRM_POP_DEFAULT_PROPS, ...props.popConfirmProps }"
      :visible="props.delConfirm && popVisible"
      @confirm="handleDelete"
      @cancel="switchPopConfirm(false)"
    >
      <div class="tag-wrapper flex items-center" @click="handleSelect">
        <a-tooltip
          v-model:visible="tooltipVisible"
          @visibleChange="handleTooltipVisibleChange"
          v-bind="{ ...TAG_TOOLTIP_DEFAULT_PROPS, ...props.tooltipProps }"
          :title="props.title"
        >
          <div ref="titleRef" class="title">
            <span>{{ props.title }}</span>
          </div>
        </a-tooltip>
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
import type { PopconfirmProps, TooltipProps } from 'ant-design-vue'
import { throttle } from 'lodash-es'
import { computed } from 'vue'
import {
  DEFAULT_MAX_BYTE,
  OTHER_COMPANY_SIGN,
  TAG_CONFIRM_POP_DEFAULT_PROPS,
  TAG_TOOLTIP_DEFAULT_PROPS
} from './consts'
import { useTagDelete, useTagPopConfirm, useTagTheme, useTitleEllipsis } from './hooks'
import { PresetThemeEnum, TagStatusEnum, type TConfirmDeleteFn, type TTheme } from './types'

type TTagProps = {
  title: string
  theme?: TTheme
  isOtherCompany?: boolean
  canSelected?: boolean
  canDeleted?: boolean
  selected?: boolean
  delConfirm?: boolean
  limitByte?: number
  popConfirmProps?: PopconfirmProps
  tooltipProps?: TooltipProps
}

const props = withDefaults(defineProps<TTagProps>(), {
  theme: PresetThemeEnum.GUEST,
  isOtherCompany: false,
  canSelected: false,
  canDeleted: false,
  selected: false,
  delConfirm: false,
  limitByte: DEFAULT_MAX_BYTE
})

const emit = defineEmits<{
  (e: 'delete', confirmDelete: TConfirmDeleteFn): void
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

const [subTitleStyle, tagStyle] = useTagTheme(props, tagStatus)

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

  props.delConfirm && !popVisible.value ? switchPopConfirm(true) : emit('delete', confirmDelete)
}

const [tooltipVisible, titleRef, handleTooltipVisibleChange] = useTitleEllipsis(props)
</script>

<style lang="scss" scoped>
.tag-wrapper {
  .title,
  .sub-title {
    padding: 5px 4px;
  }

  .title {
    box-sizing: content-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
  }

  .delete,
  .select {
    margin: 5px 4px;
    font-size: 10px;
    margin-left: 0;
  }
}
</style>
<style lang="scss">
.base-tag-tooltip {
  .ant-tooltip-inner {
    border-radius: 5px;
  }
}
</style>
