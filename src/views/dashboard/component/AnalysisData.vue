<template>
  <a-row type="flex" wrap :gutter="[26, 16]" class="mamb-card-ant">
    <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
      <a-card title="重要历史(1931.09.18-1945.08.15)">
        <ScrollList :scrollList="historyList" />
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
      <a-card title="品牌">
        <AnalysisPie />
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
  import { ref, watch, nextTick, computed } from 'vue';
  import useAppStore from '@/store/module/app.js';
  import { storeToRefs } from 'pinia';
  import { getHistoryList } from '@/api/dashboard.js';
  import ScrollList from '@/components/ScrollList/index.vue';
  import AnalysisPie from './AnalysisPie.vue';

  const appStore = useAppStore();

  const historyList = ref([]);
  const { collapsed } = storeToRefs(appStore);
  watch(
    () => collapsed.value,
    () => {
      nextTick(() => {});
    }
  );

  getHistoryList().then((res) => {
    if (res) {
      historyList.value = res.historyList || [];
    }
  });
</script>

<style lang="less" scoped>
  .mamb-card-ant {
    margin-top: 15px;
  }
</style>
