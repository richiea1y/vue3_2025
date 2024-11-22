<!-- componentB.vue -->
<template>
  <div class="component">
    <h2>組件 B</h2>
    <p>文本輸入: {{ text }}</p>
    <input v-model="text" placeholder="輸入一些文字" />

    <div class="message-area">
      <h4>來自父組件的消息: {{ parentMessage }}</h4>
      <input v-model="childMessage" placeholder="輸入要發送給父組件的消息" />
      <div class="button-group">
        <button @click="sendToParent">發送消息到父組件</button>
      </div>
    </div>
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
const childMessage = ref('');
const addLog = inject('addLog');

const props = defineProps({
  parentMessage: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['child-event']);

onBeforeMount(() => {
  addLog('組件B - beforeMount - 組件準備掛載', 'lifecycle');
});

onMounted(() => {
  addLog('組件B - mounted - 組件已掛載完成', 'mounted');
});

onBeforeUpdate(() => {
  addLog('組件B - beforeUpdate - 組件準備更新', 'update');
});

onUpdated(() => {
  addLog('組件B - updated - 組件已更新完成', 'updated');
});

onBeforeUnmount(() => {
  addLog('組件B - beforeUnmount - 組件準備卸載', 'unmount');
});

onUnmounted(() => {
  addLog('組件B - unmounted - 組件已卸載完成', 'unmounted');
});

onActivated(() => {
  addLog('組件B - activated - Keep-alive 組件已啟用', 'activated');
});

onDeactivated(() => {
  addLog('組件B - deactivated - Keep-alive 組件已停用', 'deactivated');
});

const sendToParent = () => {
  if (childMessage.value.trim()) {
    emit('child-event', childMessage.value);
    childMessage.value = '';
  }
};
</script>

<style scoped>
.component {
  padding: 20px;
  border: 2px solid #e74c3c;
  border-radius: 8px;
  margin: 10px 0;
}

.message-area {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
}

.button-group {
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  margin-right: 10px;
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #d44637;
}
</style>
