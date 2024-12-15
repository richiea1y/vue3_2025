<template>
  <div class="payment-card-container">
    <!-- Card header -->
    <div class="payment-card-header">
      <div class="payment-method-container">
        <p>支付方式</p>
        <div class="payment-method-radio">
          <input type="radio" name="cash" id="cash" checked>
          <label for="cash">現金</label>
        </div>
        <div class="payment-method-radio">
          <input type="radio" name="credit-card" id="credit-card">
          <label for="credit-card">信用卡</label>
        </div>
      </div>
      <div class="remain-balance">
        <p>未付款</p>
        <button>確認付款</button>
      </div>
      <button class="delete-card-bt" @click="$emit('remove-card')">x</button>
    </div>
    <!-- Card content -->
    <div class="payment-card-content">
      <div class="payment-amount">
        <p>金額（整數）</p>
        <input type="text" placeholder="輸入支付金額">
        <label for="">缺 45,500</label>
      </div>
      <div class="payment-percentage">
        <p>所佔百分比</p>
        <input type="text" placeholder="輸入支付金額"> %
      </div>
      <div class="payment-deadline">
        <p>最晚付款日</p>
        <input type="date" placeholder="輸入支付金額">
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['remove-card']);
</script>

<style scoped>
.payment-card-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border: 1px solid #e4e4e4;
  background-color: #e4e4e4;
  border-radius: 5px;
  margin: 1.3rem 0;
}

.payment-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.payment-method-container {
  display: flex;
  flex-direction: row;
  width: 330px;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
}

.payment-method-radio {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  margin: 0 10px;
}

.payment-method-container p {
  margin-right: 35px; /* 增加這個值來調整間距 */
}

.payment-method-radio label {
  margin-left: 10px; /* 調整這個數值來改變間距 */
}

.remain-balance {
  display: flex;
  justify-content: space-between; /* 改為 space-between */
  align-items: center;
  padding: 10px 20px; /* 增加左右padding */
  min-width: 250px; /* 設定最小寬度 */
  margin-left: 20px; /* 與左邊支付方式區塊保持距離 */
}

/* 為按鈕添加間距 */
.remain-balance button {
  padding: 5px 14px; /* 按鈕內部間距 */
  border: 1px solid rgb(255, 96, 96);
  border-radius: 5px;
  color: rgb(255, 96, 96);
  background-color: rgba(255, 96, 96, 0.1);
}

.delete-card-bt {
  color: rgb(255, 96, 96);
  font-size: 1.4rem;
}

.payment-card-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  gap: 20px; /* 添加間距 */
}

.payment-amount,
.payment-percentage,
.payment-deadline {
  /* flex: 1; 讓每個區塊平均分配空間 */
  display: flex;
  flex-direction: row; /* 內容垂直排列 */;
}

.payment-amount p,
.payment-percentage p,
.payment-deadline p{
  width: 100px; /* 設定固定寬度 */
  margin-right: 10px; /* 調整 p 和 input 之間的間距 */
}

.payment-amount label {
  margin-left: 10px; /* 調整 label 和 input 之間的間距 */
}
</style>