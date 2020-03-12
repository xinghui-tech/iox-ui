<template>
  <view>
    hello IOX-UI!
    <!-- button -->
    <iox-button :loading="loading" loadingType="spinner" loadingText="loading" @click="onClick" type="primary" hairline >click me!</iox-button>
    <iox-transition custom-class="block">fade!</iox-transition>
    <iox-icon name="bell" />
    <!-- popup -->
    <iox-popup :show="popup" :overlay="true"
    :round="false"
    closeable
    transition="slide"
    custom-style="height: 100%;width:20%;"
    position="left"
    @close="onClosePopup">
      Popup!!
    </iox-popup>
    <!-- tag -->
    <block>

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
    </block>

  </view>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';

@Component
export default class Index extends Vue {
  // vuex
  loading = true;
  popup = false;

  show = {
    success: true,
    primary: true
  }

  onLoad() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onClick() {
    this.popup = !this.popup;
  }

  onClosePopup() {
    this.popup = false;
  }

  onClose(event: TouchEvent) {
    const dataset: any = event.currentTarget;
    (this as any).show[dataset.id] = false;
  }
}
</script>

<style lang="less">
</style>
