import { Decimal } from 'decimal.js';
import { ref, computed } from 'vue';

export default function useFormatter(initialValue = '0') {
  // 內部狀態
  const inputValue = ref(initialValue);

  // 格式化數字（添加千位分隔符）
  const formatNumber = (val) => {
    const unformatInput = unformatNumber(val);
    return `${unformatInput}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // 1. \B - 這是一個邊界匹配符，但與 \b 相反。會匹配：
    // * \B 會匹配 "1|2|3|4|5|6|7" 中間的所有位置，因為這些位置的兩側都是數字。
    // * 單詞字符和非單詞字符之間的位置
    // * 字符串開始和結束的位置（如果緊鄰的是單詞字符）。也就是說，它匹配的位置前後都是數字。

    // 2. (?=...) - 這是一個正向前瞻斷言，它不消耗字符，只用來判斷當前位置後面的字符是否滿足特定模式。它匹配一個位置，這個位置後面跟著指定的模式。也就是說，它匹配的位置前面是一個數字，後面是三個數字。
    // 跟其他種類的斷言比較：
    // * (?=...) 正向前瞻：後面必須是...
    // * (?!...) 負向前瞻：後面不能是...
    // * (?<=...) 正向後顧：前面必須是...
    // * (?<!...) 負向後顧：前面不能是...

    // 3. (\d{3})+ - 匹配一個或多個由三個數字組成的組合：
    // * \d 匹配任何數字
    // * {3} 表示精確匹配三個數字
    // * + 表示一個或多個這樣的三位數組

    // 4. (?!\d) - 這是一個負向前瞻斷言，確保這個位置後面不能再有數字。
    // * 它不消耗字符，只用來判斷當前位置後面的字符是否不滿足特定模式。
    // * 它匹配一個位置，這個位置後面不跟著指定的模式。也就是說，它匹配的位置前面是一個數字，後面不是三個數字。

    // 5. g - 全局匹配標誌，會匹配所有符合的位置，而不是第一個符合的位置。
  };


  // 移除非數字字符
  const unformatNumber = (str) => {
    return str.replace(/[^\d]/g, '');
  };

  // 處理輸入邏輯
  const handleInput = (event) => {
    // 1. 首先移除所有非數字字符
    let value = unformatNumber(event);
    // 2. 如果沒有值（空字串），設為 '0'
    if (!value) {
      inputValue.value = '0';
      return;
    }
    // 3. 移除前導零
    value = value.replace(/^0+/, '');
    // 4. 如果結果為空（全是零的情況）則設為 '0'，否則使用處理後的值
    inputValue.value = value || '0';
  };

  // 處理失焦事件
  const handleBlur = () => {
    if (!inputValue.value) {
      inputValue.value = '0';
    }
  };

  // 格式化總金額輸入顯示值
  const displayInputValue = computed(() => {
    const num = inputValue.value;
    return num ? `$ ${formatNumber(num)}` : '$ 0';
  });

  // 格式化顯示值
  const displayValue = computed(() => {
    const num = inputValue.value;
    return num ? `${formatNumber(num)}` : '0';
  });

  // 實際數值（用於計算）
  const actualValue = computed(() => {
    return Number(inputValue.value);
  });

  return {
    inputValue,
    displayInputValue,
    displayValue,
    actualValue,
    handleInput,
    handleBlur,
    formatNumber,
    unformatNumber
  };
}