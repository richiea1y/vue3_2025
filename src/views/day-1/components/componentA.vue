<template>
  <div class="component">
    <h2>組件 A</h2>
    <p>計數器: {{ count }}</p>
    <button @click="increment">增加</button>
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

const count = ref(0);
const addLog = inject('addLog');

// 生命週期鉤子
onBeforeMount(() => {
  addLog('組件A - beforeMount');
});

onMounted(() => {
  addLog('組件A - mounted', 'mounted');
});

onBeforeUpdate(() => {
  addLog('組件A - beforeUpdate');
});

onUpdated(() => {
  addLog('組件A - updated', 'updated');
});

onBeforeUnmount(() => {
  addLog('組件A - beforeUnmount');
});

onUnmounted(() => {
  addLog('組件A - unmounted', 'unmounted');
});

onActivated(() => {
  addLog('組件A - activated', 'activated');
});

onDeactivated(() => {
  addLog('組件A - deactivated', 'deactivated');
});

const increment = () => {
  count.value++;
};
</script>

<style scoped>
.component {
  padding: 20px;
  border: 2px solid #42b983;
  border-radius: 8px;
  margin: 10px 0;
}
</style>
