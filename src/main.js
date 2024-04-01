import { createApp } from 'vue';
import router, { detectMenus } from '@/router';
import App from '@/App.vue';
import i18n from '@/lang';
import store from '@/store';
import 'virtual:svg-icons-register';
import Particles from 'vue3-particles';
import IconPlugin from '@/plugins/IconFont';
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
app.use(Particles);

app.use(IconPlugin, { url: '//at.alicdn.com/t/c/font_3805284_ulvha6ct7d.js' });

detectMenus();

app.mount('#app');
