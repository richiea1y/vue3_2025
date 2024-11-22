<template>
  <div class="app-container">
    <h1>Vue 3.5 生命週期完整示例</h1>

    <!-- 控制面板 -->
    <div class="control-panel">
      <button @click="toggleComponent">切換組件顯示: {{ currentComponent }}</button>
      <button @click="toggleKeepAlive">Keep-Alive: {{ isKeepAlive ? '開啟' : '關閉' }}</button>
    </div>

    <!-- 日誌面板 -->
    <div class="log-panel">
      <h3>事件日誌:</h3>
      <div class="logs">
        <div v-for="(log, index) in logs" :key="index" :class="log.type">
          {{ log.message }}
        </div>
      </div>
      <button @click="clearLogs">清除日誌</button>
    </div>

    <!-- 組件展示區 -->
    <div class="component-display">
      <keep-alive v-if="isKeepAlive">
        <component :is="currentComponent"></component>
      </keep-alive>
      <component v-else :is="currentComponent"></component>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, provide } from 'vue';
import ComponentA from './components/componentA.vue';
import ComponentB from './components/componentB.vue';

// 狀態管理
const currentComponent = shallowRef('ComponentA');
const isKeepAlive = ref(true);
const logs = ref([]);

// 方法
const toggleComponent = () => {
  currentComponent.value = currentComponent.value === 'ComponentA' ? 'ComponentB' : 'ComponentA';
};

const toggleKeepAlive = () => {
  isKeepAlive.value = !isKeepAlive.value;
};

const addLog = (message, type = 'info') => {
  logs.value.unshift({
    message: `${new Date().toLocaleTimeString()} - ${message}`,
    type
  });
};

const clearLogs = () => {
  logs.value = [];
};

// 提供給子組件的方法
provide('addLog', addLog);
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.control-panel {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.log-panel {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.logs {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  background: #f5f5f5;
}

.info {
  color: #2c3e50;
}
.mounted {
  color: #42b983;
}
.unmounted {
  color: #e74c3c;
}
.updated {
  color: #3498db;
}
.activated {
  color: #f39c12;
}
.deactivated {
  color: #8e44ad;
}
</style>
