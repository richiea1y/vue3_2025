<template>
  <div class="p-4">
    <h1 class="text-xl">{{ goodsStore.productDetail.Name }}</h1>
    <p class="text-lg my-2">{{ `${route.meta.title} (ID: ${route.params.id})` }}</p>
    <el-image
      style="width: 100px; height: 100px"
      :src="goodsStore.goodsImgs[0]"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="goodsStore.goodsImgs"
      :initial-index="4"
      fit="cover"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import GoodsCard from './components/goodsCard.vue';
import { useGoodsProvider } from './composables/useGoodsProvider';
import { useGoodsStore } from '@/stores/goods';
import { useRoute } from 'vue-router';

const route = useRoute();

const goodsStore = useGoodsStore();

const { activeType, searchText, specText } = useGoodsProvider();

const postData = ref({
  id: Number(route.params.id),
  page: 0,
  pageLimit: 1,
  goodsName: '',
  goodsType: 0
});

onMounted(async () => {
  await nextTick();
  goodsStore.getProductDetail(postData.value);
});
</script>
