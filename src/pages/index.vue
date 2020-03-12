<template>
  <view>
    hello IOX-UI!
    <iox-button :loading="loading" loadingType="spinner" loadingText="loading" @click="onClick" type="primary" hairline >click me!</iox-button>
    <iox-transition custom-class="block">fade!</iox-transition>
    <iox-popup :show="popup" closeable @close="onClosePopup">Popup!</iox-popup>
    <iox-icon name="bell" />
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
}
</script>

<style lang="less">
</style>
