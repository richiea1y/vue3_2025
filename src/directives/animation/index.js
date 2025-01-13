
/** Hook 參數 (el, binding, vnode)
 * el: 指令所綁定的元素，可以用來操作 DOM 元素：設置樣式、綁定事件、Observer 等、處理動畫效果
 * binding：如果之後想擴展功能可能會用到：可以傳入自定義參數、可以調整動畫效果、可以設置觀察器的選項、可以修改觸發條件
 * vnode：Vue 編譯生成的虛擬節點，可以用來操作 DOM 元素。在這個案例中不需要，因為：我們只需要處理 DOM 元素層面的操作、不需要訪問組件實例、不需要處理虛擬 DOM 相關的操作
 */

const scrollAnimation = {
  /** mounted: 我們需要在這裡寫的原因是 (mounted 是你進入房間開始使用時的設置（打開電燈、開冷氣）)
   * 這是元素被掛載到 DOM 後的第一個時機點
   * 我們需要實際的 DOM 元素來：
      * 1. 設置初始樣式（opacity、transform 等） 
      * 2. 創建 Intersection Observer
      * 3. 開始觀察元素
   * 在這之前（比如 created）元素還不存在，無法做這些操作
  */
  mounted(el, binding) {
    // console.log(binding.value)      // 指令的值
    // console.log(binding.arg)        // 指令的參數
    // console.log(binding.modifiers)  // 指令的修飾符
    // console.log(binding.instance)   // 使用指令的組件實例
    // console.log(binding.oldValue)   // 之前的值（僅在 updated 鉤子中有用）

    // 1. 創建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 2. 處理元素進入/離開視圖
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        } else {
          // 元素離開視圖
          el.style.opacity = '0'
          el.style.transform = 'translateY(60px)'
        }
      })
    },
      {
        // 3. 設置觀察器選項
        threshold: 0.1, // 當元素 10% 進入視圖時觸發
        rootMargin: '0px 0px -60px 0px' // 從底部往上 60px 開始觸發
      }
    )
    // 4. 設置初始樣式
    el.style.transition = 'all 0.5s ease-in-out'  // 當 opacity 和 transform 這些屬性發生變化時，不要立即改變，而是用 0.5 秒的時間平滑過渡
    el.style.opacity = '0'                        // 一開始是隱藏的
    el.style.transform = 'translateY(60px)'       // 一開始是向下偏移 60px

    // 5. 開始觀察元素
    observer.observe(el)
  },

  /** unmounted: 我們需要在這裡清理的原因是 (unmounted 是你離開房間時的清理（關燈、關冷氣）)
   * 避免記憶體洩漏
   * 當元素被移除時，需要
   * 1. 停止觀察該元素
   * 2. 清理 Intersection Observer 實例 如果不清理，observer 會一直存在記憶體中，直到頁面被關閉
   */
  unmounted(el) { },

  /** 其他鉤子（如 created、updated）不需要是因為：
   * created: 元素還沒有被創建，無法操作 DOM
   * updated: 元素更新時不需要重新設置觀察器
   * beforeMount: 元素還沒有實際掛載到 DOM，無法操作
   * beforeUpdate/beforeUnmount: 這些階段不需要特別處理
   */
}

export default scrollAnimation