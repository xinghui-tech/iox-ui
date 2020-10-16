<template>
  <block>
    <iox-grid :column-num="2" :border="false">
      <iox-grid-item use-slot>
        <h3 class="demo-sidebar-title">基础用法</h3>
        <iox-sidebar custom-class="custom-sidebar">
          <iox-sidebar-item title="标签名" />
          <iox-sidebar-item title="标签名" />
          <iox-sidebar-item title="标签名" />
        </iox-sidebar>
      </iox-grid-item>

      <iox-grid-item use-slot>
        <h3 class="demo-sidebar-title">徽标提示</h3>
        <iox-sidebar custom-class="custom-sidebar">
          <iox-sidebar-item title="标签名" dot />
          <iox-sidebar-item title="标签名" badge="5" />
          <iox-sidebar-item title="标签名" badge="99+" />
        </iox-sidebar>
      </iox-grid-item>

      <iox-grid-item use-slot>
        <h3 class="demo-sidebar-title">禁用选项</h3>
        <iox-sidebar custom-class="custom-sidebar">
          <iox-sidebar-item title="标签名" />
          <iox-sidebar-item title="标签名" disabled />
          <iox-sidebar-item title="标签名" />
        </iox-sidebar>
      </iox-grid-item>

      <iox-grid-item use-slot>
        <h3 class="demo-sidebar-title">监听切换事件</h3>
        <iox-sidebar custom-class="custom-sidebar" @change="onChange">
          <iox-sidebar-item title="标签名 1" />
          <iox-sidebar-item title="标签名 2" />
          <iox-sidebar-item title="标签名 3" />
        </iox-sidebar>
      </iox-grid-item>
    </iox-grid>

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
      @close="notify.show = false"
    />
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import {
  NotifyOptions, notify,
} from '../utils/notify';

@Component
export default class Index extends mixins(Fonts) {
  notify: NotifyOptions = notify();

  showNotify(options: NotifyOptions | string | {[key: string]: any}) {
    this.notify = notify(options);
  }

  onChange(index: number) {
    this.showNotify({
      type: 'primary',
      message: `切换至第${index}项`
    });
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 侧边栏',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-sidebar'
      // #endif
    };
  }
}
</script>

<style lang="less">
page {
  background-color: #fff;
}

.custom-sidebar {
  margin-left: 16px;
}

.demo-sidebar {
  background-color: #fff;
}

.demo-sidebar-title {
  margin-bottom: 16px;
  color: #969799;
  font-weight: normal;
  font-size: 14px;
}
</style>
