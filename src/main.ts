import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/css/index.less'
import router from './router'
import pinia from './store'
import { registryIcons } from '@/global'

const app = createApp(App)
app.use(registryIcons)
app.use(pinia)
app.use(router)
app.mount('#app')
