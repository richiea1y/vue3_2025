import { provide, ref } from 'vue'

export const GOODS_KEY = Symbol('goods-filter')

export function useGoodsProvider() {
  // 當前選中的商品類型
  const activeType = ref('')
  // 搜尋關鍵字
  const searchText = ref('')
  // 規格TAG
  const specText = ref('')

  // 提供給子組件更新狀態的方法
  const updateFilter = ({ type, keyword, spec }) => {
    if (type !== undefined) activeType.value = type
    if (keyword !== undefined) searchText.value = keyword
    if (spec !== undefined) specText.value = spec
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