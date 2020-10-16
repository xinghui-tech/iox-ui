<template>
  <block>
    <demo-block title="基础用法" padding>
        <iox-empty description="描述文字" />
    </demo-block>

    <demo-block title="图片类型">
      <iox-tabs
        :active="activeTab"
        @change="onChange"
      >
        <iox-tab title="通用错误">
          <iox-empty image="error" description="描述文字" />
        </iox-tab>
        <iox-tab title="网络错误">
          <iox-empty image="network" description="描述文字" />
        </iox-tab>
        <iox-tab title="搜索提示">
          <iox-empty image="search" description="描述文字" />
        </iox-tab>
      </iox-tabs>
    </demo-block>

    <demo-block title="自定义图片" padding>
      <iox-empty
        custom-class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="描述文字"
      />
    </demo-block>

    <demo-block title="底部内容" padding>
      <iox-empty description="描述文字">
        <iox-button round type="danger" custom-class="bottom-button">
          按钮
        </iox-button>
      </iox-empty>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  activeTab = 0;

  onChange(tab: { index: number; name: string}) {
    this.activeTab = tab.index;
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 空状态',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-empty'
      // #endif
    };
  }
}
</script>

<style lang="less">
.custom-image .iox-empty__image {
  width: 90px;
  height: 90px;
}

.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
