<template>
  <block>
    <demo-block title="基础用法" padding>
      <iox-button type="primary" @click="onClickShow">
        显示遮罩层
      </iox-button>
      <iox-overlay :show="show" @click="onClickHide" />
    </demo-block>

    <demo-block title="嵌入内容" padding>
      <iox-button type="primary" @click="onClickShowEmbedded">
        嵌入内容
      </iox-button>
      <iox-overlay :show="showEmbedded" @click="onClickHideEmbedded">
        <view class="wrapper">
          <view class="block" @tap.stop="noop" />
        </view>
      </iox-overlay>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  show = false;
  showEmbedded = false;

  onClickShow() {
    this.show = true;
  }

  onClickHide() {
    this.show = false;
  }

  onClickShowEmbedded() {
    this.showEmbedded = true;
  }

  onClickHideEmbedded() {
    this.showEmbedded = false;
  }

  noop() {
    console.log('tap on wrpper block.');
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 遮罩层',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-overlay'
      // #endif
    };
  }
}
</script>

<style lang="less">
.wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
