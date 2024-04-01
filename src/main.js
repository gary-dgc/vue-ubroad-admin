import { createApp } from 'vue';
import router from '@/router';
import App from '@/App.vue';
import i18n from '@/lang';
import store from '@/store';
import 'virtual:svg-icons-register';
import IconPlugin from '@/plugins/IconFont';
import BootPlugin from '@/plugins/boot';
//import 'ant-design-vue/dist/antd.variable.less';
import '@/theme/index.less';
import Antd from 'ant-design-vue';
if (process.env.NODE_ENV) {
  import('ant-design-vue/dist/antd.css');
}

const app = createApp(App);

app.use(Antd);
app.use(i18n);
app.use(store);

app.use(router);

app.use(IconPlugin, { url: '//at.alicdn.com/t/c/font_3805284_ulvha6ct7d.js' });
// 执行启动初始化
app.use(BootPlugin, { store, router });

app.mount('#app');
