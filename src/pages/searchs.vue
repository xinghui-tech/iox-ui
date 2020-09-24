<template>
  <block>
    <demo-block title="基本用法">
      <iox-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </demo-block>

    <demo-block title="事件监听">
      <iox-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onClear"
      />
    </demo-block>

    <demo-block title="搜索框内容对齐">
      <iox-search
        v-model="value"
        input-align="center"
        placeholder="请输入搜索关键词"
      />
    </demo-block>

    <demo-block title="禁用搜索框">
      <iox-search
        v-model="value"
        disabled
        placeholder="请输入搜索关键词"
      />
    </demo-block>

    <demo-block title="自定义背景色">
      <iox-search
        v-model="value"
        shape="round"
        background="#4fc08d"
        placeholder="请输入搜索关键词"
      />
    </demo-block>

    <demo-block title="自定义按钮">
      <iox-search
        v-model="value"
        label="地址"
        shape="round"
        placeholder="请输入搜索关键词"
        use-action-slot
        @search="onSearch"
      >
        <view slot="action" @tap="onClick">搜索</view>
      </iox-search>
    </demo-block>
</block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import icons from '../awesome-font-icons';


@Component
export default class Index extends mixins(Fonts) {
  value: any = '';

  onChange(e: TouchEvent) {
    this.value = e.detail;
  }

  onSearch() {
    if (this.value) {
      wx.showToast({
        title: '搜索：' + this.value,
        icon: 'none'
      });
    }
  }

  onClick() {
    if (this.value) {
      wx.showToast({
        title: '搜索：' + this.value,
        icon: 'none'
      });
    }
  }

  onCancel() {
    wx.showToast({
      title: '取消',
      icon: 'none'
    });
  }

  onClear() {
    wx.showToast({
      title: '清空',
      icon: 'none'
    });
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }
}
</script>

<style lang="less">

</style>
