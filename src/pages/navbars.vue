<template>
  <block>
    <demo-block title="基础用法">
      <iox-nav-bar
        title="标题"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </demo-block>

    <demo-block title="高级用法">
      <iox-nav-bar title="标题" left-text="返回" left-arrow>
        <iox-icon name="search" slot="right" custom-class="icon" size="18" />
      </iox-nav-bar>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  onClickLeft() {
    uni.showToast({ title: '点击返回', icon: 'none' });
  }

  onClickRight() {
    uni.showToast({ title: '点击按钮', icon: 'none' });
  }

  onShareAppMessage() {
    
  }
}
</script>

<style lang="less">
.icon {
  color: #1989fa;
}
</style>
