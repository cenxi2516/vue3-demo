<template>
  <a-input ref="scanInputRef" class="scan-input" />
</template>

<script lang="ts" setup>
import { ref, useTemplateRef, watch } from 'vue'
import { useVisibleInterval } from '@/hooks'
import { useEventListener } from '@vueuse/core'

const emits = defineEmits<{
  (e: 'change', value: string): void
  (e: 'update:value', value: string | undefined): void
}>()

const props = defineProps<{
  visible: boolean
  value: string
}>()

const scanInputValue = ref('')
const scanInputRef = useTemplateRef<HTMLInputElement>('scanInputRef')

const extraKeys = [
  'Shift',
  'Clear',
  'Enter',
  'Meta',
  'Control',
  'Alt',
  'Escape',
  'CapsLock',
  'Tab',
  'Enter',
  'Backspace',
  'Delete',
  'Insert',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12'
]

const { resetInterval, stopInterval } = useVisibleInterval(() => {
  if (!props.visible || !scanInputRef.value) return

  scanInputRef.value?.focus?.()
}, 5e2)

useEventListener(scanInputRef, 'keydown', (e: KeyboardEvent) => {
  e.preventDefault()
  scanInputValue.value += extraKeys.includes(e.key) ? '' : e.key

  emits('update:value', scanInputValue.value.trim())
  emits('change', scanInputValue.value.trim())
  console.log(scanInputValue.value, e.key)
})

watch(
  [() => props.visible, () => props.value],
  () => {
    if (props.visible) {
      resetInterval()

      scanInputValue.value = props.value
      return
    }

    stopInterval()
    scanInputValue.value = ''
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.scan-input {
  cursor: default;
  width: 100%;
  height: 50vh;
  resize: none;

  opacity: 0;

  z-index: -9999;
}
</style>
