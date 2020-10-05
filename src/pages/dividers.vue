<template>
  <block>
    <demo-block custom-class="white" title="基础用法" padding>
      <iox-divider />
    </demo-block>

    <demo-block custom-class="white" title="内容位置" padding>
      <iox-divider content-position="center">文本</iox-divider>
      <iox-divider content-position="left">文本</iox-divider>
      <iox-divider content-position="right">文本</iox-divider>
    </demo-block>

    <demo-block custom-class="white" title="虚线" padding>
      <iox-divider dashed />
    </demo-block>

    <demo-block custom-class="white" title="自定义样式" padding>
      <iox-divider content-position="center" custom-style="color: #1989fa;border-color: #1989fa;font-size: 18px;">文本</iox-divider>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }
}
</script>

<style lang="less">
page {
  background-color: white;
}
</style>
