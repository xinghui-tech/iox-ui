<template>
  <view>
    <demo-block title="基础用法" boxing-bgd-url="https://res.oss.zhuyin.club/res/0/60/picture/0/202007/23/2020072316355-7731.jpg">
      <iox-cell-group>
        <iox-cell title="单元格" value="内容" />
        <iox-cell
          title="单元格"
          value="内容"
          label="描述信息"
          :border="false"
        />
      </iox-cell-group>
    </demo-block>

    <demo-block title="单元格大小" :boxing-height="600" boxing-width="" boxing-bgd-url="https://res.oss.zhuyin.club/res/0/60/picture/0/202007/23/2020072316355-7731.jpg">
      <iox-cell-group>
        <iox-cell
          title="单元格"
          value="内容"
          size="large"
        />
        <iox-cell
          title="单元格"
          value="内容"
          size="large"
          use-label-slot
          :border="false"
        >
          <view slot="label">描述信息</view>
        </iox-cell>
      </iox-cell-group>
    </demo-block>

    <demo-block title="展示图标">
      <iox-cell
        title="单元格"
        value="内容"
        icon="bath"
        :border="false"
      />
    </demo-block>

    <demo-block title="展示箭头">
      <iox-cell title="单元格" is-link />
      <iox-cell
        title="单元格"
        value="内容"
        is-link
      />
      <iox-cell
        title="单元格"
        is-link
        arrow-direction="down"
        value="内容"
        :border="false"
      />
    </demo-block>

    <demo-block title="页面跳转">
      <iox-cell title="单元格" is-link url="/pages/dashboard/index" />
      <iox-cell title="单元格" is-link url="/pages/dashboard/index" link-type="redirectTo" />
    </demo-block>

    <demo-block title="分组标题">
      <iox-cell-group title="分组 1">
        <iox-cell title="单元格" value="内容" />
      </iox-cell-group>
      <iox-cell-group title="分组 2">
        <iox-cell title="单元格" value="内容" />
      </iox-cell-group>
    </demo-block>

    <demo-block title="使用插槽">
      <iox-cell value="内容" icon="shopping-cart " is-link>
        <view slot="title">
          <view class="title">单元格</view>
          <iox-tag type="danger">标签</iox-tag>
        </view>
      </iox-cell>
      <iox-cell title="单元格" :border="false">
        <iox-icon slot="right-icon" name="search" />
      </iox-cell>
    </demo-block>

    <demo-block title="垂直居中">
      <iox-cell
        center
        title="单元格"
        value="内容"
        label="描述信息"
      />
    </demo-block>
  </view>
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

  onLoad() {
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 单元格',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-cell'
      // #endif
    };
  }
}
</script>

<style lang="less">
.title {
  margin-right: 5px;
  display: inline-block;
  vertical-align: middle;
}
</style>
