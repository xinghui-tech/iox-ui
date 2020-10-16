<template>
<block>
  <demo-block title="按钮类型" padding>
    <view class="row">
      <iox-button class="demo-margin-right">默认按钮</iox-button>
      <iox-button type="primary" class="demo-margin-right">主要按钮</iox-button>
      <iox-button type="info" class="demo-margin-right">信息按钮</iox-button>
    </view>
    <iox-button type="danger" class="demo-margin-right">危险按钮</iox-button>
    <iox-button type="warning">警告按钮</iox-button>
  </demo-block>

  <demo-block title="朴素按钮" padding>
    <iox-button type="primary" plain class="demo-margin-right">朴素按钮</iox-button>
    <iox-button type="info" plain>朴素按钮</iox-button>
  </demo-block>

  <demo-block title="细边框" padding>
    <iox-button type="primary" plain hairline class="demo-margin-right">细边框按钮</iox-button>
    <iox-button type="info" plain hairline>细边框按钮</iox-button>
  </demo-block>

  <demo-block title="禁用状态" padding>
    <iox-button type="primary" disabled class="demo-margin-right">禁用状态</iox-button>
    <iox-button type="info" disabled>禁用状态</iox-button>
  </demo-block>

  <demo-block title="加载状态" padding>
    <iox-button loading type="primary" class="demo-margin-right" />
    <iox-button loading type="primary" loading-type="spinner" class="demo-margin-right" />
    <iox-button loading type="info" loading-text="加载中..." />
  </demo-block>

  <demo-block title="按钮形状" padding>
    <iox-button type="primary" square class="demo-margin-right">方形按钮</iox-button>
    <iox-button type="info" round>圆形按钮</iox-button>
  </demo-block>

  <demo-block title="图标按钮" padding>
    <iox-button type="primary" icon="bell" class="demo-margin-right" />
    <iox-button type="primary" icon="bell" class="demo-margin-right">按钮</iox-button>
    <iox-button plain type="primary" icon="https://img.yzcdn.cn/vant/logo.png">按钮</iox-button>
  </demo-block>

  <demo-block title="按钮尺寸" padding>
    <iox-button type="primary" size="large" block custom-class="demo-margin-bottom">大号按钮</iox-button>
    <iox-button type="primary" class="demo-margin-right">普通按钮</iox-button>
    <iox-button type="primary" size="small" class="demo-margin-right">小型按钮</iox-button>
    <iox-button type="primary" size="mini">迷你按钮</iox-button>
  </demo-block>

  <demo-block title="块级元素" padding>
    <iox-button type="primary" custom-class="demo-margin-bottom">普通按钮</iox-button>
    <iox-button type="primary" block>块级元素</iox-button>
  </demo-block>

  <demo-block title="自定义颜色" padding>
    <iox-button color="#7232dd" class="demo-margin-right">单色按钮</iox-button>
    <iox-button color="#7232dd" class="demo-margin-right" plain>单色按钮</iox-button>
    <iox-button color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变色按钮</iox-button>
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

  onLoad() {
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 按钮',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-button'
      // #endif
    };
  }
}
</script>

<style lang="less">
.row {
  height: 44px;
  margin-bottom: 15px;
}
</style>
