<template>
  <block>
    <demo-block title="基本用法">
      <iox-grid>
        <iox-grid-item icon="photo" text="文字" v-for="item in array4" :key="item" />
      </iox-grid>
    </demo-block>

    <demo-block title="自定义列数">
      <iox-grid column-num="3">
        <iox-grid-item icon="photo" text="文字" v-for="item in array6" :key="item" />
      </iox-grid>
    </demo-block>

    <demo-block title="自定义内容">
      <iox-grid column-num="3" :border="false">
        <iox-grid-item use-slot v-for="item in array3" :key="item">
          <image style="width: 100%; height: 90px;" :src="'https://img.yzcdn.cn/vant/apple-' + (item + 1) + '.jpg'" />
        </iox-grid-item>
      </iox-grid>
    </demo-block>

    <demo-block title="正方形格子">
      <iox-grid square>
        <iox-grid-item icon="photo" text="文字" v-for="item in array8" :key="item" />
      </iox-grid>
    </demo-block>

    <demo-block title="格子间距">
      <iox-grid :gutter="10">
        <iox-grid-item icon="photo" text="文字" v-for="item in array8" :key="item" />
      </iox-grid>
    </demo-block>

    <demo-block title="内容横排">
      <iox-grid direction="horizontal" column-num="3">
        <iox-grid-item icon="photo" text="文字" v-for="item in array3" :key="item" />
      </iox-grid>
    </demo-block>

    <demo-block title="页面跳转">
      <iox-grid clickable column-num="2">
        <iox-grid-item icon="home" link-type="navigateTo" url="/pages/index" text="Navigate 跳转" />
        <iox-grid-item icon="search" link-type="reLaunch" url="/pages/index" text="ReLaunch 跳转" />
      </iox-grid>
    </demo-block>

    <demo-block title="徽标提示">
      <iox-grid column-num="2">
        <iox-grid-item icon="home" text="文字" dot />
        <iox-grid-item icon="search" text="文字" badge="99+" />
      </iox-grid>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  array3 = [0, 1, 2];
  array4 = [0, 1, 2, 3];
  array6 = [0, 1, 2, 3, 4, 5];
  array8 = [0, 1, 2, 3, 4, 5, 6, 7];

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }
}
</script>

<style lang="less">
</style>
