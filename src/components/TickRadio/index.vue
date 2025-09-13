<template>
  <div @click="handleClick" class="tick-checkbox" :class="wrapClass">
    <template v-if="props.label">
      <div class="text">{{ props.label }}</div>
      <div class="circle"></div>
    </template>
    <slot v-else name="default" />
  </div>
</template>

<script lang="ts" setup>
import type { TOFTickRadioProps } from './types'
import { useWatchSelected } from './hooks'

const props = withDefaults(defineProps<TOFTickRadioProps>(), {
  selected: false,
  disabled: false
})

const emit = defineEmits<{
  (_e: 'update:selected', _v: boolean): void
  (_e: 'change', _selected: boolean, _value?: any): void
}>()

const { wrapClass } = useWatchSelected(props)

const handleClick = () => {
  if (props.disabled) return

  const selected = !props.selected

  emit('update:selected', selected)
  emit('change', selected, props.value)
}
</script>

<style lang="scss" scoped>
.tick-checkbox {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  column-gap: 10px;
  flex: 0 0 auto;
  max-width: 100%;

  font-size: 16px;
  color: #1c1c1c;
  line-height: 22px;

  cursor: pointer;

  .text {
    flex: 0 0 auto;
  }

  .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex: 0 0 auto;
    width: 18px;
    height: 18px;
    border: 1px solid #898989;
    border-radius: 50%;

    &::before {
      content: '';
      display: flex;
      width: 7px;
      height: 7px;

      border-radius: 50%;
    }
  }

  &.selected {
    .circle {
      border: none;
      background-color: #165dff;

      &::before {
        background-color: #ffffff;
      }
    }

    // 禁用样式
    &.disabled {
      .circle {
        background-color: #c8c9cc;
      }
    }
  }

  // 禁用样式
  &.disabled {
    cursor: not-allowed;
    color: #c8c9cc;

    .circle {
      border-color: #c8c9cc;
    }
  }
}
</style>
