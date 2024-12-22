import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/styles/common/global.scss'
import aosAnimation from '@/directives/aos'
const app = createApp(App)
// 全局注册指令
app.directive('aos',aosAnimation)
app.use(createPinia())
app.use(router)
app.mount('#app')
