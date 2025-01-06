import { ref, reactive, computed } from 'vue'

export default function usePayments(prop, emit) {
  const state = reactive({
    total: 0, // 總金額
    cardList: [
      {
        paymentMethod: '1',
        paymentAmount: '0',
        paymentPercentage: '0',
        paymentTerm: '',
        PaymnetDeadline: ''
      }
    ],
    paymentFinished: false, // 是否付清總金額
    currentPayment: '', // 當前付款金額
    overPayment: '', // 要付金額之差額
    overPercentage: '', // 要付金額之百分比
    payState: '', //試算當前所有輸入框裡所有金額之付款狀態
  })

  const addCard = () => {
    state.cardList.push({
      paymentMethod: '1',
      paymentAmount: '0',
      paymentPercentage: '0',
      paymentTerm: '',
      PaymnetDeadline: ''
    })
  }

  const removeCard = (index) => {
    state.cardList.splice(index, 1)
  }

  return {
    state,
    addCard,
    removeCard
  }
}