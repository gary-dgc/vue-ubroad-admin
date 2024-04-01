import useStoreOut from '@/store/module/user';
import { Modal, notification } from 'ant-design-vue';
import router from '@/router';
import { pagePath } from '@/common/constant';

const reset = (to) => {
  document.title = to.meta.title || 'admin';
  Modal.destroyAll();
  notification.destroy();
};

const LoginGuard = {
  async before(to, from, next) {
    const useStore = useStoreOut();

    if (!useStore.getLoginToken && to.name !== 'login') {
      useStore.setLoginToken('');
      useStore.setUserInfo(null);
      // localStorage.clear();
      // sessionStorage.clear();
      router.replace(pagePath.BASE_LOGIN);
      next();

      return;
    }
    useStore.setLoadingPage(true);
    if (useStore.getLoginToken && from.path == '/' && to.name == undefined) {
      await useStore.afterLoginAction(false);
      // Refresh Page Load
      const redirectPath = from.query.redirect || to.path;
      const redirect = decodeURIComponent(redirectPath);
      const _to = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(_to);

      return;
    }

    next();
  },
};

const LoadingGuard = {
  before(to, from, next) {
    reset(to);
    next();
  },
  after() {
    const useStore = useStoreOut();
    setTimeout(() => {
      useStore.setLoadingPage(false);
    }, 100);
  },
};

export default {
  before: [LoadingGuard.before, LoginGuard.before],
  after: [LoadingGuard.after],
};
