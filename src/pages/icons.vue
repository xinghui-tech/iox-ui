<template>
  <iox-tabs
    :active="active"
    color="#1989fa"
    @change="onSwitch"
  >
    <iox-tab title="用法示例" custom-class="demo-tab-pane">
      <demo-block title="基础用法">
        <iox-col
          custom-class="col"
          span="6"
        >
          <iox-icon
            :name="demoIcon"
            size="32px"
            custom-class="icon"
          />
        </iox-col>
        <iox-col
          custom-class="col"
          span="6"
        >
          <iox-icon
            :name="demoImage"
            size="32px"
            custom-class="icon"
          />
        </iox-col>
      </demo-block>
      <demo-block title="提示信息">
        <iox-col
          custom-class="col"
          span="6"
        >
          <iox-icon
            :name="demoIcon"
            size="32px"
            custom-class="icon"
            dot
          />
        </iox-col>
        <iox-col
          custom-class="col"
          span="6"
        >
          <iox-icon
            :name="demoIcon"
            size="32px"
            custom-class="icon"
            info="9"
          />
        </iox-col>
        <iox-col
          custom-class="col"
          span="6"
        >
          <iox-icon
            :name="demoIcon"
            size="32px"
            custom-class="icon"
            info="99+"
          />
        </iox-col>
      </demo-block>
      <demo-block title="图标颜色">
        <iox-col
          custom-class="col"
          span="6"
        >
          <iox-icon
            :name="demoIcon"
            size="32px"
            custom-class="icon"
            color="#1989fa"
          />
        </iox-col>
        <iox-col
          custom-class="col"
          span="6"
        >
          <iox-icon
            :name="demoIcon"
            size="32px"
            custom-class="icon"
            color="#07c160"
          />
        </iox-col>
      </demo-block>
      <demo-block title="图标大小">
        <iox-col
          custom-class="col"
          span="6"
        >
          <iox-icon
            :name="demoIcon"
            size="40"
            custom-class="icon"
          />
        </iox-col>
        <iox-col
          custom-class="col"
          span="6"
        >
          <iox-icon
            :name="demoIcon"
            size="3rem"
            custom-class="icon"
          />
        </iox-col>
      </demo-block>
    </iox-tab>
    <iox-tab title="基础图标" custom-class="demo-tab-pane">
      <iox-col
        v-for="(item, index) in icons.basic"
        :key="index"
        custom-class="col"
        span="6"
      >
        <iox-icon
          :name="item"
          size="32px"
          custom-class="icon"
        />
        <view class="text">{{ item }}</view>
      </iox-col>
    </iox-tab>
    <iox-tab title="线框风格" custom-class="demo-tab-pane">
      <iox-col
        v-for="(item, index) in icons.outline"
        :key="index"
        custom-class="col"
        span="6"
      >
        <iox-icon
          :name="item"
          size="32px"
          custom-class="icon"
        />
        <view class="text">{{ item }}</view>
      </iox-col>
    </iox-tab>
    <iox-tab title="实底风格" custom-class="demo-tab-pane">
      <iox-col
        v-for="(item, index) in icons.filled"
        :key="index"
        custom-class="col"
        span="6"
      >
        <iox-icon
          :name="item"
          size="32px"
          custom-class="icon"
        />
        <view class="text">{{ item }}</view>
      </iox-col>
    </iox-tab>
  </iox-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import awesomefonts from '../awesome-font-icons';

@Component
export default class Index extends mixins(Fonts) {
  icons = awesomefonts;
  active = 0;
  demoIcon = 'wechat';
  demoImage = 'https://b.yzcdn.cn/vant/icon-demo-1126.png';

  onSwitch(tab: any) {
    this.active = tab.index;
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 图标',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-icon'
      // #endif
    };
  }
}
</script>

<style lang="less">
page {
  padding-bottom: 0;
}

.col {
  display: inline-block;
  float: none;
  text-align: center;
  vertical-align: middle;
}

.icon {
  display: block;
  margin: 16px 0;
  color: #323233;
}

.text {
  display: block;
  height: 36px;
  margin: -4px 0 4px;
  padding: 0 5px;
  color: #646566;
  font-size: 12px;
  line-height: 18px;
}

.demo-tab-pane {
  margin: 20px;
  background-color: #fff;
}
</style>
