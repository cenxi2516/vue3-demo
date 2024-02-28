<script setup lang="ts">
import { getContainer } from '@/utils'
import CurdTable from '@/views/CurdTable.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ref } from 'vue'

const activeKey = ref('1')
</script>

<template>
  <a-config-provider :locale="zhCN" :getPopupContainer="getContainer">
    <div class="p-4">
      <a-tabs v-model:activeKey="activeKey" class="px-10">
        <a-tab-pane key="1" tab="CURD表格">
          <curd-table />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </div>
  </a-config-provider>
</template>

<style lang="scss" scoped>
#app {
  font-family: 微软雅黑, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
