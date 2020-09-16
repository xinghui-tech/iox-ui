<template>
  <view>
    <demo-block title="基础组件">
      <iox-cell title="Button 按钮" url="/pages/buttons" isLink />
      <iox-cell title="Cell 单元格" url="/pages/cells" isLink />
      <iox-cell title="Icon 图标" url="/pages/icons" isLink />
      <iox-cell title="Image 图片" url="/pages/images" isLink />
      <iox-cell title="Popup 弹出层" url="/pages/popups" isLink />
      <iox-cell title="Layout 布局" url="/pages/cols" isLink />
      <iox-cell title="Transition 动画" url="/pages/transitions" isLink />
    </demo-block>
    <demo-block title="反馈组件">
      <iox-cell title="Loading 加载" url="/pages/loadings" isLink />
    </demo-block>
    <demo-block title="展示组件">
      <iox-cell title="Sticky 粘性布局" url="/pages/stickies" isLink />
      <iox-cell title="Tag 标签" url="/pages/tags" isLink />
    </demo-block>
    <demo-block title="导航组件">
      <iox-cell title="Tab 标签页" url="/pages/tabs" isLink />
    </demo-block>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  onLoad() {
  }
}
</script>

<style lang="less">
</style>
