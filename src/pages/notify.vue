<template>
  <block>
    <demo-block padding title="基础用法">
      <iox-button type="danger" @click="showNotify">基础用法</iox-button>
    </demo-block>

    <demo-block padding title="通知类型">
      <view class="demo-margin-bottom">
        <iox-button class="demo-margin-right" type="info" data-type="primary" @click="showNotifyByType('primary')">主要通知</iox-button>
        <iox-button type="primary" data-type="success" @click="showNotifyByType('success')">成功通知</iox-button>
      </view>
      <view class="demo-margin-bottom">
        <iox-button class="demo-margin-right" type="danger" data-type="danger" @click="showNotifyByType('danger')">危险通知</iox-button>
        <iox-button type="warning" data-type="warning" @click="showNotifyByType('warning')">警告通知</iox-button>
      </view>
    </demo-block>

    <demo-block padding title="自定义通知">
      <iox-button type="primary" class="demo-margin-right" @click="showCustomColor">自定义颜色</iox-button>
      <iox-button type="primary" @click="showCustomDuration">自定义时长</iox-button>
    </demo-block>

    <demo-block padding title="插入状态栏高度">
      <iox-button type="primary" class="demo-margin-right" @click="showSafe">插入状态栏高度</iox-button>
    </demo-block>

    <demo-block padding title="自定义通知">
      <iox-button type="primary" class="demo-margin-right" @click="onOpened">打开事件</iox-button>
      <iox-button type="primary" @click="onClick">通知栏点击事件</iox-button>
    </demo-block>


    <iox-notify
      :show="notify.show"
      :type="notify.type"
      :message="notify.message"
      :background="notify.background"
      :duration="notify.duration"
      :z-index="notify.zIndex"
      :top="notify.top"
      :color="notify.color"
      :safeAreaInsetTop="notify.safeAreaInsetTop"
      @click="onClickCall"
      @opened="onOpenedCall"
      @close="notify.show = false"
    />
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import {
  NotifyOptions, notify as notifyInitData,
} from '../utils/notify';

@Component
export default class Index extends mixins(Fonts) {
  notify: NotifyOptions = notifyInitData();

  showNotify(options: NotifyOptions | string | {[key: string]: any} = { show: true, message: '消息通知', }) {
    this.notify = notifyInitData(options);
  }

  showCustomColor() {
    this.showNotify({
      message: '自定义颜色',
      color: '#ad0000',
      background: '#ffe1e1',
      show: true,
    });
  }

  showCustomDuration() {
    this.showNotify({
      duration: 1000,
      message: '自定义时长',
      show: true,
    });
  }

  showNotifyByType(type: any) {
    this.showNotify({
      type,
      message: '通知内容',
      show: true,
    });
  }

  showSafe() {
    this.showNotify({
      message: '通知内容',
      safeAreaInsetTop: true,
      show: true,
    });
  }

  onOpened() {
    this.showNotify({
      message: '打开后立即调用',
      show: true,
    });
  }

  onOpenedCall() {
    uni.showToast({
      title: '我想开了',
      icon: 'none',
      duration: 1000,
    });
  }


  onClick() {
    this.showNotify({
      message: '点击后调用',
      show: true,
    });
  }

  onClickCall() {
    uni.showToast({
      title: '我被点击了',
      icon: 'none',
      duration: 1000,
    });
  }


  onShareAppMessage() {

  }
}
</script>

<style lang="less">
</style>
