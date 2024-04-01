<template>
  <div class="layout-content" :class="{ 'collapse-content': isCollapsed }">
    <a-layout-content class="content-wrapper">
      <a-spin
        size="large"
        :spinning="spinning"
        :wrapperClassName="spinning ? 'no-spin-scroll' : 'no-spin-scroll spin-scroll'"
      >
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="routes.meta.keepAlive" :key="routes.path" />
          </keep-alive>
          <component :is="Component" v-if="!routes.meta.keepAlive" /> </router-view
      ></a-spin>
    </a-layout-content>
  </div>
</template>

<script setup>
  import { computed, defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import useStoreOut from '@/store/module/user';
  import useMenuSiderStore from '@/store/module/app.js';

  const routes = useRoute();
  const useStore = useStoreOut();

  const spinning = computed(() => {
    return useStore.getLoadingPage || false;
  });

  const isCollapsed = computed(() => {
    return useMenuSiderStore().getMenuCollapsed;
  });
</script>

<style lang="less" scoped>
  .layout-content {
    width: calc(100vw - @side-width);
    max-width: calc(100vw - @side-width);
    &.collapse-content {
      width: calc(100vw - @side-collapse);
      max-width: calc(100vw - @side-collapse);
    }
    .content-wrapper {
      width: 100%;
      padding: 0;
      height: 100%;
      overflow-y: none;
      background: @all-bg-color;

      .no-spin-scroll {
        overflow: none;
        height: 100%;
        width: 100%;
      }

      .spin-scroll {
        height: 100%;
        overflow-y: none;
      }

      :deep(.ant-spin-container) {
        height: 100%;
      }
      :deep(.ant-spin-nested-loading > div > .ant-spin) {
        max-height: none;
      }
    }
  }
</style>
