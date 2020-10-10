<template>
  <block>
    <demo-block title="基础用法">
      <iox-progress custom-class="progress-position" percentage="50" />
    </demo-block>

    <demo-block title="线条粗细">
      <iox-progress custom-class="progress-position" stroke-width="8" percentage="50" />
    </demo-block>

    <demo-block title="置灰">
      <iox-progress custom-class="progress-position" inactive percentage="50" />
    </demo-block>

    <demo-block title="样式定制">
      <iox-progress custom-class="progress-position" pivot-text="橙色" color="#f2826a" percentage="25" />
      <iox-progress custom-class="progress-position" pivot-text="红色" color="#ee0a24" percentage="50" />
      <iox-progress
        custom-class="progress-position"
        percentage="75"
        pivot-text="紫色"
        pivot-color="#7232dd"
        color="linear-gradient(to right, #be99ff, #7232dd)"
      />
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  onShareAppMessage() {
    
  }
}
</script>

<style lang="less">
.progress-position {
  margin: 5px 15px 20px;
}
</style>
