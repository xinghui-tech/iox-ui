<template>
  <block>
    <demo-block title="基础用法" padding>
      <iox-row>
        <iox-col span="8" custom-class="dark">span: 8</iox-col>
        <iox-col span="8" custom-class="light">span: 8</iox-col>
        <iox-col span="8" custom-class="dark">span: 8</iox-col>
      </iox-row>

      <iox-row>
        <iox-col span="4" custom-class="dark">span: 4</iox-col>
        <iox-col span="10" offset="4" custom-class="light">offset: 4, span: 10</iox-col>
      </iox-row>

      <iox-row>
        <iox-col offset="12" span="12" custom-class="dark">offset: 12, span: 12</iox-col>
      </iox-row>
    </demo-block>

    <demo-block title="在列元素之间增加间距" padding>
      <iox-row :gutter="gutter" @click="gutter = (gutter === 10 ? 20 : 10)">
        <iox-col span="8" custom-class="dark">span: 8</iox-col>
        <iox-col span="8" custom-class="light">span: 8</iox-col>
        <iox-col span="8" custom-class="dark">span: 8</iox-col>
      </iox-row>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  gutter = 20;

  onShareAppMessage() {
    
  }
}
</script>

<style lang="less">
.dark,
.light {
  color: #fff;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 10px;
  background-clip: content-box;
}

.dark {
  background-color: #39a9ed;
}

.light {
  background-color: #66c6f2;
}

</style>
