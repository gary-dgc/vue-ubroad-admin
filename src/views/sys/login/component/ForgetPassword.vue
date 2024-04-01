<template>
  <div class="form-list">
    <p class="title">重置密码</p>
    <a-form ref="formRef" autocomplete="on" :model="formState" :rules="getFormRules">
      <a-form-item name="phone">
        <a-input v-model:value="formState.phone" placeholder="请输入手机号" allow-clear> </a-input>
      </a-form-item>
      <a-form-item name="validCode">
        <a-row align="middle" justify="space-between">
          <a-col span="16">
            <a-input v-model:value="formState.validCode" :maxlength="6" placeholder="请输入验证码" allow-clear>
            </a-input
          ></a-col>
          <a-col span="6" class="form-code"><a-button @click="sendValidCode">发送验证码</a-button></a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-row align="middle" justify="space-between">
          <a-col span="11">
            <a-button @click="handleBackLogin">返回</a-button>
          </a-col>
          <a-col span="11">
            <a-button type="primary" html-type="submit" @click="resetPassword">重置</a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
  import { defineComponent, ref } from 'vue';
  import { getFormRules } from '../data';

  const emit = defineEmits(['change-status']);

  const formRef = ref(null);
  const formState = ref({
    phone: '',
    validCode: '',
  });
  const resetPassword = () => {
    console.log('312', formRef.value.validate());
  };
  const handleBackLogin = () => {
    emit('change-status', 0);
  };

  const sendValidCode = () => {
    formRef.value.validateField('inputField');
  };
</script>

<style lang="less" scoped>
  .form-code {
    ::v-deep(.ant-btn) {
      margin-top: 0 !important;
    }
  }
</style>
