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
    <demo-block title="表单组件">
      <iox-cell title="Checkbox 复选框" url="/pages/checkboxs" isLink />
      <iox-cell title="Field 输入框" url="/pages/fields" isLink />
      <iox-cell title="Radio 点选框" url="/pages/radios" isLink />
      <iox-cell title="Switch 开关" url="/pages/switchs" isLink />
    </demo-block>
    <demo-block title="反馈组件">
      <iox-cell title="Dialog 对话框" url="/pages/dialogs" isLink />
      <iox-cell title="DropdownMenu 下拉菜单" url="/pages/dropdowns" isLink />
      <iox-cell title="Loading 加载" url="/pages/loadings" isLink />
      <iox-cell title="Overlay 遮罩层" url="/pages/overlays" isLink />
      <iox-cell title="Toast 轻提示" url="/pages/toasts" isLink />
    </demo-block>
    <demo-block title="展示组件">
      <iox-cell title="Panel 面板" url="/pages/panels" isLink />
      <iox-cell title="Sticky 粘性布局" url="/pages/stickies" isLink />
      <iox-cell title="Tag 标签" url="/pages/tags" isLink />
    </demo-block>
    <demo-block title="导航组件">
      <iox-cell title="Grid 宫格" url="/pages/grids" isLink />
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
