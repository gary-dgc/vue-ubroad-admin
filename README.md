# vue3-ubroad-admin

VUE3 + Vite + Javascript + Pinia + ant-design-vue 实现的一个后端管理系统模版
本项目从https://github.com/lower-greenHand/vue3-PC-admin fork 而来

- Get the project code

为消除 Model.confirm 异常问题，使用锁定版本的 antD（3.2.20）和 Vue（3.3.0）后续的两个组件升级需要留意测试 Model.destroyAll 失效问题

- Installation dependencies

```
版本要求：Node.js >= 18.*.*
```

```
yarn 或 yarn install

!!!IMPORTANT: npm install过程因为pdf-js等问题，加载异常
```

- Run

```
yarn dev  或 npm run dev
```

- build

```
开发环境
yarn build:dev

qa环境
yarn build:qa


生产打包
yarn build

```
