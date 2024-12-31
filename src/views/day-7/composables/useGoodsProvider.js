import { provide, ref } from 'vue'

export const GOODS_KEY = Symbol('goods-filter')

export function useGoodsProvider() {
  // 當前選中的商品類型
  const activeType = ref('')
  // 搜尋關鍵字
  const searchText = ref('')
  // 規格TAG
  const specText = ref('')


  // 策略對象
  const filterStrategies = {
    type: (value) => activeType.value = value,
    keyword: (value) => searchText.value = value,
    spec: (value) => specText.value = value
  }

  // 提供給子組件更新狀態的方法
  const updateFilter = ({ type, keyword, spec }) => {
    type !== undefined && filterStrategies.type(type)
    keyword !== undefined && filterStrategies.keyword(keyword)
    spec !== undefined && filterStrategies.spec(spec)
  }

  provide(GOODS_KEY, {
    activeType,
    searchText,
    specText,
    updateFilter
  })

  return {
    activeType,
    searchText,
    specText,
  }
}