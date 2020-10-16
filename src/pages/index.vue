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
        <iox-cell title="Button 按钮" url="/pages/buttons" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Button Group 按钮组" url="/pages/button-groups" :icon="iconVantX" value="老糊涂" isLink />
        <iox-cell title="Cell 单元格" url="/pages/cells" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Icon 图标" url="/pages/icons" :icon="iconVantX" value="老糊涂" isLink />
        <iox-cell title="Image 图片" url="/pages/images" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Popup 弹出层" url="/pages/popups" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Layout 布局" url="/pages/cols" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Transition 动画" url="/pages/transitions" :icon="iconVant" value="老糊涂" isLink />
      </demo-block>
      <demo-block title="表单组件">
        <iox-cell title="Calendar 日历" url="/pages/calendars" :icon="iconVantX" value="老糊涂" isLink />
        <iox-cell title="Checkbox 复选框" url="/pages/checkboxs" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Datetime Picker 时间选择" url="/pages/datetime-pickers" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Field 输入框" url="/pages/fields" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Picker 选择器" url="/pages/pickers" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Radio 单选框" url="/pages/radios" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Rate 评分" url="/pages/rate" :icon="iconVant" value="春雨" isLink />
        <iox-cell title="Slider 滑块" url="/pages/slider" :icon="iconVant" value="春雨" isLink />
        <iox-cell title="Search 搜索" url="/pages/searchs" :icon="iconVant" value="春雨" isLink />
        <iox-cell title="Stepper 步进器" url="/pages/steppers" :icon="iconVant" value="春雨" isLink />
        <iox-cell title="Switch 开关" url="/pages/switchs" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Uploaders 文件上传" url="/pages/uploaders" :icon="iconVant" value="老糊涂" isLink />
      </demo-block>
      <demo-block title="反馈组件">
        <iox-cell title="Action-Sheet 上拉菜单" url="/pages/action-sheet" :icon="iconVant" value="春雨" isLink />
        <iox-cell title="Dialog 对话框" url="/pages/dialogs" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="DropdownMenu 下拉菜单" url="/pages/dropdowns" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Loading 加载" url="/pages/loadings" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Mask 蒙板" url="/pages/masks" :icon="iconXinghui" value="老糊涂" isLink />
        <iox-cell title="Notify 消息通知" url="/pages/notify" :icon="iconVant" value="春雨" isLink />
        <iox-cell title="Overlay 遮罩层" url="/pages/overlays" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Share Sheet 分享面板" url="/pages/share-sheet" :icon="iconVant" value="春雨" isLink />
        <iox-cell title="SwipeCell 滑动单元格" url="/pages/swipe-cell" :icon="iconVant" value="春雨" isLink />
        <iox-cell title="Toast 轻提示" url="/pages/toasts" :icon="iconVant" value="老糊涂" isLink />
      </demo-block>
      <demo-block title="展示组件">
        <iox-cell title="Circle 进度条" url="/pages/circles" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Collapse 折叠面板" url="/pages/collapses" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="CountDown 倒计时" url="/pages/countdowns" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Divider 分割线" url="/pages/dividers" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Empty 空状态" url="/pages/empties" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Noticebar 通告栏" url="/pages/noticebars" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Panel 面板" url="/pages/panels" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Progress 进度条" url="/pages/progresses" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Skeleton 骨架屏" url="/pages/skeletons" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Sticky 粘性布局" url="/pages/stickies" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Steps 步骤条" url="/pages/steps" :icon="iconVant" value="春雨" isLink />
        <iox-cell title="Tag 标签" url="/pages/tags" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Tree Select 分类选择" url="/pages/tree-selects" :icon="iconVant" value="老糊涂" isLink />
      </demo-block>
      <demo-block title="导航组件">
        <iox-cell title="Indexbar 索引栏" url="/pages/indexbars" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Grid 宫格" url="/pages/grids" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Navbar 导航栏" url="/pages/navbars" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Sidebar 侧边导航" url="/pages/sidebars" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Tab 标签页" url="/pages/tabs" :icon="iconVant" value="老糊涂" isLink />
        <iox-cell title="Tabbar 标签栏" url="/pages/tabbars" :icon="iconVant" value="老糊涂" isLink />
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

  iconVant = "https://img.yzcdn.cn/vant/logo.png";
  iconVantX = "https://res.oss.zhuyin.club/assets/images/iox-ui.png";
  iconXinghui = "https://res.oss.zhuyin.club/assets/images/iox-ui.png";

  onShareAppMessage() {
    return {
      title: 'IOX UI 组件演示',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI（Vant UI的UNIAPP版）组件功能演示'
      // #endif
    };
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
