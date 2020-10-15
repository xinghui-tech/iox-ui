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
          <div class="block" @tap.stop="noop" />
        </view>
      </iox-overlay>
    </demo-block>

    <demo-block title="显示遮罩" padding>
      <iox-overlay show show-mask custom-style="position: absolute;" @click="onClickHideMask">
        <view >
          这些内容被遮挡了。
        </view>
        <view class="mask-wrapper" slot="mask">
          <iox-loading type="spinner" class="demo-margin-bottom" vertical>正在加载...</iox-loading>
          <iox-button type="warning" size="small" @click="onClickHideMask">取消</iox-button>
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
  showMask = false;

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

  onClickShowMask() {
    this.showMask = true;
  }

  onClickHideMask() {
    this.showMask = false;
  }

  noop() {}

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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.mask {
  position: absolute !important;
}

.mask-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
