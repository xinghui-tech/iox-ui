<template>
  <block>
    <demo-block title="基础用法" padding>
      <view class="demo-margin-bottom">
        <iox-button type="primary" size="small" class="demo-margin-right" @click="onClickShow1">
          显示蒙板
        </iox-button>
        <iox-button type="primary" size="small" @click="onClickHide1">
          隐藏蒙板
        </iox-button>
      </view>
      <iox-mask :show-mask="show1" @click="onClickHide">
        <view >
          今天，因应大数据、人工智能、私域流量、新零售新营销的时代潮流，我们为客户实现“X+新媒体”，贡献自己的解决方案。
        </view>
      </iox-mask>
    </demo-block>

    <demo-block title="自定义内容" padding>
      <iox-mask :show-mask="show2" @click="onClickHide2">
        <view >
          这些内容被遮挡了。
        </view>
        <iox-skeleton
          title
          avatar
          row-class="row"
          avatar-class="row"
          title-class="row"
          :row="3"
        />
        <view class="demo-margin-bottom">
          <iox-button type="primary" size="small" @click="onClickShow2">
            提交
          </iox-button>
        </view>

        <view slot="overlay" class="overlay">
          <iox-loading type="spinner" class="mb-2" />
          <iox-button type="warning" size="small" @click="onClickHide2">
            取消
          </iox-button>
        </view>
      </iox-mask>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  show1 = true;
  show2 = false;

  onClickShow1() {
    this.show1 = true;
  }

  onClickHide1() {
    this.show1 = false;
  }

  onClickShow2() {
    this.show2 = true;
  }

  onClickHide2() {
    this.show2 = false;
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 遮罩层',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-mask'
      // #endif
    };
  }
}
</script>

<style lang="less">
page {
  background-color: white;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.row {
  background-color: chocolate !important;
}
</style>
