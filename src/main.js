import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/styles/common/global.scss'
import aosAnimation from '@/directives/aos'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)
// 全局注册指令
const pinia = createPinia()
app.directive('aos', aosAnimation)
app.use(pinia)
app.use(router)
pinia.use(piniaPluginPersistedstate)
app.mount('#app')
