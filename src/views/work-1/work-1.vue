<template>
  <!-- 支付總金額輸入 ＆ 新增支付項目 -->
  <main class="payment-page">
    <div class="header-container">
      <div class="flex">
        <p class="basis-2/3 content-center text-lg font-medium">支付總金額 :</p>
        <!-- 當我們使用 v-model 時 -->
        <!-- <input v-model="searchText" /> -->

        <!-- 實際上等同於 -->
        <!--
        <input
          :value="searchText"
          @input="searchText = $event.target.value"
        />
        -->
        <el-input class="w-2 m-2" type="text" size="large" v-model="state.total" @change="onTotalPaymentChange" />
      </div>
      <el-button size="large" color="#000" plain @click="addCard"> 新增支付項目 ＋ </el-button>
    </div>

    <!-- 子組件：付款資訊 -->
    <div class="card-container">
      <PaymentCard
        v-for="(card, index) in state.cardList"
        :key="card.id"
        :state="state"
        :card-data="card"
        :card-index="index"
        @remove-card="removeCard(index)"
        @confirm-payment="updateCardPayment(index, $event)"
      />
      <!--                                   ↑        ↑           -->
      <!--                                 索引值   子組件發送的資料 -->
    </div>

    <!-- 總金額、付款次數、剩餘款項 -->
    <div class="footer-container">
      <div class="payment">
        <h2 class="text-lg">已支付金額</h2>
        <p class="text-lg text-[#bfa965]">{{ state.currentPayment }}</p>
      </div>
      <div class="total-remain-balance">
        <h2 class="text-lg">付款次數 / 剩餘款項</h2>
        <p class="text-lg text-[#bfa965]">
          {{ state.cardList.filter(card => card.paymentConfirm).length }} / {{ state.cardList.length }}
        </p>
      </div>
      <div class="submit-bt">
        <el-button type="primary" size="large" disabled> 確認送出 </el-button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from 'vue';
import PaymentCard from './components/PaymentCard.vue';
import usePayments from './composables/usePayments';

// 這是 JavaScript 的解構賦值（Destructuring Assignment）語法中的重命名功能
// 冒號的作用是重命名：
// * 冒號左邊：是原始名稱（useFormatter 返回的屬性名）
// * 冒號右邊：是你想要使用的新名稱

const { state, addCard, removeCard, updateCardPayment } = usePayments();

const onTotalPaymentChange = () => {
  console.log('### totalPayment:', state.total);
};
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
  margin: 5px;
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
