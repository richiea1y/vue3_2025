<template>
  <main class="payment-page">
    <div class="header-container">
      <div class="header-container-total-amount">
        <header>支付總金額 : </header>
        <input type="text" placeholder="輸入需支付的總金額" v-model="inputTotalPayment">
      </div>
      <button>新增支付項目＋</button>
    </div>
    <div class="card-container">
      <PaymentCard />
    </div>
    
    <div class="footer-container">
      <div class="payment">
        <h2>已支付金額</h2>
        <p>0</p>
      </div>
      <div class="total-remain-balance">
        <h2>付款次數 / 剩餘款項</h2>
        <p>0</p>
      </div>
      <div class="submit-bt">
        <button>確認送出</button>
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
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 移除所有非數字字符
const unformatNumber = (str) => {
  return str.replace(/[^\d]/g, '');
};

watch(inputTotalPayment, (newValue) => {
  // 移除所有非數字字符
  const plainNumber = unformatNumber(newValue);
  
  if (plainNumber) {
    // 更新實際數值
    totalPayment.value = Number(plainNumber);
    
    // 更新顯示格式（但不觸發遞迴）
    const formatted = formatNumber(plainNumber);
    if (formatted !== newValue) {
      inputTotalPayment.value = formatted;
    }
  } else {
    // 如果輸入為空或無效
    totalPayment.value = 0;
    inputTotalPayment.value = '';
  }
  
  console.log('實際數值：', totalPayment.value);
});



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
  padding: 10px 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 10px;
}

.header-container button {
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.header-container-total-amount {
  display: flex;
  align-items: center;
}

.header-container-total-amount input {
  width: 170px;
}

.header-container input {
  padding: 5px;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 5px ;
  text-align: center;
  margin-left: 10px;
}



.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 10px;
}

.submit-bt button {
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style> 