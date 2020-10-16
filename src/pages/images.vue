<template>
  <block>
    <demo-block title="基础用法" padding>
      <iox-row>
        <iox-image
          width="100"
          height="100"
          :src="src"
        />
      </iox-row>
    </demo-block>

    <demo-block title="填充模式" padding>
      <iox-row :gutter="20">
        <iox-col
          v-for="(fit) in fits"
          :key="fit"
          span="8"
        >
          <iox-image
            :fit="fit"
            width="100%"
            height="27vw"
            :src="src"
          />
          <view class="text">{{ fit }}</view>
        </iox-col>
      </iox-row>
    </demo-block>

    <demo-block title="圆形图片" padding>
      <iox-row :gutter="20">
        <iox-col
          v-for="(fit) in fits"
          :key="fit"
          span="8"
        >
          <iox-image
            round
            :fit="fit"
            width="100%"
            height="27vw"
            :src="src"
          />
          <view class="text">{{ fit }}</view>
        </iox-col>
      </iox-row>
    </demo-block>

    <demo-block title="加载中提示" padding>
      <iox-row :gutter="20">
        <iox-col span="8">
          <iox-image
            width="100%"
            height="27vw"
          />
          <view class="text">默认提示</view>
        </iox-col>

        <iox-col span="8">
          <iox-image
            width="100%"
            height="27vw"
            use-loading-slot
          >
            <iox-loading
              slot="loading"
              type="spinner"
              size="20"
              vertical
            />
          </iox-image>
          <view class="text">自定义提示</view>
        </iox-col>
      </iox-row>
    </demo-block>

    <demo-block title="加载失败提示" padding>
      <iox-row :gutter="20">
        <iox-col span="8">
          <iox-image
            width="100%"
            height="27vw"
            src="x"
          />
          <view class="text">默认提示</view>
        </iox-col>

        <iox-col span="8">
          <iox-image
            width="100%"
            height="27vw"
            src="x"
            use-error-slot
          >
            <text slot="error">加载失败</text>
          </iox-image>
          <view class="text">自定义提示</view>
        </iox-col>
      </iox-row>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  fits = [
    'contain',
    'cover',
    'fill',
    'none',
    'scale-down',
    'widthFix',
    'heightFix'
  ];
  src = 'https://img.yzcdn.cn/vant/cat.jpeg';

  onShareAppMessage() {
    return {
      title: 'IOX UI 图片',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-image'
      // #endif
    };
  }
}
</script>

<style lang="less">
page {
  background-color: #fff;
}

.text {
  width: 100%;
  margin-top: 5px;
  color: #7d7e80;
  font-size: 14px;
  text-align: center;
}
</style>
