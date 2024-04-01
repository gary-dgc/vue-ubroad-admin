import bus from '@/utils/bus.js';

export default {
  install(app) {
    // 初始化全局消息总线
    app.bus = bus;
  },
};
