<template>
  <block>
    <demo-block title="基础用法">
      <iox-tabbar
        :active="active"
        custom-class="tabbar-position"
        :safe-area-inset-bottom="false"
        @change="(value) => onChange('active', value)"
      >
        <iox-tabbar-item icon="home">标签</iox-tabbar-item>
        <iox-tabbar-item icon="search">标签</iox-tabbar-item>
        <iox-tabbar-item icon="user">标签</iox-tabbar-item>
        <iox-tabbar-item icon="gear">标签</iox-tabbar-item>
      </iox-tabbar>
    </demo-block>

    <demo-block title="通过名称匹配">
      <iox-tabbar
        :active="active2"
        data-key="active2"
        custom-class="tabbar-position"
        :safe-area-inset-bottom="false"
        @change="(value) => onChange('active2', value)"
      >
        <iox-tabbar-item name="home" icon="home">标签</iox-tabbar-item>
        <iox-tabbar-item name="search" icon="search">标签</iox-tabbar-item>
        <iox-tabbar-item name="friends" icon="user">标签</iox-tabbar-item>
        <iox-tabbar-item name="setting" icon="gear">标签</iox-tabbar-item>
      </iox-tabbar>
    </demo-block>

    <demo-block title="显示徽标">
      <iox-tabbar
        :active="active3"
        data-key="active3"
        custom-class="tabbar-position"
        :safe-area-inset-bottom="false"
        @change="(value) => onChange('active3', value)"
      >
        <iox-tabbar-item icon="home">标签</iox-tabbar-item>
        <iox-tabbar-item icon="search" dot>标签</iox-tabbar-item>
        <iox-tabbar-item icon="user" info="5">标签</iox-tabbar-item>
        <iox-tabbar-item icon="gear" info="20">标签</iox-tabbar-item>
      </iox-tabbar>
    </demo-block>

    <demo-block title="自定义图标">
      <iox-tabbar
        :active="active4"
        data-key="active4"
        custom-class="tabbar-position"
        :safe-area-inset-bottom="false"
        @change="(value) => onChange('active4', value)"
      >
        <iox-tabbar-item info="3">
          <image
            slot="icon"
            :src="icon.normal"
            mode="aspectFit"
            style="width: 30px; height: 18px;"
          />
          <image
            slot="icon-active"
            :src="icon.active"
            mode="aspectFit"
            style="width: 30px; height: 18px;"
          />
          自定义
        </iox-tabbar-item>
        <iox-tabbar-item icon="search">标签</iox-tabbar-item>
        <iox-tabbar-item icon="gear">标签</iox-tabbar-item>
      </iox-tabbar>
    </demo-block>

    <demo-block title="自定义颜色">
      <iox-tabbar
        :active="active5"
        data-key="active5"
        custom-class="tabbar-position"
        active-color="#07c160"
        inactive-color="#000"
        :safe-area-inset-bottom="false"
        @change="(value) => onChange('active5', value)"
      >
        <iox-tabbar-item icon="home">标签</iox-tabbar-item>
        <iox-tabbar-item icon="search">标签</iox-tabbar-item>
        <iox-tabbar-item icon="user">标签</iox-tabbar-item>
        <iox-tabbar-item icon="gear">标签</iox-tabbar-item>
      </iox-tabbar>
    </demo-block>


    <demo-block title="切换标签事件">
      <iox-tabbar
        :active="active6"
        data-key="active6"
        custom-class="tabbar-position"
        :safe-area-inset-bottom="false"
        @change="(value) => handleChange('active6', value)"
      >
        <iox-tabbar-item icon="home">标签1</iox-tabbar-item>
        <iox-tabbar-item icon="search">标签2</iox-tabbar-item>
        <iox-tabbar-item icon="user">标签3</iox-tabbar-item>
        <iox-tabbar-item icon="gear">标签4</iox-tabbar-item>
      </iox-tabbar>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  active = 0;
  active2 = 'home';
  active3 = 0;
  active4 = 0;
  active5 = 0;
  active6 = 0;
  icon = {
    normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
    active: 'https://img.yzcdn.cn/vant/user-active.png'
  }

  onChange(key: string, value: number | string) {
    (this as any)[key] = value;
  }

  handleChange(key: string, value: number | string) {
    (this as any)[key] = value;
    wx.showToast({ title: `点击标签 ${value as number + 1}`, icon: 'none' });
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }
}
</script>

<style lang="less">
.tabbar-position {
  position: relative !important;
}
</style>
