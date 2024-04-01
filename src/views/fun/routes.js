export default [
  {
    name: 'func',
    path: '/func',
    redirect: '/func/export',
    component: () => import('@/layout/index.vue'),
    meta: { icon: 'fun', is_menu: true, auth_need: true, title: '演示功能', menu_order: 3 },
    children: [
      {
        name: 'func-export',
        path: 'export',
        component: () => import('@/views/fun/exportPDF/index.vue'),
        meta: { icon: 'home', is_menu: true, auth_need: true, title: 'Pdf导出' },
      },
      {
        name: 'func-screen',
        path: 'screen-shot',
        component: () => import('@/views/fun/screenshot/index.vue'),
        meta: { icon: 'home', is_menu: true, auth_need: true, title: '截图' },
      },
      {
        name: 'func-pdf',
        path: 'pdf',
        component: () => import('@/views/fun/pdf/index.vue'),
        meta: { icon: 'home', is_menu: true, auth_need: true, title: 'Pdf预览' },
      },
    ],
  },
];
