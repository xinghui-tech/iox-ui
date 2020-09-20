<template>
  <block>
    <demo-block title="基础用法" padding>
      <iox-switch
        v-model="checked"
      />
    </demo-block>

    <demo-block title="禁用状态" padding>
      <iox-switch
        v-model="checked"
        disabled
      />
    </demo-block>

    <demo-block title="加载状态" padding>
      <iox-switch
        v-model="checked"
        loading
      />
    </demo-block>

    <demo-block title="自定义大小" padding>
      <iox-switch
        v-model="checked"
        size="24px"
      />
    </demo-block>

    <demo-block title="自定义颜色" padding>
      <iox-switch
        v-model="checked"
        active-color="#07c160"
        inactive-color="#ee0a24"
      />
    </demo-block>

    <demo-block title="异步控制" padding>
      <iox-switch
        :value="checked2"
        size="36px"
        @change="onChange2"
      />
    </demo-block>

    <!-- <iox-dialog id="iox-dialog" /> -->
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  checked = true;
  checked2 = true;

  onChange2(value: any) {
    // Dialog.confirm({
    //   title: '提示',
    //   message: '是否切换开关？'
    // }).then((res) => {
    //   this.checked2 = value;
    // });
  }
}
</script>

<style lang="less">
</style>
