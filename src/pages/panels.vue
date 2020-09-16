<template>
  <block>
    <demo-block title="基础用法">
      <iox-panel title="标题" desc="描述信息" status="状态">
        <view class="content">内容</view>
      </iox-panel>
    </demo-block>

    <demo-block title="高级用法">
      <iox-panel title="标题" desc="描述信息" status="状态" use-footer-slot>
        <view class="content">内容</view>
        <view slot="footer" class="footer">
          <iox-button size="small" class="demo-margin-right">按钮</iox-button>
          <iox-button size="small" type="danger">按钮</iox-button>
        </view>
      </iox-panel>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
}
</script>

<style lang="less">
.content {
  padding: 20px;
  font-size: 16px;
}

.footer {
  text-align: right;
}
</style>
