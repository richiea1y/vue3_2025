<template>
  <div class="directive">
    <h2>Try scrolling me!</h2>
    <div class="target" v-animation="{ distance: '100px', size: 2, duration: '2s' }"></div>
    <div class="footer"></div>
    <div class="footer"></div>
  </div>
</template>

<script setup></script>

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
