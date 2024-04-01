export default [
  {
    name: 'pack',
    path: '/pack',
    redirect: '/pack/form',
    component: () => import('@/layout/index.vue'),
    meta: { icon: 'manage', is_menu: true, auth_need: true, title: '表单功能', menu_order: 3 },
    children: [
      {
        name: 'pack-form',
        path: 'form',
        component: () => import('@/views/package/form/index.vue'),
        meta: { icon: 'home', is_menu: true, auth_need: true, title: '表单例子' },
      },
      {
        name: 'pack-table',
        path: 'table',
        component: () => import('@/views/package/table/index.vue'),
        meta: { icon: 'home', is_menu: true, auth_need: true, title: '表格例子' },
      },
    ],
  },
];
