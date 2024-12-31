import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getGoodsList } from '@/service/api'

export const useGoodsStore = defineStore('goods', () => {
  // state
  const productList = ref([])
  const productDetail = ref({})
  const goodsImgs = ref([])

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

  const imgPath = 'https://nocodenolife.net/fortes/imgs/'

  const getProductDetail = async (data) => {
    try {
      const res = await getGoodsList({
        ID: data.id,
        Page: data.page,
        PageLimit: data.pageLimit,
        GoodsName: data.goodsName,
        GoodsType: data.goodsType
      })
      productDetail.value = res.data.Data
      goodsImgs.value = res.data.Data.ImageUrls.map(item => `${imgPath}${item.Url}`)
      console.log('### goods detail: ', productDetail.value)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    productList,
    productDetail,
    getProducts,
    goodsImgs,
    getProductList,
    getProductDetail
  }
})

/**
 {
  "ID": 1,
  "DeletedAt": null,
  "CreatedAt": 1655905959,
  "Name": "SONY PS5 數位版主機",
  "Show": true,
  "GoodsTypeID": 3,
  "GoodsType": {
    "ID": 3,
    "DeletedAt": null,
    "CreatedAt": 1655905802,
    "Name": "主機/遊戲/娛樂",
    "Alias": "GAMES"
  },
  "SpecsAllowance": 1,
  "GoodsSpecs": [
    {
      "ID": 1,
      "DeletedAt": null,
      "CreatedAt": 1655905959,
      "GoodsID": 1,
      "Specs": "1TB"
    },
    {
      "ID": 2,
      "DeletedAt": null,
      "CreatedAt": 1655905959,
      "GoodsID": 1,
      "Specs": "2TB"
    }
  ],
  "UnitPrice": 16800,
  "ImagesIdnet": "sony-ps5-digital",
  "ImageUrls": [
    {
      "ID": 1,
      "DeletedAt": null,
      "CreatedAt": 1655905952,
      "Ident": "sony-ps5-digital",
      "Url": "95dd73a9-1ca8-4819-8488-ed23a43d9643.webp"
    },
    {
      "ID": 7,
      "DeletedAt": null,
      "CreatedAt": 1657100575,
      "Ident": "sony-ps5-digital",
      "Url": "5301fef1-d8dc-4e3a-8c56-b88c16a2b806.png"
    }
  ],
  "Description": ""
}
 */