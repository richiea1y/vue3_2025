<template>
  <el-card class="shopping-cart">
    <template #header>
      <div class="flex justify-between items-center">
        <span>Shopping Cart</span>
        <span>{{ formatPrice(totalPrice) }}</span>
      </div>
    </template>
    <template v-if="cartItems.length">
      <div v-for="item in cartItems" :key="item.id" class="my-2">
        <div class="flex justify-between items-center">
          <!-- Product name -->
          <span>{{ item.name }}</span>
          <div class="flex items-center gap-2">
            <el-input-number
              v-model="item.quantity"
              :min="1"
              :max="item.stock"
              @change="emit('update-quantity', item.id, $event)"
            />
            <el-button type="danger" :icon="Delete" circle size="small" @click="emit('remove-item', item.id)" />
          </div>
        </div>
        <div class="text-sm text-gray-600 text-right">Sub Total: {{ formatPrice(getSubtotal(item)) }}</div>
      </div>
    </template>
    <template v-else>
      <el-empty description="Cart is empty!" />
    </template>
  </el-card>
</template>

<script setup>
import { computed } from 'vue';
import { Decimal } from 'decimal.js';
import { Delete } from '@element-plus/icons-vue';

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update-quantity', 'remove-item']);

const totalPrice = computed(() => {
  return props.cartItems.reduce((sum, item) => {
    return new Decimal(sum).plus(new Decimal(item.price).mul(item.quantity)).toNumber();
  }, 0);
});

// 格式化價格顯示方式
const formatPrice = price => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0
  }).format(price);
};

// 單項商品小計
const getSubtotal = item => {
  return new Decimal(item.price).mul(item.quantity).toNumber();
};
</script>
