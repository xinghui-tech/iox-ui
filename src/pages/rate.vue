<template>
  <block>

    <demo-block title="基础用法">
      <iox-rate
        custom-class="rate-position"
        v-model="value1"
      />
    </demo-block>

    <demo-block title="自定义图标">
      <iox-rate
        custom-class="rate-position"
        icon="heart"
        void-icon="heart-o"
        v-model="value2"
      />
    </demo-block>

    <demo-block title="自定义样式">
      <iox-rate
        custom-class="rate-position"
        v-model="value3"
        :size="25"
        color="#ee0a24"
        void-color="#eee"
        void-icon="star"
      />
    </demo-block>

    <demo-block title="半星">
      <iox-rate
        custom-class="rate-position"
        v-model="value4"
        :size="25"
        allow-half
        color="#ee0a24"
        void-color="#eee"
        void-icon="star"
        :touchable="false"
      />
    </demo-block>

    <demo-block title="自定义数量">
      <iox-rate
        custom-class="rate-position"
        v-model="value5"
        :count="6"
      />
    </demo-block>

    <demo-block title="禁用状态">
      <iox-rate
        custom-class="rate-position"
        v-model="value6"
        disabled
      />
    </demo-block>

    <demo-block title="只读状态">
      <iox-rate
        custom-class="rate-position"
        v-model="value6"
        readonly
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
  value1= 3;
  value2= 3;
  value3= 3;
  value4= 2.5;
  value5= 4;
  value6= 3;

  onShareAppMessage() {

  }
}
</script>

<style lang="less">
  page {
    background-color: #fff;
  }

  .rate-position {
    margin-left: 15px;
  }
</style>
