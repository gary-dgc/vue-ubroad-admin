<template>
  <a-layout-sider
    :width="200"
    class="sider-class"
    collapsedWidth="80"
    v-model:collapsed="isCollapsed"
    :trigger="null"
    collapsible
  >
    <layout-menu class="layout-menu" />
  </a-layout-sider>
</template>

<script setup>
  import { computed } from 'vue';
  import LayoutMenu from './LayoutMenu.vue';
  import useMenuSiderStore from '@/store/module/app.js';

  const sys_name = import.meta.env.VITE_SYSTEM_NAME;
  const sys_frame = import.meta.env.VITE_SYS_FRAME;

  const isCollapsed = computed(() => {
    return useMenuSiderStore().getMenuCollapsed;
  });
</script>

<style lang="less" scoped>
  .sider-class {
    height: calc(100vh - @head-height - @foot-height);
    overflow: hidden;
    text-align: center;
    color: #fff;
    background-color: #3ba0e9;

    :deep(.ant-layout-sider-children) {
      display: flex;
      flex-direction: column;
    }

    .layout-menu {
      flex: 1;
      background: #fff;
      color: #000000;
    }
  }
</style>
