export default [
  {
    name: 'Home',
    path: '/home',
    redirect: '/home/root',
    component: () => import('@/layout/index.vue'),
    meta: { icon: 'home', is_menu: true, auth_need: true, title: '首页看板', menu_order: 1 },
    children: [
      {
        name: 'home-root',
        path: 'root',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { icon: 'home', is_menu: true, auth_need: true, title: 'demo' },
      },
    ],
  },
];
