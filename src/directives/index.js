import animation from './animation'

const directives = {
  animation  // 這裡是指令的名稱，需要遵循camelCase命名，並在模板中使用kebab-case形式。
}

// 匯出給main.js掛載
export const customDirectives = {
  /*
    在 Vue.js 中，install 函數是插件系統的核心部分，用於安裝和初始化插件功能。在你提供的代碼中，install 函數具有以下作用：

    ## 插件安裝機制
    當使用 app.use() 註冊插件時，Vue 會自動調用插件對象的 install 方法13。這個 install 方法接收兩個參數：
    - app: Vue 應用實例
    - options: 可選的配置項

    ## 自定義指令註冊
    在你的代碼示例中，install 函數的主要作用是：
    1. 遍歷 directives 對象中的所有指令
    2. 使用 app.directive() 將每個指令註冊到 Vue 應用中

    ## 使用方式
    在 main.js 中可以這樣使用：
    ```
      import { createApp } from 'vue'
      import { customDirectives } from './directives'

      const app = createApp({})
      app.use(customDirectives)
    ```
    這種方式允許你將多個相關的指令打包在一起，並通過一個統一的入口點進行註冊，使代碼組織更加模塊化和可維護(Plugins - Vue.js)
  */
  install(app) {
    Object.entries(directives).forEach(([directiveName, directiveObj]) => {
      app.directive(directiveName, directiveObj)
    })
  }
}