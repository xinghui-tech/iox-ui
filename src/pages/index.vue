<template>
  <view>
    <iox-cell title="单元格cell" url="/pages/cells" isLink />
    <iox-cell title="标签tag" url="/pages/tags" isLink />
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';

@Component
export default class Index extends Vue {
  onLoad() {
  }
}
</script>

<style lang="less">
</style>
