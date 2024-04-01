<template>
  <div class="admin-login">
    <sys-title />
    <div class="admin-login-form">
      <login-form v-if="loginStatus == 0" @change-status="changeStatus" />
      <forget-password v-else-if="loginStatus == 1" @change-status="changeStatus" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import SysTitle from './component/SysTitle.vue';
  import LoginForm from './component/LoginForm.vue';
  import ForgetPassword from './component/ForgetPassword.vue';

  const loginStatus = ref(0);

  const changeStatus = (index) => {
    loginStatus.value = index;
  };
</script>

<style lang="less">
  .admin-login {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &-form {
      min-width: 350px;
      min-height: 300px;
      z-index: 10;
      border: 1px solid @border-color-base;

      .form-list {
        width: 100%;
        height: 100%;
        padding: 15px;

        .title {
          font-size: 24px;
          font-weight: 600;
        }

        .forget-pwd {
          text-align: right;
          label {
            cursor: pointer;
          }

          label:hover {
            color: @primary-color;
          }
        }
        .ant-input-affix-wrapper {
          font-size: 18px;
          background: transparent;
        }

        .ant-form-item-has-error
          :not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper {
          background: transparent;
        }

        .ant-form-item-has-error :not(.ant-input-disabled):not(.ant-input-borderless).ant-input {
          background: transparent;
        }
        .ant-input {
          font-size: 15px;

          background: transparent;
        }

        .anticon svg {
        }
        .ant-btn {
          width: 100%;
          margin-top: 10px;
          height: 38px;
          line-height: 38px;
          padding: 0;
        }
      }
    }
  }
</style>
