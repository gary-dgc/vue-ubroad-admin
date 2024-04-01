import { createRouter, createWebHashHistory } from 'vue-router';
import useSider from '@/store/module/sider';
import indexRoute from './module';
import errorRoutes from './module/error';

const DFT_MENU = { icon: 'home', is_menu: false, auth_need: true, title: '未知', menu_order: 100 };
const menuSorter = (m1, m2) => {
  if (m1.meta.menu_order == m2.meta.menu_order) {
    return m1.name - m2.name;
  } else {
    return m1.meta.menu_order - m2.meta.menu_order;
  }
};
const menus = [];
const checkMenu = (route) => {
  const { name, path, meta = DFT_MENU, children, redirect } = route;
  if (meta.is_menu) {
    if (!meta.menu_order) {
      meta.menu_order = 100; // default
    }
    const _menu = {
      key: `M-${name}-${path}`,
      name,
      path,
      meta,
      redirect,
      children: [],
    };
    if (children && children.length > 0) {
      const _children = [];
      for (const child of children) {
        const _child = checkMenu(child);
        if (_child) {
          _child.path = path + '/' + _child.path;
          _children.push(_child);
        }
      }
      if (_children.length > 1) {
        _children.sort(menuSorter);
        _menu.children = _children;
      } else if (_children.length == 1) {
        _menu.children = [];
      }
    }
    return _menu;
  } else {
    return null;
  }
};
/**
 * this method is called in boot/plugin.js, it detect all the routes.js in pages/* sub-folders
 **/
export const loadRoutes = (router) => {
  const files = import.meta.glob('../views/**/routes.js', {
    import: 'default',
    eager: true,
  });

  const routes = {};
  for (const [modulePath, definition] of Object.entries(files)) {
    if (modulePath === './index.js') {
      continue;
    }
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');

    const result = definition;
    routes[moduleName] = result;
  }

  Object.keys(routes).forEach((k) => {
    const _routes = routes[k];

    if (!Array.isArray(_routes)) {
      router.addRoute(_routes);
      console.log('----menu', _routes);

      const menu = checkMenu(_routes);
      if (menu) {
        menus.push(menu);
      }
      return;
    }
    for (const route of _routes) {
      router.addRoute(route);
      console.log('----menu', route);
      const menu = checkMenu(route);
      if (menu) {
        menus.push(menu);
      }
    }
  });

  menus.sort(menuSorter);
};

import guards from './module/guards';
const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: [...indexRoute, ...errorRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

loadRoutes(router);

export const detectMenus = () => {
  const sider = useSider();
  sider.$patch({
    menus,
  });
};

guards.before.forEach(router.beforeEach);
guards.after.forEach(router.afterEach);

export default router;
