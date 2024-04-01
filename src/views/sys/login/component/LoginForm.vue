<template>
  <div class="form-list">
    <p class="title">Login</p>
    <a-form
      :model="formState"
      autocomplete="on"
      :rules="getRules"
      @finish="handleFinish"
      @keypress.enter="handleFinish"
    >
      <a-form-item name="usename">
        <a-input v-model:value="formState.usename" placeholder="请输入账号" allow-clear>
          <template #prefix><UserOutlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          v-model:value="formState.password"
          type="password"
          allow-clear
          autocomplete="on"
          visibilityToggle
          placeholder="请输入密码"
        >
          <template #prefix><LockOutlined /></template>
        </a-input-password>
      </a-form-item>
      <div class="forget-pwd">
        <label @click="handleForget">忘记密码</label>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading"> 登录 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import { getRules } from '../data';
  import useStoreOut from '@/store/module/user.js';

  const emit = defineEmits(['change-status']);

  const useStore = useStoreOut();
  const formState = ref({
    usename: 'admin',
    password: 'admin@123',
  });
  const loading = ref(false);

  const handleFinish = async (values) => {
    if (!values) return;
    loading.value = true;
    try {
      await useStore.login(formState.value);
    } finally {
      loading.value = false;
    }
  };

  // 忘记密码
  const handleForget = () => {
    emit('change-status', 1);
  };
</script>

<style lang="less" scoped></style>
