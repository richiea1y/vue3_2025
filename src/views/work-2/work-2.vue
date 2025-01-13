<template>
  <div class="directive">
    <h2>Try scrolling me!</h2>
    <div class="target" v-animation="{ distance: '100px', size: 2, duration: '2s' }"></div>
    <div class="footer"></div>
    <div class="footer"></div>
  </div>
</template>

<script setup>
/** Intersection Observer API 是一種非常有用的 API，可以用來監測元素是否進入或離開畫面
 * 傳統方法 = 你站在馬路上，不停地看每一輛經過的車（持續消耗注意力）
 * Intersection Observer = 你請警衛幫你看，只有特定車輛來才通知你（更有效率）
 *
 * 1. 傳統的 JavaScript 方法：
 * 主要問題：
 * 每次滾動都會觸發事件，造成效能負擔
 * 需要手動計算元素位置
 * 容易造成頁面卡頓（特別是有多個元素需要監聽時）
 *
 * 2. Intersection Observer API：
 * 優點：
 * 瀏覽器自動優化，不會在每次滾動時觸發
 * 更高效的性能表現
 * 更簡潔的程式碼
 * 可以同時監控多個元素而不影響效能
 */
</script>

<style scoped>
.directive {
  width: 100%;
  height: 92vh;
  background-color: #f0f0f0;
  overflow: auto;
  overflow-x: hidden;
  position: relative;
  margin-right: 50px;
}
.directive h2 {
  width: 250px;
  height: 92vh;
  padding-top: 50px;
  font-size: 30px;
  margin: auto;
}
.directive .target {
  width: 150px;
  height: 150px;
  margin: auto;
  background-color: #fedab6;
  opacity: 0;
  position: relative;
  border-radius: 100%;
}
.directive .footer {
  width: 100vw;
  height: 25vh;
  background-color: #f0f0f0;
}
</style>
