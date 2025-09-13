<template>
  <div class="of-tick-radio-group">
    <TickRadio
      v-for="item in uniqueOptionsList"
      :key="JSON.stringify(item.value)"
      :selected="selectedSet[String(item.value)]"
      :value="item.value"
      :label="slot.label ? undefined : item.label"
      :disabled="props.disabled"
      @change="handleRadioChange"
    >
      <slot v-if="slot.label" name="label" v-bind="item">{{ item.label }}</slot>
    </TickRadio>
  </div>
</template>

<script lang="ts" setup>
import type { DefaultOptionType, Indexable, TOFTickRadioGroupProps } from './types'
import TickRadio from '../TickRadio/index.vue'
import { useWatchRadioItemSelected } from './hooks'
import { useSlots } from 'vue'

const props = withDefaults(defineProps<TOFTickRadioGroupProps>(), {
  multiple: false,
  disabled: false,
  required: false
})

const emit = defineEmits<{
  (_e: 'update:value', _v: any | any[]): void
  (_e: 'change', _value: any | any[], _options: DefaultOptionType & Indexable[]): void
  (_e: 'selected', _selected: boolean, _value?: any, _option?: DefaultOptionType & Indexable): void
}>()

const slot = useSlots()

const { selectedSet, uniqueOptionsList, isExistSelected } = useWatchRadioItemSelected(props)

const handleRadioChange = (selected: boolean, value: any) => {
  const changeValue = (newValue: any | any[], curValue: any) => {
    emit('update:value', newValue)
    emit('change', newValue, uniqueOptionsList.value)
    emit(
      'selected',
      selected,
      curValue,
      uniqueOptionsList.value.find((v) => v.value === curValue)
    )
  }

  if (props.multiple) {
    // 多选
    selectedSet.value[value] = selected
    const newValue = [...(props.value ?? [])]

    if (selected) {
      // 添加
      newValue.push(value)
      changeValue(newValue, value)
    } else {
      // 删除
      const index = props.value?.findIndex((v: any) => v === value)
      index > -1 && newValue.splice(index, 1)
      changeValue(newValue, value)
    }

    return
  }

  // === 单选 ===
  // 必需选中一个
  if (props.required) {
    // 不存在选中情况，选中
    if (!isExistSelected.value && selected) return changeValue(value, value)
    // 存在选中情况，1.选中选中项 2.选中其他项
    if (isExistSelected.value && props.value === value) return
    if (isExistSelected.value && props.value !== value) return changeValue(value, value)

    return
  }

  // 可以不选中任何一个
  changeValue(selected ? value : undefined, value)
}
</script>

<style lang="scss" scoped>
.of-tick-radio-group {
  display: flex;
  flex-wrap: wrap;

  column-gap: 40px;
}
</style>
