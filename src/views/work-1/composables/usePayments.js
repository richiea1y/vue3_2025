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
        paymentMethod: '1',
        paymentAmount: '0',
        paymentPercentage: '0',
        paymentTerm: '',
        paymentConfirm: false,
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
    state.cardList.unshift({
      paymentMethod: '1',
      paymentAmount: '0',
      paymentPercentage: '0',
      paymentTerm: '',
      paymentConfirm: false,
      PaymnetDeadline: ''
    })
  }

  const removeCard = (index) => {
    state.cardList.splice(index, 1)
  }

  const confirmCard = (index) => {
    state.cardList[index].paymentConfirm = true
    console.log(`### Payment Card ${index}: `)
    console.log(state.cardList[index])
  }

  return {
    state,
    addCard,
    removeCard,
    confirmCard
  }
}