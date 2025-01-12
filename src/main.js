import '@/styles/style.scss'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import SvgIcon from '@/components/SvgIcon.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import { customDirectives } from './directives'

const app = createApp(App)

/**
 * ## 先安裝核心功能 → 再安裝擴展功能 → 最後處理 UI 相關的配置
 * 1. app.use(createPinia()) 和 app.use(router) 是安裝核心插件，這些通常需要最先設置，因為：
    * Pinia（狀態管理）和 Router（路由）是應用的基礎架構
    * 其他功能可能會依賴於這些核心功能
  * 2. app.use(customDirectives) 放在這個位置是因為：
    * 自定義指令是應用的擴展功能
    * 它們可能會用到上面已經安裝的核心功能（如 router 或 store）
    * 如果指令中需要使用到這些核心功能，確保它們已經被安裝很重要
 * 3. Element Plus 圖標的註冊（app.component）放在最後是因為：
    * 這是對 UI 組件的註冊
    * 這些是相對獨立的功能，不太可能依賴其他核心功能
    * 組件註冊通常是最後的配置步驟
 */

app.use(createPinia())
app.use(router)
app.use(customDirectives)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局註冊 SvgIcon 組件，給自定義 icon 使用
// app.component('SvgIcon', SvgIcon);

app.mount('#app')