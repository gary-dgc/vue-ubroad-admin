<template>
  <a-layout-header class="layout-header">
    <div class="header-left">
      <div class="sys-title">
        <svg-icon name="vite" size="32" style="margin: auto" />
      </div>
      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="handleCollapsed" />
      <menu-fold-outlined v-else class="trigger" @click="handleCollapsed" />
    </div>
    <!-- 中间区域 -->
    <div style="flex: auto; margin: 0 10px"></div>
    <div class="header-right">
      <!-- 语种 -->
      <language />
      <a-dropdown destroyPopupOnHide :getPopupContainer="getPopupContainer" placement="bottom">
        <div class="header-avatar">
          <a-avatar :src="avatorImg">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <span class="title">Mamba</span>
        </div>
        <template #overlay>
          <a-menu @click="handleItem">
            <a-menu-item v-for="item in itemList" :key="item.key">
              <svg-icon :name="item.icon" />
              {{ item.title }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <forget-password ref="forgetPwd" />
    </div>
  </a-layout-header>
</template>

<script setup>
  import { defineComponent, ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import useSider from '@/store/module/sider.js';
  import Language from './Language.vue';
  import avatorImg from '@/assets/images/avatar.png';
  import { itemList } from '../setting';
  import useStoreOut from '@/store/module/user.js';
  import ForgetPassword from './ForgetPassword.vue';

  const userStore = useStoreOut();
  const collapsed = ref(false);
  const forgetPwd = ref(null);

  // 菜单收起展开
  const handleCollapsed = () => {
    collapsed.value = !collapsed.value;
    useSider().setMenuCollapsed(collapsed.value);
  };

  const getPopupContainer = (trigger) => {
    return trigger.parentNode ?? document.body;
  };

  // 点击头像选择功能：修改密码，退出登录
  const handleItem = (item) => {
    if (item.key == 'loginOut') {
      Modal.confirm({
        title: '提示',
        content: '确定退出登录？',
        onOk: async (_close) => {
          await userStore.loginOut(true);
          _close();
        },
        onCancel: (_close) => {
          _close();
        },
      });
    } else {
      forgetPwd.value.openModal();
    }
  };
</script>

<style lang="less" scoped>
  .layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: '50px';
    padding: 0 30px;
    color: @all-bg-color;
    background-color: @heading-color;

    .trigger {
      font-size: 24px;
      margin-left: 10px;
      cursor: pointer;
      transition: color 0.3s;
    }

    .header-left {
      width: 200px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .sys-title {
        display: flex;
        align-items: center;
      }
    }

    .header-right {
      padding: 0 15px;

      display: flex;

      .header-avatar {
        display: flex;
        align-items: center;
        cursor: pointer;
        .title {
          margin-left: 10px;
        }
      }
      ::v-deep(.ant-dropdown) {
        min-width: 120px !important;
      }
    }
  }
</style>
