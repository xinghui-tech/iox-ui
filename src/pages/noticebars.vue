<template>
  <block>
    <demo-block title="基础用法">
      <iox-notice-bar
        :text="text"
        left-icon="volume-up"
      />
    </demo-block>

    <demo-block title="滚动模式">
      <iox-notice-bar scrollable :text="shortText" custom-class="demo-margin-bottom" />
      <iox-notice-bar :scrollable="false" :text="text" custom-class="demo-margin-bottom" />
    </demo-block>

    <demo-block title="多行展示">
      <iox-notice-bar wrapable :scrollable="false" :text="text" />
    </demo-block>

    <demo-block title="通知栏模式">
      <iox-notice-bar mode="closeable" :text="shortText" />
      <iox-notice-bar custom-class="margin-top" mode="link" :text="shortText" />
    </demo-block>

    <demo-block title="自定义样式">
      <iox-notice-bar
        :text="shortText"
        color="#1989fa"
        background="#ecf9ff"
        left-icon="exclamation-triangle"
      >
      </iox-notice-bar>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  text = '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。';
  shortText = '技术是开发它的人的共同灵魂。';

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }
}
</script>

<style lang="less">
.margin-top {
  margin-top: 4px;
}
</style>
