# vue3-ubroad-admin

VUE3 + Vite + Javascript + Pinia + ant-design-vue 实现的一个后端管理系统模版
本项目从https://github.com/lower-greenHand/vue3-PC-admin fork 而来，起因是项目需要使用 vue，之前一直使用
vue2 和 ant-design2.x 构建，考虑到未来的技术路线和 vue3 的成熟度，决定进行技术升级，但是在查找了很多的项目模版之后发现
大多使用 TS 进行构建开发，以项目本身的复杂度 TS 的开发体验要求开发人员进行 Typescript 学习，但前端本身的逻辑复杂度对编码
没有过多的 strict 要求，所以使用 javascript 进行项目模版构建

## 说明

- Get the project code

https://github.com/gary-dgc/vue-ubroad-admin.git

- Notice

为消除 Model.confirm 异常问题，使用锁定版本的 antD（3.2.20）和 Vue（3.3.0）后续的两个组件升级需要留意测试 Model.destroyAll 失效问题

项目在/views/下的不同文件夹中通过探测routes.js文件的存在进行路由加载。



## 开发准备
- Installation dependencies

版本要求：Node.js >= 18._._

```
yarn 或 yarn install

#!!!IMPORTANT: npm install过程因为pdf-js等问题，加载异常
```

- Run

```
yarn dev  或 npm run dev
```

- build

```
开发环境
yarn build:dev


生产打包
yarn build

```
