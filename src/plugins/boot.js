import { loadRoutes } from '@/router';
import bus from '@/utils/bus.js';
import useApp from '@/store/module/app';
export default {
  install(app, options) {
    // 初始化全局消息总线
    app.bus = bus;
    const { store, router } = options;

    // 自动加载/views中的文件，并返回菜单列表
    const menus = loadRoutes(router);
    const appStore = useApp();
    // 将菜单信息设定至store中，用于侧边菜单显示
    appStore.$patch({
      menus,
    });
  },
};
