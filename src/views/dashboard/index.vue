<template>
  <div class="data-board" id="data-board">
    <CardListInfo />
    <EchartModule />
    <AnalysisData />
    <a-back-top :target="getDocEle" :visibilityHeight="100" />
  </div>
</template>

<script setup>
  import { ref, onUnmounted, onMounted, watch, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import CardListInfo from './component/CardListInfo.vue';
  import EchartModule from './component/EchartModule.vue';
  import AnalysisData from './component/AnalysisData.vue';
  import Bus from '@/utils/bus.js';
  import useAppStore from '@/store/module/app.js';

  const appStore = useAppStore();
  const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

  const { collapsed } = storeToRefs(appStore);

  watch(
    () => collapsed.value,
    () => {
      Bus.emit('update-data', true);
    }
  );

  watch(
    () => screenWidth.value,
    () => {
      Bus.emit('update-data', false);
    }
  );

  onMounted(() => {
    window.onresize = () => {
      return (() => {
        screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      })();
    };
  });
  // 移除
  onUnmounted(() => {
    window.onresize = null;
  });

  // 首页锚点定位
  const getDocEle = () => {
    return document.getElementById('data-board');
  };
</script>

<style lang="less" scoped>
  .data-board {
    height: calc(100%);
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    padding: 10px;
  }
</style>
