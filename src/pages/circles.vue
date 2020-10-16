<template>
  <block>
    <demo-block title="基础用法">
      <iox-circle type="2d" :value="value" :text="value + '%'" />
    </demo-block>

    <demo-block title="样式定制">
      <view>
        <iox-circle :value="value" :stroke-width="6" text="宽度定制" />
        <iox-circle :value="value" layer-color="#eee" color="#ee0a24" text="颜色定制" />
        <iox-circle :value="value" :color="gradientColor" text="渐变色" />
        <iox-circle :value="value" color="#07c160" :clockwise="false" text="逆时针" />
        <iox-circle :value="value" :size="120" text="大小定制" />
      </view>
    </demo-block>
    <view>
      <iox-button type="primary" size="small" @click="run(10)">增加</iox-button>
      <iox-button type="danger" size="small" @click="run(-10)">减少</iox-button>
    </view>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

const format = (rate: number) => Math.min(Math.max(rate, 0), 100);

@Component
export default class Index extends mixins(Fonts) {
  value = 25;
  gradientColor = {
    '0%': '#ffd01e',
    '100%': '#ee0a24'
  };

  run(step: number) {
    this.value = format((this.value += step));
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 圆形进度条',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-circle'
      // #endif
    };
  }
}
</script>

<style lang="less">
.iox-circle {
  margin: 5px 10px 20px;
}
.iox-button{
  margin-left: 10px;
}
</style>
