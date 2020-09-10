<template>
  <block>
    <demo-block title="加载类型" padding>
      <iox-loading custom-class="demo-loading" />
      <iox-loading custom-class="demo-loading" type="spinner" />
    </demo-block>

    <demo-block title="自定义颜色" padding>
      <iox-loading custom-class="demo-loading" color="#1989fa" />
      <iox-loading custom-class="demo-loading" type="spinner" color="#1989fa" />
    </demo-block>

    <demo-block title="加载文案" padding>
      <iox-loading custom-class="demo-loading" size="24px">加载中...</iox-loading>
    </demo-block>

    <demo-block title="垂直排列" padding>
      <iox-loading custom-class="demo-loading" size="24px" vertical>加载中...</iox-loading>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  show = {
    success: true,
    primary: true
  };

  onClose(event: CustomEvent) {
    
  }
}
</script>

<style lang="less">
.demo-loading {
  margin: 4px 16px 4px 0;
}
</style>
