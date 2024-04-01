const indexRouters = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { icon: 'home', is_menu: true, auth_need: true, title: 'demo' },
      },
    ],
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
