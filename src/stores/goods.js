import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getGoodsList } from '@/service/api'

export const useGoodsStore = defineStore('goods', () => {
  // state
  const productList = ref([])

  // getters
  const getProducts = computed(() => {
    return productList.value
  })

  // actions
  const getProductList = async () => {
    try {
      const res = await getGoodsList({
        Page: 0,
        PageLimit: 20
      })
      productList.value = res.data.Data
    } catch (error) {
      console.error(error)
    }

  }

  return {
    productList,
    getProducts,
    getProductList
  }
})