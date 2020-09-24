<template>
  <block>
    <demo-block title="基础用法">
      <iox-sticky>
        <iox-button type="primary" custom-style="margin-left: 15px">
          基础用法
        </iox-button>
      </iox-sticky>
    </demo-block>

    <demo-block title="吸顶距离">
      <iox-sticky offset-top="50">
        <iox-button type="info" custom-style="margin-left: 115px">
          吸顶距离
        </iox-button>
      </iox-sticky>
    </demo-block>

    <demo-block title="指定容器">
      <view id="container" style="height: 150px; background-color: #fff;">
        <iox-sticky :container="container">
          <iox-button type="warning" custom-style="margin-left: 215px;">
            指定容器
          </iox-button>
        </iox-sticky>
      </view>
    </demo-block>

    <demo-block title="嵌套在 scroll-view 内使用">
      <scroll-view
        @scroll="onScroll"
        scroll-y
        id="scroller"
        style="height: 200px; background-color: #fff;"
      >
        <view style="height: 400px; padding-top: 50px;">
          <iox-sticky :scroll-top="scrollTop" :offset-top="offsetTop">
            <iox-button type="warning">
              嵌套在 scroll-view 内
            </iox-button>
          </iox-sticky>
        </view>
      </scroll-view>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import { wrapFunc, releaseFunc } from '../utils/func-utils';

@Component
export default class Index extends mixins(Fonts) {
  container: null | string = null;
  scrollTop = 0;
  offsetTop = 0;

  onReady() {
    if (this.container) {
      releaseFunc(this.container);
    }
    this.container = wrapFunc(() => uni.createSelectorQuery().select('#container'));
  }

  onScroll(event: CustomEvent) {
    uni.createSelectorQuery()
      .select('#scroller')
      .boundingClientRect((res) => {
        this.scrollTop = event.detail.scrollTop;
        this.offsetTop = res.top!;
      })
      .exec();
  }

  onPageScroll() {
  }

  destroy() {
    if (this.container) {
      releaseFunc(this.container);
    }
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }
}
</script>

<style lang="less">
page {
  height: 200vh;
}

.iox-button {
  margin-left: 16px;
}

.sticky-container {
  position: relative;
  z-index: -1;
  height: 150px;
  background-color: #fff;
}
</style>
