<template>
  <div ref="pdfContainer"></div>
</template>

<script lang="ts" setup>
import PDFObject from 'pdfobject'
import { onMounted, ref } from 'vue'
import { useEventListener } from '@vueuse/core'

type TPdfObjectProps = {
  url: string
  options?: PDFObject.Options
}

const props = defineProps<TPdfObjectProps>()
const emit = defineEmits<{
  (e: 'load', v: boolean): void
}>()

const pdfContainer = ref<HTMLDivElement>()

onMounted(() => {
  const pdfIframe = PDFObject.embed(props.url, pdfContainer.value, props.options)
  useEventListener(pdfIframe, 'load', () => emit('load', true))
})
</script>

<style lang="scss" scoped></style>
