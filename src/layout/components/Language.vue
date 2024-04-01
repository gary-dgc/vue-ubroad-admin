<template>
  <a-dropdown
    destroyPopupOnHide
    :getPopupContainer="getPopupContainer"
    placement="bottom"
    trigger="['click']"
    class="language-menu"
  >
    <div class="language"><svg-icon name="language" size="30" /></div>
    <template #overlay>
      <a-menu @click="handleSelect" v-model:selectedKeys="selectedKeys">
        <a-menu-item v-for="item in languageType" :key="item.key">
          <div>{{ item.title }}</div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { languageType } from '../setting';

  const selectedKeys = ref();
  const getPopupContainer = (trigger) => {
    return trigger.parentNode ?? document.body;
  };

  onMounted(() => {
    selectedKeys.value = [`${localStorage.getItem('lang') || 'zh_CN'}`];
  });

  // 选择语种
  const handleSelect = (item) => {
    selectedKeys.value = [`${item.key}`];
    localStorage.setItem('lang', item.key);
    window.location.reload();
  };
</script>

<style lang="less" scoped>
  .language > svg > path {
    fill: #fff;
  }
  .language-menu {
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
  }

  ::v-deep(.ant-dropdown-menu-item, ) {
    text-align: center;
  }
</style>
