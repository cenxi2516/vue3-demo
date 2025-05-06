import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'
import pluginBasicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9090,
    host: true, // 允许使用本机IP访问
  },
  plugins: [
    pluginBasicSsl(),
    vue(),
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
    WindiCSS()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
