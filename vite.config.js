import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';

const timestamp = new Date().getTime();
const prodRollupOptions = {
  output: {
    chunkFileNames: (chunk) => {
      return 'assets/' + chunk.name + '.[hash]' + '.' + timestamp + '.js';
    },
    assetFileNames: (asset) => {
      const name = asset.name;
      if (name && (name.endsWith('.css') || name.endsWith('.js'))) {
        const names = name.split('.');
        const extname = names.splice(names.length - 1, 1)[0];
        return `assets/${names.join('.')}.[hash].${timestamp}.${extname}`;
      }
      return 'assets/' + asset.name;
    },
  },
};

export default defineConfig((mode, command) => {
  const env = loadEnv(mode.mode, process.cwd(), '');
  const { VITE_PUBLIC_PATH, VITE_PORT } = env;
  return {
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            img: ['src'],
            'a-avatar': ['src'],
            'a-card': ['cover'],
          },
        },
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/svgs'), resolve(process.cwd(), 'src/assets/icon')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        supportTs: false,
        logger: false,
        localEnabled: true, //设置是否启用本地mock文件
        prodEnabled: false, //设置打包是否启用 mock 功能
        mockPath: './mock/', // 注意：此时的 mockPath 地址是真正安装的 mock 文件夹的地址;
      }),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: mode.mode === 'dev' ? false : 'less' })],
      }),
    ],
    root: process.cwd(),
    base: VITE_PUBLIC_PATH,

    define: {
      'process.env': env,
      __INTLIFY_PROD_DEVTOOLS__: false,
      FEATURE_FLAG: true,
    },
    server: {
      host: '0.0.0.0', //  Listening on all local IPs
      port: VITE_PORT, // 将端口号替换为你希望使用的端口号
      open: true,
      proxy: {
        '/auth': {
          target: 'https://particles.js.org', //接口域名
          changeOrigin: true, //是否跨域
          rewrite: (path) => path.replace(/^\/auth/, ''),
          // secure: false, //  secure 为 false 时，代理将会在使用 HTTP 进行请求时忽略 SSL 证书的验证
        },
        // '/api': {
        //   target: 'http://172.31.83.121:8088', //接口域名
        //   changeOrigin: true, //是否跨域
        //   rewrite: (path) => path.replace(/^\/api/, '/api'),
        //   // secure: false, //  secure 为 false 时，代理将会在使用 HTTP 进行请求时忽略 SSL 证书的验证
        // },
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, '/src'),
        },
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
      ],
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 2048,
      rollupOptions: mode === 'prod' ? prodRollupOptions : {},
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `
          @import "${resolve(__dirname, 'src/theme/index.less')}";
          `,
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'dayjs/locale/zh-cn',
        'ant-design-vue/es/locale/en_US',
        'dayjs/locale/en',
      ],
      // exclude: ['vue-demi', 'consolidate'],
    },
  };
});
