<template>
  <el-card class="p-0 mb-4">
    <!-- Card header -->
    <div class="payment-card-header">
      <div class="paymentMethod flex">
        <p class="text-lg font-medium content-center mr-2">支付方式：</p>
        <el-radio-group v-model="localPaymentMethod" @change="handlePaymentMethodChange">
          <el-radio value="1" label="cash">現金</el-radio>
          <el-radio value="2" label="creditCard">信用卡</el-radio>
        </el-radio-group>
      </div>
      <div class="remain-balance flex">
        <p class="content-center mr-4">{{ props.cardData.paymentConfirm ? '已付款' : '未付款' }}</p>
        <el-button color="#90aad4" icon="Check" @click="handleConfirmPayment" :disabled="props.cardData.paymentConfirm"
          >確認付款</el-button
        >
      </div>
      <el-button
        v-if="cardIndex !== 0"
        type="danger"
        circle
        icon="CloseBold"
        class="delete-card-bt"
        @click="$emit('remove-card')"
        :disabled="props.cardData.paymentConfirm"
      >
      </el-button>
      <div v-if="cardIndex === 0" class="m-[32] h-[32]"></div>
    </div>
    <!-- Card content -->
    <div class="payment-card-content">
      <!-- 此項支付金額 -->
      <div class="payment-amount-form flex max-w-sm">
        <label for="payment-amount" class="mx-5 my-3 content-center min-w-24"> 金額（整數） </label>
        <el-input
          v-model="localPaymentAmount"
          @input="handleAmountChange"
          id="payment-amount"
          class="max-w-60 min-w-60"
          name="payment-amount"
          type="text"
          :disabled="props.cardData.paymentConfirm"
        />
      </div>
      <div class="amount-hint ml-36 -my-2">
        <p v-if="needToPay > 0" class="text-s text-gray-500">缺: {{ needToPay }} ({{ needToPayPercentage }} %)</p>
        <p v-if="needToSub < 0" class="text-s text-gray-500">超收: {{ needToSub }}</p>
      </div>
      <!-- 此項支付金額百分比 -->
      <div class="payment-percentage-form flex max-w-sm">
        <label for="payment-percentage" class="mx-5 my-3 content-center min-w-24"> 所佔百分比 </label>
        <el-input
          v-model="paymentPercentage"
          id="payment-percentage"
          class="max-w-60 min-w-60"
          name="payment-percentage"
          type="text"
          placeholder="輸入支付金額"
          :disabled="props.cardData.paymentConfirm"
        />
        <span class="ml-3 content-center">%</span>
      </div>
      <!-- 此項支付金額截止日期 -->
      <div class="payment-deadline-form flex max-w-sm">
        <label for="payment-deadline" class="mx-5 my-3 content-center min-w-24"> 最晚付款日 </label>
        <el-input
          id="payment-deadline"
          class="max-w-60 min-w-60"
          name="payment-deadline"
          :suffix-icon="Calendar"
          disabled
        />
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import Decimal from 'decimal.js';
import { Calendar } from '@element-plus/icons-vue';
// import usePayments from '../composables/usePayments';
// const { state } = usePayments();

const props = defineProps({
  state: {
    type: Object
  },
  cardData: {
    // 新增這個 prop
    type: Object,
    required: true
  },
  cardIndex: {
    type: Number
  }
});

const paymentAmount = ref(0);

const localPaymentMethod = ref(props.cardData.paymentMethod || '1');
const localPaymentAmount = ref(props.cardData.paymentAmount);

// 支付項目內容
const needToPay = computed(() => {
  if (!props.state.currentPayment) return 0;
  return props.state.total - props.state.currentPayment;
});

const needToPayPercentage = computed(() => {
  if (!props.state.total || !localPaymentAmount.value) return 0;
  return new Decimal(needToPay.value).div(props.state.total).times(100).toFixed(6);
});

const needToSub = computed(() => {
  return props.state.total - props.state.currentPayment;
});

const paymentPercentage = computed(() => {
  // 如果支付金額為空，則返回 0
  if (!localPaymentAmount.value) {
    return 0;
  }
  const percentageCal = new Decimal(localPaymentAmount.value).div(props.state.total).times(100).toFixed(6);
  return percentageCal;
});

const handleAmountChange = () => {
  emit('update-amount', {
    id: props.cardData.id,
    paymentAmount: Number(localPaymentAmount.value)
  });
};

const handlePaymentMethodChange = () => {
  emit('update-payment-method', {
    id: props.cardData.id,
    paymentMethod: localPaymentMethod.value
  });
};

const handleConfirmPayment = () => {
  // 更新付款狀態
  props.cardData.paymentConfirm = true;
  emit('confirm-payment', {
    id: props.cardData.id,
    paymentConfirm: true
  });
  console.table('### confirm data' + props.cardData);
};

const emit = defineEmits(['remove-card', 'update-amount', 'update-payment-method', 'confirm-payment']);
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
  gap: 20px;
  /* 添加間距 */
}
</style>
