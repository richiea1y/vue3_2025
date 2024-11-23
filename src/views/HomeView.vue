<template>
  <div class="text-xl text-color-white">
    Day-1: Lifecircle
    <el-button type="primary" @click="router.push({ name: 'day-1' })">check</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
