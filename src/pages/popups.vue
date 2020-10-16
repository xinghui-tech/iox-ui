<template>
  <block>
    <demo-block title="基础用法">
      <iox-cell title="展示弹出层" is-link @click="showBasic" />
      <iox-popup
        :show="show.basic"
        custom-style="padding: 30px 50px"
        @close="hideBasic"
      >
        内容
      </iox-popup>
    </demo-block>

    <demo-block title="弹出位置">
      <iox-cell title="顶部弹出" is-link @click="showTop" />
      <iox-cell title="底部弹出" is-link @click="showBottom" />
      <iox-cell title="左侧弹出" is-link @click="showLeft" />
      <iox-cell title="右侧弹出" is-link @click="showRight" />

      <iox-popup
        :show="show.top"
        position="top"
        custom-style="height: 20%"
        @close="hideTop"
      />
      <iox-popup
        :show="show.bottom"
        position="bottom"
        custom-style="height: 20%"
        @close="hideBottom"
      />
      <iox-popup
        :show="show.left"
        position="left"
        custom-style="width: 20%; height: 100%"
        @close="hideLeft"
      />
      <iox-popup
        :show="show.right"
        position="right"
        custom-style="width: 20%; height: 100%"
        @close="hideRight"
      />
    </demo-block>

    <demo-block title="关闭图标">
      <iox-cell title="关闭图标" is-link @click="showCloseIcon" />
      <iox-cell title="自定义图标" is-link @click="showCustomCloseIcon" />
      <iox-cell title="图标位置" is-link @click="showCustomIconPosition" />

      <iox-popup
        :show="show.closeIcon"
        closeable
        position="bottom"
        custom-style="height: 20%"
        @close="hideCloseIcon"
      />

      <iox-popup
        :show="show.customCloseIcon"
        closeable
        close-icon="times-circle-o"
        position="bottom"
        custom-style="height: 20%"
        @close="hideCustomCloseIcon"
      />

      <iox-popup
        :show="show.customIconPosition"
        closeable
        close-icon-position="top-left"
        position="bottom"
        custom-style="height: 20%"
        @close="hideCustomIconPosition"
      />
    </demo-block>

    <demo-block title="圆角弹窗">
      <iox-cell title="圆角弹窗" is-link @click="showRound" />

      <iox-popup
        :show="show.round"
        round
        position="bottom"
        custom-style="height: 20%"
        @close="hideRound"
      />
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  private show = {
    basic: false,
    top: false,
    bottom: false,
    left: false,
    right: false,
    round: false,
    closeIcon: false,
    customCloseIcon: false,
    customIconPosition: false
  };

  toggle(type: string, show: boolean) {
    (this.show as any)[type] = show;
  }

  showBasic() {
    this.toggle('basic', true);
  }

  hideBasic() {
    this.toggle('basic', false);
  }

  showTop() {
    this.toggle('top', true);
  }

  hideTop() {
    this.toggle('top', false);
  }

  showLeft() {
    this.toggle('left', true);
  }

  hideLeft() {
    this.toggle('left', false);
  }

  showRight() {
    this.toggle('right', true);
  }

  hideRight() {
    this.toggle('right', false);
  }

  showBottom() {
    this.toggle('bottom', true);
  }

  hideBottom() {
    this.toggle('bottom', false);
  }

  showRound() {
    this.toggle('round', true);
  }

  hideRound() {
    this.toggle('round', false);
  }

  showCloseIcon() {
    this.toggle('closeIcon', true);
  }

  hideCloseIcon() {
    this.toggle('closeIcon', false);
  }

  showCustomCloseIcon() {
    this.toggle('customCloseIcon', true);
  }

  hideCustomCloseIcon() {
    this.toggle('customCloseIcon', false);
  }

  showCustomIconPosition() {
    this.toggle('customIconPosition', true);
  }

  hideCustomIconPosition() {
    this.toggle('customIconPosition', false);
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 弹出层',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-popup'
      // #endif
    };
  }
}
</script>

<style lang="less">
:host {
  font-size: 16px;
}
</style>
