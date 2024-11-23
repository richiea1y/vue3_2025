<template>
  <div class="text-xl text-color-white">
    Day-1: Lifecircle
    <el-button type="primary" @click="router.push({ name: 'day-1' })">check</el-button>
  </div>
  <el-input v-model="checkRef[0].isRef" type="text" @change="onInputChange($event)" />

  <div>{{ `computed: ${calcRef}` }}</div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const checkRef = ref([{ isRef: 'is ref!!' }]);
const checkReactive = reactive({ isReactive: 'is reactive!!' });

const calcRef = computed(() => {
  return checkRef.value[0].isRef + new Date().getTime();
});

const onInputChange = e => {
  console.log('onInputChange', e, calcRef.value);
};

onMounted(() => {
  console.log('checkRef', checkRef.value[0], checkRef);
  console.log('checkReactive', checkReactive);
});
</script>
