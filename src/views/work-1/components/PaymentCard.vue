<template>
  <el-card class="p-0 mb-4">
    <!-- Card header -->
    <div class="payment-card-header">
      <div class="paymentMethod flex">
        <p class="text-lg font-medium content-center mr-2">支付方式：</p>
        <el-radio-group >
          <el-radio value="1" label="cash">現金</el-radio>
          <el-radio value="2" label="creditCard">信用卡</el-radio>
        </el-radio-group>
      </div>
      <div class="remain-balance flex">
        <p class="content-center mr-4">未付款</p>
        <el-button color="#90aad4" plain icon="Check">確認付款</el-button>
      </div>
      <el-button 
        type="danger" 
        circle icon="CloseBold"
        plain
        class="delete-card-bt" 
        @click="$emit('remove-card')"
      >
      </el-button>
    </div>
    <!-- Card content -->
    <div class="payment-card-content">
      <div class="payment-amount-form flex max-w-sm">
        <label 
          for="payment-amount" 
          class="mx-5 my-3 content-center min-w-24"
        >
        金額（整數）
        </label>
        <el-input 
          v-model="paymentAmount"
          id="payment-amount" 
          class="max-w-60 min-w-60" 
          name="payment-amount" 
          type="text" 
          placeholder="輸入支付金額"
        />
      </div>
      <div class="payment-percentage-form flex max-w-sm">
        <label 
          for="payment-percentage" 
          class="mx-5 my-3 content-center min-w-24"
        >
        所佔百分比
        </label>
        <el-input
          v-model="paymentPercentage"
          id="payment-percentage" 
          class="max-w-60 min-w-60" 
          name="payment-percentage"  
          type="text" 
          placeholder="輸入支付金額"
        />
        <span class="ml-3 content-center">%</span>
      </div>
      <div class="payment-deadline-form flex max-w-sm">
        <label 
          for="payment-deadline" 
          class="mx-5 my-3 content-center min-w-24"
        >
          最晚付款日
        </label>
        <el-input
          v-model="paymentDeadline"
          id="payment-deadline" 
          class="max-w-60 min-w-60" 
          name="payment-deadline"
          :suffix-icon="Calendar"
        />
      </div>
    </div>
  </el-card>
</template>

<script setup>

import { ref, defineProps, defineEmits, computed } from 'vue';
import { Calendar, Search } from '@element-plus/icons-vue'

const paymentMethod = ref('1');
const paymentAmount = ref('');
const paymentPercentage = ref('');
const paymentDeadline = ref('');

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
  userPaymentTerm: {
    type: String,
    required: true
  },
  userPaymentAmount: {
    type: String,
    required: true
  },
  userPaymentPercentage: {
    type: String,
    required: true
  },
  userPaymentDeadline: {
    type: String,
    required: true
  }
});

defineEmits(['remove-card']);


</script>

<!------- style ------->

<style scoped>

.payment-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.payment-card-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  gap: 20px; /* 添加間距 */
}


</style>