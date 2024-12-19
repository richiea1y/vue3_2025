<template>
  <main class="payment-page">
    <div class="header-container">
      <div class="flex">
        <p class="basis-2/3 content-center text-lg font-medium">支付總金額 :</p>
        <el-input 
          class="w-2 m-2"
          type="text"
          size="large"
          placeholder="輸入需支付的總金額"
          :formatter="formatNumber"
          :parser="unformatNumber"
          v-model="inputTotalPayment" 
        />
      </div>
      <el-button 
        size="large"
        color="#000"
        plain
        @click="addPaymentCard"
      >
        新增支付項目 ＋
      </el-button>
    </div>
    <div class="card-container">
      <PaymentCard 
      v-for="(card, index) in paymentCards"
      :key="index"
      @remove-card="removePaymentCard(index)"
      />
    </div>
    
    <div class="footer-container">
      <div class="payment">
        <h2 class="text-lg">已支付金額</h2>
        <p class="text-lg text-[#bfa965]">0</p>
      </div>
      <div class="total-remain-balance">
        <h2 class="text-lg">付款次數 / 剩餘款項</h2>
        <p class="text-lg text-[#bfa965]" >0</p>
      </div>
      <div class="submit-bt">
        <el-button type="primary" size="large">
          確認送出
        </el-button>
      </div>
    </div>
  </main>
  
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue';
import { Decimal } from 'decimal.js';
import PaymentCard from './components/PaymentCard.vue';
import to from 'await-to-js';

const inputTotalPayment = ref('');
const totalPayment = ref(0);


// 將數字轉換為有千位分隔符的格式
const formatNumber = (num) => {
  return `$ ${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
};

const unformatNumber = (str) => {
  return str.replace(/[^\d]/g, '');
};

watch(inputTotalPayment, (newValue) => {
  // 移除所有非數字字符
  const plainNumber = Number(newValue);
  
  if (plainNumber) {
    // 更新實際數值
    totalPayment.value = Number(plainNumber);
  } else {
    // 如果輸入為空或無效
    totalPayment.value = 0;
  }
  
  console.log('實際數值：', totalPayment.value);
});


// Card operation
const paymentCards = ref([]);
const addPaymentCard = () => {
  paymentCards.value.push({
    id: `${paymentCards.value.length + 1}`,
    paymentMethod: true,
    paymentTerm: '',
    paymentMethod: '',
    percentage: '',
    deadline: '',
  });
}

const removePaymentCard = (index) => {
  paymentCards.value.splice(index, 1);
}

// const removePaymentCard = (id) => {
//   const index = paymentCard.value.findIndex((card) => card.id === id);
//   paymentCard.value.splice(index, 1);
// }
// console.log(Date.now());

</script>




<style scoped>
.payment-page {
  background-color: rgb(252, 252, 252);
  color: #000;
  width: 100%;
  min-height: 100vh;
}

.header-container,
.card-container,
.footer-container {
  max-width: 800px;
  margin: 0 auto;
  /* padding: 10px 20px; */
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 10px 1rem;
}


.header-container input {
  padding: 5px;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 5px ;
  text-align: center;
  margin-left: 10px;
}

.card-container {
  padding: 0 10px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 10px;
}

/* .submit-bt button {
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
} */
</style> 