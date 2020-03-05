<template>
  <view>
    hello IOX-UI!
    <iox-button :loading="loading" loadingType="spinner" loadingText="loading" @click="onClick" type="primary" hairline >click me!</iox-button>
    <iox-transition custom-class="block">fade!</iox-transition>
    <iox-popup :show="popup" closeable>Popup!</iox-popup>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { logger } from '@zhuyin/common';

@Component
export default class Index extends Vue {
  // vuex
  loading: boolean = true;
  popup: boolean = false;

  onLoad() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onClick() {
    this.popup = !this.popup;
  }
}
</script>

<style lang="less">
</style>
