import 'ant-design-vue/dist/antd.css'
import 'virtual:windi-devtools'
import 'virtual:windi.css'
import { createApp } from 'vue'

import App from './App.vue'
import { globalRegister } from './helpers'

const app = createApp(App)

globalRegister(app)

app.mount('#app')
