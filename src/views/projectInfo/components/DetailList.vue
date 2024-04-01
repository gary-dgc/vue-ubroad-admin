<template>
  <div class="project-detail">
    <div class="project-detail-title">
      <div>项目资料</div>
      <div class="more">更多</div>
    </div>
    <div class="project-detail-card">
      <a-row wrap type="flex">
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" v-for="(item, index) in projectBasicList" :key="index">
          <a-card>
            <a-card-grid class="card-item" @click="tabChange(item)">
              <div class="card-item-title">
                <SvgIcon :name="item.icon" :size="20" v-show="item.icon.indexOf('https://') == -1" />
                <img :src="item.icon" width="20" height="20" v-show="item.icon.indexOf('https://') != -1" />
                <span style="margin-left: 8px">{{ item.title }}</span>
              </div>
              <div class="card-item-desc">{{ item.type }}</div>
              <div class="card-item-desc" :title="item.address">地址：{{ item.address }}</div>
              <div class="card-item-desc" style="color: rgb(255, 172, 47)">日期：{{ item.date }}</div>
            </a-card-grid>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div class="project-detail-notice">
      <div class="project-detail-notice-title">
        <div>动态通知</div>
        <div class="more">更多</div>
      </div>
      <a-list :data-source="dataSource" item-layout="vertical" class="project-detail-notice-list">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.desc">
              <template #title>
                <div class="list-item-title">
                  <div class="title" :style="{ color: `${item.color}` }">
                    {{ item.name }}
                  </div>
                  <div class="sign">签名：{{ item.signature }}</div>
                </div>
              </template>
              <template #avatar>
                <a-avatar size="large" :src="item.avatar"></a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup>
  import { projectBasicList, dataSource } from '../data';

  const tabChange = (key) => {
    window.open(key.address, '_blank');
  };
</script>

<style lang="less" scoped>
  .project-detail {
    margin-top: 16px;
    width: 100%;
    margin-left: 0px;
    position: relative;
    ::v-deep(.ant-card) {
      width: 100%;
    }
    ::v-deep(.ant-card-body) {
      padding: 0;
    }
    ::v-deep(.ant-card-grid) {
      padding: 16px;
    }
    &-title {
      font-size: @font-common-size;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-card {
      margin-left: 1px;
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      box-shadow: 0 2px 10px rgba(20, 20, 20, 0.1);
      .card-item {
        width: 100%;
        &:hover {
          cursor: pointer;
        }
        &-title {
          display: flex;
          align-items: center;
          font-size: @font-size-base;
          font-weight: bold;
          margin-bottom: 10px;
        }
        &-desc {
          font-size: @font-size-base;
          margin: 4px 0;
          width: 100%;
          color: @text-color-secondary;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &-notice {
      margin: 16px 0;
      font-size: @font-common-size;
      font-weight: bold;
      box-shadow: 0px 3px 5px 0px rgba(20, 20, 20, 0.1);
      &-title {
        display: flex;
        justify-content: space-between;
      }
      &-list {
        padding: 0 16px;
        margin-top: 12px;
      }
      &-list::-webkit-scrollbar {
        width: 2px;
      }
      .list-item-title {
        .title {
          font-size: @font-common-size;
          // color: rgb(0, 187, 255);
        }
        .sign {
          font-size: 12px;
          color: @text-color-secondary;
        }
      }
      ::v-deep(.ant-list-vertical .ant-list-item-meta-title) {
        margin-bottom: 6px;
      }
      ::v-deep(.ant-list-vertical .ant-list-item-meta) {
        margin-bottom: 6px;
      }
    }
    .more {
      font-size: @font-size-base;
      color: rgb(8, 160, 255);
      cursor: pointer;
    }
  }
</style>
