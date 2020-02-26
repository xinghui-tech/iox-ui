<template>
  <view>
    hello IOX-UI!
    <iox-loading type="spinner" />
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { logger } from '@zhuyin/common';

import IoxLoading from '../components/iox-loading/iox-loading.vue';

@Component({
  components: {
    IoxLoading,
  }
})
export default class Index extends Vue {
  // vuex

}
</script>

<style lang="less">
</style>
