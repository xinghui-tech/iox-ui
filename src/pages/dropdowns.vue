<template>
  <block>
    <demo-block custom-class="white" title="基础用法" padding>
      <iox-dropdown-menu>
        <iox-dropdown-item v-model="value1" :options="option1" />
        <iox-dropdown-item v-model="value2" :options="option2" />
      </iox-dropdown-menu>
    </demo-block>

    <demo-block custom-class="white" title="自定义菜单内容" padding>
      <iox-dropdown-menu>
        <iox-dropdown-item v-model="value1" :options="option1" />
        <iox-dropdown-item ref="item" :title="itemTitle">
          <iox-cell :title="switchTitle1">
            <iox-switch
            slot="right-icon"
            size="24px"
            style="height: 26px"
            v-model="switch1"
            />
          </iox-cell>
          <iox-cell :title="switchTitle2">
            <iox-switch
            slot="right-icon"
            size="24px"
            style="height: 26px"
            v-model="switch2"
            />
          </iox-cell>
          <iox-button type="info" block @click="onConfirm">
            确定
          </iox-button>
        </iox-dropdown-item>
      </iox-dropdown-menu>
    </demo-block>

    <demo-block custom-class="white" title="自定义选中状态颜色" padding>
      <iox-dropdown-menu active-color="#ee0a24">
        <iox-dropdown-item v-model="value1" :options="option1" />
        <iox-dropdown-item v-model="value2" :options="option2" />
      </iox-dropdown-menu>
    </demo-block>

    <demo-block custom-class="white" title="向上展开" padding>
      <iox-dropdown-menu direction="up">
        <iox-dropdown-item v-model="value1" :options="option1" />
        <iox-dropdown-item v-model="value2" :options="option2" />
      </iox-dropdown-menu>
    </demo-block>

    <demo-block custom-class="white" title="禁用菜单" padding>
      <iox-dropdown-menu>
        <iox-dropdown-item v-model="value1" disabled :options="option1" />
        <iox-dropdown-item v-model="value2" disabled :options="option2" />
      </iox-dropdown-menu>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  switchTitle1 = '包邮';
  switchTitle2 = '团购';
  itemTitle = '筛选';
  option1 = [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 }
  ];
  option2 = [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' }
  ];
  switch1 = true;
  switch2 = false;
  value1 = 0;
  value2 = 'a';

  onConfirm() {
    (this.$refs.item as any).toggle();
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }
}
</script>

<style lang="less">
page {
  background-color: white;
}
</style>
