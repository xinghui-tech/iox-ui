<template>
  <block>
    <demo-block title="基础用法">
      <iox-slider
        v-model="currentValue1"
        custom-class="slider"
        @drag="onDrag(1, $event)"
        @change="onChange(1, $event)"
      />
    </demo-block>

    <demo-block title="指定选择范围">
      <iox-slider
        v-model="currentValue2"
        custom-class="slider"
        :min="-50"
        :max="50"
        @drag="onDrag(2, $event)"
        @change="onChange(2, $event)"
      />
    </demo-block>

    <demo-block title="指定步长">
      <iox-slider
        custom-class="slider"
        v-model="currentValue3"
        :step="10"
        @drag="onDrag(3, $event)"
        @change="onChange(3, $event)"
      />
    </demo-block>

    <demo-block title="自定义样式">
      <iox-slider
        v-model="currentValue4"
        custom-class="slider"
        :bar-height="4"
        active-color="#ee0a24"
        @drag="onDrag(4, $event)"
        @change="onChange(4, $event)"
      />
    </demo-block>

    <demo-block title="自定义按钮">
      <iox-slider
        v-model="currentValue5"
        custom-class="slider"
        use-button-slot
        active-color="#ee0a24"
        @drag="onDrag(5, $event)"
        @change="onChange(5, $event)"
      >
        <view class="custom-button" slot="button">
          {{ currentValue5 }}
        </view>
      </iox-slider>
    </demo-block>

  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {

  currentValue1= 20;
  currentValue2= 20
  currentValue3= 20;
  currentValue4= 20;
  currentValue5= 20;

  onChange(id: number , v: any) {
    const key = `currentValue${id}`;
    (this as any)[key] = v;
    wx.showToast({
      icon: 'none',
      title: `当前值：${v}`
    });
  }

  onDrag(id: number, detail: any) {
    const key = `currentValue${id}`;
    (this as any)[key] = detail.value;
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {

  }
}
</script>

<style lang="less">
  .slider {
    margin: 0 15px 30px;
  }

  .custom-button {
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    border-radius: 100px;
    background-color: #ee0a24;
  }
</style>
