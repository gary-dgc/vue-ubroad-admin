const indexRouters = [
  {
    path: '/',
    name: 'home',
    redirect: '/home/root',
    component: () => import('@/layout/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/sys/login/login.vue'),
    meta: {
      title: '登录',
      keepAlive: false,
    },
  },
  {
    path: '/preview-pdf',
    name: 'PreViewPdf',
    component: () => import('@/views/fun/pdf/previewPdf.vue'),
    meta: {
      title: 'pdf预览',
      keepAlive: false,
    },
  },
];

export default indexRouters;
