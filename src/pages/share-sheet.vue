<template>
  <block>
    <demo-block card title="基础用法">
      <iox-cell is-link title="显示分享面板" data-type="basic" @click="onShowShareSheet('basic')" />
      <iox-share-sheet
        :show="show.basic"
        title="立即分享给好友"
        :options="options"
        @close="onClose"
        @select="onSelect"
      />
    </demo-block>

    <demo-block card title="展示多行选项">
      <iox-cell is-link title="显示分享面板" data-type="multiLine" @click="onShowShareSheet('multiLine')" />
      <iox-share-sheet
        :show="show.multiLine"
        title="立即分享给好友"
        :options="multiLineOptions"
        @close="onClose"
        @select="onSelect"
      />
    </demo-block>

    <demo-block card title="自定义图标">
      <iox-cell is-link title="显示分享面板" data-type="customIcon" @click="onShowShareSheet('customIcon')" />
      <iox-share-sheet
        :show="show.customIcon"
        :options="customIconOptions"
        @close="onClose"
        @select="onSelect"
      />
    </demo-block>

    <demo-block card title="展示描述信息">
      <iox-cell is-link title="显示分享面板" data-type="withDesc" @click="onShowShareSheet('withDesc')" />
      <iox-share-sheet
        :show="show.withDesc"
        title="立即分享给好友"
        :options="optionsWithDesc"
        description="描述信息"
        @close="onClose"
        @select="onSelect"
      />
    </demo-block>

    <iox-toast
      :show="toast.show"
      :type="toast.type"
      :mask="toast.mask"
      :z-index="toast.zIndex"
      :position="toast.position"
      :forbid-click="toast.forbidClick"
      :loading-type="toast.loadingType"
      :message="toast.message"
      :duration="toast.duration"
      @close="toast.show = false"
    />
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import icons from '../awesome-font-icons';
import {
  ToastOptions, toast,
  success as toastSuccess,
  loading as toastLoading,
  fail as toastFail
} from '../utils/toast';


@Component
export default class Index extends mixins(Fonts) {
  toast: ToastOptions = toast();

  show= {
    basic: false,
    withDesc: false,
    multiLine: false,
    customIcon: false,
  }
  options= [
    { name: '微信', icon: 'wechat', openType: 'share' },
    { name: '微博', icon: 'weibo' },
    { name: '复制链接', icon: 'link' },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' },
  ]

  multiLineOptions= [
    [
      { name: '微信', icon: 'wechat' },
      { name: '微博', icon: 'weibo' },
      { name: 'QQ', icon: 'qq' },
    ],
    [
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],
  ]

  customIconOptions= [
    {
      name: '名称',
      icon: 'https://img.yzcdn.cn/vant/custom-icon-fire.png',
    },
    {
      name: '名称',
      icon: 'https://img.yzcdn.cn/vant/custom-icon-light.png',
    },
    {
      name: '名称',
      icon: 'https://img.yzcdn.cn/vant/custom-icon-water.png',
    },
  ]

  optionsWithDesc= [
    { name: '微信', icon: 'wechat' },
    { name: '微博', icon: 'weibo' },
    {
      name: '复制链接',
      icon: 'link',
      description: '描述信息',
    },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' },
  ]


  showToast(options: ToastOptions | string = '提示内容') {
    this.toast = toast(options);
  }

  onShowShareSheet(value: any) {
    (this as any).show[value] = true;
  }

  onClose() {
    this.show = {
      basic: false,
      withDesc: false,
      multiLine: false,
      customIcon: false,
    };
  }

  onSelect(event: any) {
    console.log('page event ===', event);
    this.showToast(event.name);
    this.onClose();
  }


  onShareAppMessage() {
    return {
      title: 'IOX UI 分享菜单',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-share-sheet'
      // #endif
    };
  }
}
</script>

<style lang="less">
  .container {
    height: 100vh;
    background-color: #fff;
  }

  .tag,
  .button {
    margin-right: 5px;
  }

  .iox-card__footer {
    margin-top: 5px;
  }
</style>
