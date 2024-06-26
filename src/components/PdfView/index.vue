<template>
  <a-spin :spinning="loading">
    <div ref="pdfContainer"></div>
  </a-spin>
</template>

<script lang="ts" setup>
import PDFObject from 'pdfobject'
import { onMounted, onUpdated, ref } from 'vue'

type TPdfObjectProps = {
  url: string
  options?: PDFObject.Options
}

const props = defineProps<TPdfObjectProps>()

const pdfContainer = ref<HTMLDivElement>()
const loading = ref(false)

const initPDF = () => {
  loading.value = true
  const pdf_iframe = PDFObject.embed(props.url, pdfContainer.value, props.options)
  pdf_iframe.addEventListener('load', () => {
    loading.value = false
  })
}

onMounted(initPDF)
onUpdated(initPDF)
</script>

<style lang="scss" scoped></style>
