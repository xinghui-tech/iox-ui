<template>
  <view>
    <demo-block title="基础用法">
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

    <demo-block title="单元格大小">
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
        icon="location-o"
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
      <iox-cell value="内容" icon="shop-o" is-link>
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
import Component from 'vue-class-component';

@Component
export default class Index extends Vue {
  show = {
    success: true,
    primary: true
  }

  onLoad() {
  }
}
</script>

<style lang="less">
</style>
