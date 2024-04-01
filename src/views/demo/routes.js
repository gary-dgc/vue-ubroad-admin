const routes = [
  {
    name: 'demo',
    path: '/demo',
    redirect: '/demo/demo',
    component: () => import('@/layout/index.vue'),
    meta: { icon: 'menu', is_menu: true, title: '菜单实例', menu_order: 3 },
    children: [
      {
        name: 'demo-root',
        path: 'demo',
        component: () => import('@/views/demo/demo.vue'),
        meta: { icon: 'home', is_menu: true, auth_need: true, title: 'demo0' },
      },
      {
        name: 'demo-demo1',
        path: 'demo1',
        component: () => import('@/views/demo/demo1.vue'),
        meta: { icon: 'home', is_menu: true, auth_need: true, title: 'demo1' },
      },
      {
        name: 'demo-demo2',
        path: 'demo2',
        component: () => import('@/views/demo/demo2.vue'),
        meta: { icon: 'home', is_menu: true, auth_need: true, title: 'demo2' },
      },
    ],
  },
];

export default routes;
