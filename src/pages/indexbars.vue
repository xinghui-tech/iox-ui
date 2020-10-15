<template>
  <iox-tabs
    :active="activeTab"
    @change="onChange"
  >
    <iox-tab title="基础用法">
      <iox-index-bar
        v-if="activeTab === 0"
        :scroll-top="scrollTop"
      >
        <view
          v-for="(item) in indexList"
          :key="item"
        >
          <iox-index-anchor :anchor="item" />
          <iox-cell title="文本" />
          <iox-cell title="文本" />
          <iox-cell title="文本" />
        </view>
      </iox-index-bar>
    </iox-tab>

    <iox-tab title="自定义索引列表">
      <iox-index-bar
        v-if="activeTab === 1"
        :index-list="customIndexList"
        :scroll-top="scrollTop"
      >
        <view
          v-for="(item, index) in customIndexList"
          :key="index"
        >
          <iox-index-anchor
            use-slot
            :anchor="item"
          >
            <text>标题{{ item }}</text>
          </iox-index-anchor>
          <iox-cell title="文本" />
          <iox-cell title="文本" />
          <iox-cell title="文本" />
        </view>
      </iox-index-bar>
    </iox-tab>
  </iox-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

const indexList: string[] = [];
const charCodeOfA = 'A'.charCodeAt(0);
for (let i = 0; i < 26; i++) {
  indexList.push(String.fromCharCode(charCodeOfA + i));
}

@Component
export default class Index extends mixins(Fonts) {
  activeTab: string | number = 0;
  indexList = indexList;
  customIndexList = [1, 2, 3, 4, 5, 6, 8, 9, 10];
  scrollTop = 0;

  onChange(tab: {index: number; name: string | number}) {
    this.activeTab = tab.index;
  }

  onPageScroll(event: Event) {
    this.scrollTop = (event as any).scrollTop;
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 索引栏',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-index-bar'
      // #endif
    };
  }
}
</script>

<style lang="less">
</style>
