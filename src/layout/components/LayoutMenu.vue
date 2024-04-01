<template>
  <div class="menu-list" :class="{ 'collapse-side': collapsed }">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      class="side-menu"
      style="width: 100%"
      mode="inline"
    >
      <template v-for="item in menuList" :key="item.key">
        <template v-if="item.children && item.children.length > 0">
          <a-sub-menu :key="item.key">
            <template #icon>
              <svg-icon :name="item.icon" :size="iconSize" />
            </template>
            <template #title>{{ item.meta.title }}</template>
            <a-menu-item v-for="obj in item.children" :key="obj.key" :disabled="obj.disabled">
              <router-link :to="obj.path">
                <span>{{ obj.meta.title }}</span>
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="item.key" :disabled="item.disabled">
            <template #icon>
              <svg-icon :name="item.icon" :size="iconSize" />
            </template>
            <router-link :to="item.path">
              <span>{{ item.meta.title }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </template>
      <template v-for="item in menus" :key="item.key">
        <template v-if="item.children && item.children.length > 0">
          <a-sub-menu :key="item.key">
            <template #icon>
              <svg-icon :name="item.meta.icon" :size="iconSize" />
            </template>
            <template #title>{{ item.meta.title }}</template>
            <a-menu-item v-for="obj in item.children" :key="obj.key" :disabled="obj.disabled">
              <template #icon>
                <svg-icon :name="obj.icon" :size="iconSize" />
              </template>
              <router-link :to="obj.path">
                <span>{{ obj.meta.title }}</span>
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="item.key" :disabled="item.disabled">
            <template #icon>
              <svg-icon :name="item.meta.icon" :size="iconSize" />
            </template>
            <router-link :to="item.path">
              <span>{{ item.meta.title }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script setup>
  import { ref, watch, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';
  import useAppStore from '@/store/module/app.js';
  import { isArray } from '@/utils/common';

  const routes = useRoute();
  const useMenuSider = useAppStore();
  const selectedKeys = ref([]);
  const openKeys = ref([]);

  const menuList = ref(useMenuSider.getRoutesList);
  const { menus, collapsed } = storeToRefs(useMenuSider);

  // 监听路由变化
  const querySelectedKeys = (path, arrList) => {
    if (!isArray(arrList)) return;
    arrList.forEach((item) => {
      if (item.path == path) {
        selectedKeys.value = Array(item.key);
        if (item.isHideChildMenu) openKeys.value = [];
      } else {
        if (item.children && item.children.length > 0) {
          const arr = item.children.find((el) => el.path == path);
          if (arr) {
            selectedKeys.value = Array(arr.key);
            openKeys.value = Array(item.key);
          }
        }
      }
    });
  };

  watch(
    () => routes.path,
    (newValue) => {
      querySelectedKeys(newValue, menuList.value);
    },
    {
      immediate: true,
    }
  );

  const iconSize = computed(() => {
    return collapsed.value ? 22 : 17;
  });
</script>

<style lang="less" scoped>
  @icon-size: 17px;
  @collapse-icon-size: 22px;
  .menu-list {
    .side-menu {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .side-menu::-webkit-scrollbar {
      width: 0;
    }
    :deep(.ant-menu-inline .ant-menu-item) {
      margin-top: 0;
    }

    :deep(.ant-menu-inline > .ant-menu-item) {
      height: 45px;
      line-height: 45px;
    }

    &.collapse-side {
      :deep(.ant-menu.ant-menu-inline-collapsed > .ant-menu-item),
      :deep(.ant-menu.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title) {
        padding: 0 calc(50% - @collapse-icon-size / 2);
      }
    }
  }
</style>
