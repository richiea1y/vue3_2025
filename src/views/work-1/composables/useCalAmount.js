import { ref, computed } from 'vue';

export default function useCalAmount(totalPayment) {


  // 計算差額和百分比
  const calculatePaymentStatus = (currentAmount) => {
    if (!currentAmount || !totalPayment.value) return {
      shortage: 0,
      excess: 0,
      percentage: 0
    };

    const current = Number(currentAmount);
    const total = Number(totalPayment.value);
    const difference = current - total;

    return {
      shortage: difference < 0 ? Math.abs(difference) : 0,
      excess: difference > 0 ? difference : 0,
      percentage: total > 0 ? ((current / total) * 100).toFixed(2) : 0
    };
  };

  // 檢查支付狀態
  // const checkPaymentStatus = computed(() => {
  //   return !!totalPayment.value;
  // });

  return {
    // checkPaymentStatus,
    calculatePaymentStatus
  };
}
// 如果我要寫另一個 composable useCalculateAmount.js 來 computed 反應 input 的值 顯示在卡片對應不同的輸入框內呢