import type { DefaultOptionType, Indexable, TOFTickRadioGroupProps, TSelectedSet } from '../types'
import { computed, ref, watch } from 'vue'

export const useWatchRadioItemSelected = (props: TOFTickRadioGroupProps) => {
  const selectedSet = ref<TSelectedSet>({})

  const uniqueOptionsList = computed(() => {
    const optionValues = new Set()
    const optionList = [] as (DefaultOptionType & Indexable)[]
    props.options?.forEach((item) => {
      if (!optionValues.has(item.value)) {
        optionValues.add(item.value)
        optionList.push(item)
      }
    })

    return optionList
  })

  const isExistSelected = computed(() =>
    Array.from(new Set(Object.values(selectedSet.value))).some(Boolean)
  )

  watch(
    [() => props.value, () => props.options],
    () => {
      uniqueOptionsList.value.forEach((item) => {
        const isSelected = ref(false)

        if (props.multiple) {
          isSelected.value = props.value?.includes(item.value)
        } else {
          isSelected.value = props.value === item.value
        }

        // @ts-ignore
        selectedSet.value[item.value] = isSelected
      })
    },
    {
      immediate: true
    }
  )

  return {
    selectedSet,
    uniqueOptionsList,
    isExistSelected
  }
}
