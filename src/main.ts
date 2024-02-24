import { createApp } from 'vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'

import App from './App.vue'
import { globalRegister } from './helpers'

const app = createApp(App)

globalRegister(app)

app.mount('#app')
