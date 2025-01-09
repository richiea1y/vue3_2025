import { ref, reactive, computed } from 'vue'

export default function usePayments(prop, emit) {
  // Use reactive instead of ref for nested objects
  // ref wraps the value in a .value property
  // For nested objects, ref creates a reactive wrapper only at the top level 
  // reactive creates deep reactivity for all nested properties
  const state = reactive({
    total: 0, // 總金額
    // 是否付清總金額 - computed
    paymentFinished: computed(() =>
      state.currentPayment === state.total
    ),
    // 當前付款金額 = 所有卡片的付款金額總和
    currentPayment: computed(() => paymentCards.value.reduce((acc, card) => acc + Number(card.paymentAmount), 0)),
    // 超付金額 - computed
    overPayment: computed(() => {
      const diff = state.currentPayment - state.total;
      return diff > 0 ? diff : 0;
    }),
    // 超付百分比 - computed
    overPercentage: computed(() => {
      if (!state.total) return 0;
      return new Decimal(state.overPayment)
        .div(state.total)
        .times(100)
        .toFixed(2);
    }),
    // 付款狀態 - computed
    payState: computed(() => {
      if (state.overPayment > 0) return 'overpaid';
      if (state.paymentFinished) return 'completed';
      if (state.currentPayment > 0) return 'partial';
      return 'unpaid';
    }),
    // 已確認付款的卡片數量 - computed
    confirmCount: computed(() =>
      paymentCards.value.filter(card => card.paymentConfirm).length
    )
  })

  const paymentCards = ref([
    {
      id: Date.now(),
      paymentCardIndex: 0,
      paymentMethod: '1',
      paymentAmount: 0,
      paymentConfirm: false,
    }
  ])

  // 卡片操作

  // 新增卡片
  const addCard = () => {
    paymentCards.value.unshift({
      id: Date.now(),
      paymentCardIndex: paymentCards.value.length,
      paymentMethod: '1',
      paymentAmount: 0,
      paymentConfirm: false,
    })
    updateCardIndexes();
    console.table(paymentCards.value)
  }

  // 移除卡片
  const removeCard = (index) => {
    paymentCards.value.splice(index, 1)
    updateCardIndexes();
    console.table(paymentCards.value)
  }

  // 更新卡片索引
  const updateCardIndexes = () => {
    paymentCards.value.forEach((card, i) => {
      card.paymentCardIndex = i;
    });
  };

  // 即時更新卡片金額
  const updateAmount = ({ id, paymentAmount }) => {
    const cardIndex = paymentCards.value.findIndex(card => card.id === id);
    if (cardIndex !== -1) {
      paymentCards.value[cardIndex] = {
        ...paymentCards.value[cardIndex],
        paymentAmount
      };
    }
    console.log('### currentPayment: ', state.currentPayment)
  };

  // 即時更新卡片付款方式
  const updatePaymentMethod = ({ id, paymentMethod }) => {
    const cardIndex = paymentCards.value.findIndex(card => card.id === id);
    if (cardIndex !== -1) {
      paymentCards.value[cardIndex] = {
        ...paymentCards.value[cardIndex],
        paymentMethod
      };
    }
  };

  //  更新付款確認狀態
  const updatePaymentConfirm = ({ id, paymentConfirm }) => {
    const cardIndex = paymentCards.value.findIndex(card => card.id === id);
    if (cardIndex !== -1) {
      paymentCards.value[cardIndex] = {
        ...paymentCards.value[cardIndex],
        paymentConfirm
      };
    }
  };

  return {
    state,
    paymentCards,
    addCard,
    removeCard,
    updateAmount,
    updatePaymentMethod,
    updatePaymentConfirm
  }
}