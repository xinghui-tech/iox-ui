<template>
  <block>
    <view
      class="demo-home__title"
    >
      <image mode="aspectFit" class="demo-home__image" src="https://res.oss.zhuyin.club/assets/images/iox-ui.png" />
      <view class="demo-home__text">IOX-UI Uniapp</view>
    </view>
    <view class="demo-home__desc">
      Vant Uniapp版本 微信小程序 UI 组件库
    </view>
    <view>
      <demo-block title="基础组件">
        <iox-cell title="Button 按钮" url="/pages/buttons" isLink />
        <iox-cell title="Button Group 按钮组" url="/pages/button-groups" isLink />
        <iox-cell title="Cell 单元格" url="/pages/cells" isLink />
        <iox-cell title="Icon 图标" url="/pages/icons" isLink />
        <iox-cell title="Image 图片" url="/pages/images" isLink />
        <iox-cell title="Popup 弹出层" url="/pages/popups" isLink />
        <iox-cell title="Layout 布局" url="/pages/cols" isLink />
        <iox-cell title="Transition 动画" url="/pages/transitions" isLink />
      </demo-block>
      <demo-block title="表单组件">
        <iox-cell title="Calendar 日历" url="/pages/calendars" isLink />
        <iox-cell title="Checkbox 复选框" url="/pages/checkboxs" isLink />
        <iox-cell title="Datetime Picker 时间选择器" url="/pages/datetime-pickers" isLink />
        <iox-cell title="Field 输入框" url="/pages/fields" isLink />
        <iox-cell title="Picker 选择器" url="/pages/pickers" isLink />
        <iox-cell title="Radio 单选框" url="/pages/radios" isLink />
        <iox-cell title="Rate 评分" url="/pages/rate" isLink />
        <iox-cell title="Slider 滑块" url="/pages/slider" isLink />
        <iox-cell title="Search 搜索" url="/pages/searchs" isLink />
        <iox-cell title="Stepper 步进器" url="/pages/stepper" isLink />
        <iox-cell title="Switch 开关" url="/pages/switchs" isLink />
      </demo-block>
      <demo-block title="反馈组件">
        <iox-cell title="Dialog 对话框" url="/pages/dialogs" isLink />
        <iox-cell title="DropdownMenu 下拉菜单" url="/pages/dropdowns" isLink />
        <iox-cell title="Loading 加载" url="/pages/loadings" isLink />
        <iox-cell title="Overlay 遮罩层" url="/pages/overlays" isLink />
        <iox-cell title="Share Sheet 分享面板" url="/pages/share-sheet" isLink />
        <iox-cell title="Toast 轻提示" url="/pages/toasts" isLink />
      </demo-block>
      <demo-block title="展示组件">
        <iox-cell title="Collapse 折叠面板" url="/pages/collapses" isLink />
        <iox-cell title="Panel 面板" url="/pages/panels" isLink />
        <iox-cell title="Sticky 粘性布局" url="/pages/stickies" isLink />
        <iox-cell title="Steps 步骤条" url="/pages/steps" isLink />
        <iox-cell title="Tag 标签" url="/pages/tags" isLink />
      </demo-block>
      <demo-block title="导航组件">
        <iox-cell title="Grid 宫格" url="/pages/grids" isLink />
        <iox-cell title="Tab 标签页" url="/pages/tabs" isLink />
      </demo-block>
    </view>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  onLoad() {
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {

  }
}
</script>

<style lang="less">
.demo-home {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 46px 20px 20px;
  background: #fff;
}

.demo-home__title,
.demo-home__desc {
  padding-left: 16px;
  font-weight: normal;
  line-height: 1;
  user-select: none;
}

.demo-home__title {
  margin: 0 0 16px;
  font-size: 32px;
}

.demo-home__image,
.demo-home__text {
  display: inline-block;
  vertical-align: middle;
}

.demo-home__image {
  width: 32px;
  height: 32px;
}

.demo-home__text {
  margin-left: 16px;
  font-weight: 500;
}

.demo-home__title .demo-home--small {
  font-size: 24px;
}

.demo-home__desc {
  margin: 0 0 20px;
  color: rgba(69, 90, 100, 0.6);
  font-size: 14px;
}

</style>
