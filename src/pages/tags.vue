<template>
  <view>
    <iox-tag class="demo-margin-right">基础</iox-tag>
    <iox-tag class="demo-margin-right" type="primary">标签</iox-tag>
    <iox-tag class="demo-margin-right" type="success">标签</iox-tag>
    <iox-tag class="demo-margin-right" type="danger">标签</iox-tag>
    <iox-tag class="demo-margin-right" type="warning">标签</iox-tag>

    <iox-tag class="demo-margin-right" round>圆角</iox-tag>
    <iox-tag class="demo-margin-right" round type="primary">标签</iox-tag>
    <iox-tag class="demo-margin-right" round type="success">标签</iox-tag>
    <iox-tag class="demo-margin-right" round type="danger">标签</iox-tag>
    <iox-tag class="demo-margin-right" round type="warning">标签</iox-tag>

    <iox-tag class="demo-margin-right" mark>标记</iox-tag>
    <iox-tag class="demo-margin-right" mark type="primary">标签</iox-tag>
    <iox-tag class="demo-margin-right" mark type="success">标签</iox-tag>
    <iox-tag class="demo-margin-right" mark type="danger">标签</iox-tag>
    <iox-tag class="demo-margin-right" mark type="warning">标签</iox-tag>

    <iox-tag class="demo-margin-right" plain>空心</iox-tag>
    <iox-tag class="demo-margin-right" plain type="primary">标签</iox-tag>
    <iox-tag class="demo-margin-right" plain type="success">标签</iox-tag>
    <iox-tag class="demo-margin-right" plain type="danger">标签</iox-tag>
    <iox-tag class="demo-margin-right" plain type="warning">标签</iox-tag>

    <iox-tag class="demo-margin-right" color="#f2826a">自定义颜色</iox-tag>
    <iox-tag class="demo-margin-right" color="#f2826a" plain>标签</iox-tag>
    <iox-tag class="demo-margin-right" color="#7232dd">标签</iox-tag>
    <iox-tag class="demo-margin-right" color="#7232dd" plain>标签</iox-tag>
    <iox-tag class="demo-margin-right" color="#ffe1e1" text-color="#ad0000">标签</iox-tag>

    <iox-tag
      v-if="show.primary"
      type="primary"
      size="medium"
      closeable
      @close="onClose('primary')"
      >可关闭-标签</iox-tag
    >
    <iox-tag
      v-if="show.success"
      type="success"
      size="medium"
      closeable
      @close="onClose('success')"
      >可关闭-标签</iox-tag
    >
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';

@Component
export default class Index extends Vue {
  show = {
    success: true,
    primary: true
  }

  onLoad() {
  }
}
</script>

<style lang="less">
</style>
