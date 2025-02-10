import { createApp } from 'vue'
// import router from './router'
import ElementPlus from 'element-plus'
import axios from 'axios'
import router from './router'
import 'element-plus/dist/index.css'
import locale from 'element-plus/dist/locale/zh-cn.js'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, {locale})
app.use(router)
app.config.globalProperties.$http = axios
app.mount('#app')
