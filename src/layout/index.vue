<template>
  <a-layout class="layout-space">
    <!-- 头部 -->
    <layout-header />
    <a-layout class="layout-right">
      <!-- 菜单列表 -->
      <layout-sider />
      <!-- 内容区 -->
      <layout-content />
    </a-layout>
    <!-- 底部 -->
    <a-layout-footer class="layout-footer">
      {{ t('index.description') }}
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
  import LayoutSider from './components/LayoutSider.vue';
  import LayoutHeader from './components/LayoutHeader.vue';
  import LayoutContent from './components/LayoutContent.vue';
  import t from '@/lang/t.js';

  const footerStyle = {};
</script>

<style lang="less" scoped>
  .layout-space {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .layout-header {
      height: @head-height;
    }

    .layout-right {
      width: calc(100%);
      .layout-content {
        height: calc(100vh - @head-height - @foot-height);
      }
    }

    .layout-footer {
      text-align: 'center';
      color: #fff;
      padding: 0 10px;
      height: @foot-height;
      line-height: @foot-height;
      background-color: #7dbcea;
    }
  }
</style>
