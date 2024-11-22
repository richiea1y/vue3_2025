<template>
  <div class="component">
    <h2>組件 B</h2>
    <p>文本輸入: {{ text }}</p>
    <input v-model="text" placeholder="輸入一些文字" />
  </div>
</template>

<script setup>
import {
  ref,
  inject,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated
} from 'vue';

const text = ref('');
const addLog = inject('addLog');

onBeforeMount(() => {
  addLog('組件B - beforeMount');
});

onMounted(() => {
  addLog('組件B - mounted', 'mounted');
});

onBeforeUpdate(() => {
  addLog('組件B - beforeUpdate');
});

onUpdated(() => {
  addLog('組件B - updated', 'updated');
});

onBeforeUnmount(() => {
  addLog('組件B - beforeUnmount');
});

onUnmounted(() => {
  addLog('組件B - unmounted', 'unmounted');
});

onActivated(() => {
  addLog('組件B - activated', 'activated');
});

onDeactivated(() => {
  addLog('組件B - deactivated', 'deactivated');
});
</script>

<style scoped>
.component {
  padding: 20px;
  border: 2px solid #e74c3c;
  border-radius: 8px;
  margin: 10px 0;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
}
</style>
