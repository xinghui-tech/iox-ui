<template>
  <view>
    hello IOX-UI!
    <iox-button :loading="loading" loadingType="spinner" loadingText="loading" @click="onClick" type="primary" hairline >click me!</iox-button>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { logger } from '@zhuyin/common';

import ioxButton from '@/components/iox-button/iox-button.vue';

@Component({
  components: {
    ioxButton,
  }
})
export default class Index extends Vue {
  // vuex
  loading: boolean = true;

  onLoad() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onClick() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
</script>

<style lang="less">
</style>
