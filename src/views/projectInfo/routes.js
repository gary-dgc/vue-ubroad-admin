const routes = [
  {
    name: 'project',
    path: '/project',
    redirect: '/project/info',
    component: () => import('@/layout/index.vue'),
    meta: { icon: 'project', is_menu: true, title: '项目信息', menu_order: 2 },
    children: [
      {
        name: 'project-info',
        path: 'info',
        component: () => import('@/views/projectInfo/index.vue'),
        meta: { icon: 'home', is_menu: true, auth_need: true, title: '项目信息' },
      },
    ],
  },
];

export default routes;
