import { ref, reactive, computed } from 'vue'

export default function usePayments(prop, emit) {
  // Use reactive instead of ref for nested objects
  // ref wraps the value in a .value property
  // For nested objects, ref creates a reactive wrapper only at the top level 
  // reactive creates deep reactivity for all nested properties
  const state = reactive({
    total: 0, // 總金額
    cardList: [
      {
        id: Date.now(),
        paymentMethod: '1',
        paymentAmount: 0,
        paymentConfirm: false,
      }
    ],
    paymentFinished: false, // 是否付清總金額
    currentPayment: 0, // 當前付款金額
    overPayment: '', // 要付金額之差額
    overPercentage: '', // 要付金額之百分比
    payState: '', //試算當前所有輸入框裡所有金額之付款狀態
    confirmCount: 0, //確認所有輸入框裡所有金額之付款狀態
  })

  // 卡片操作
  const addCard = () => {
    state.cardList.unshift({
      id: Date.now(),
      paymentMethod: '1',
      paymentAmount: 0,
      paymentConfirm: false,
    })
    console.table(state.cardList)
  }

  const removeCard = (index) => {
    state.cardList.splice(index, 1)
    console.table(state.cardList)
  }

  const updateCardPayment = (index, paymentCard) => {
    //                         ↑        ↑
    //                       索引值    對應到父組件的 $event
    // 更新對應卡片的資料
    state.cardList[index] = {
      ...state.cardList[index], // 保留原本卡片的所有資料
      ...paymentCard,           // 用新的資料覆蓋原本的資料，paymentCard 已經包含了 paymentConfirm
      // paymentConfirm: true      // 額外設定確認狀態
    };

    console.log(paymentCard);
    console.table(state);

    // 可以在這裡添加其他相關的業務邏輯
    updatePaymentAmount
  };

  const updatePaymentAmount = (index) => {
    state.currentPayment += state.cardList[index].paymentAmount;
  };

  return {
    state,
    addCard,
    removeCard,
    updateCardPayment
  }
}