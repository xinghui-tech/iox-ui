<template>
  <block>
    <demo-block title="基础用法">
      <iox-button-group custom-class="button-group-position" :safe-area-inset-bottom="false">
        <iox-button-icon
          icon="commenting-o"
          text="客服"
          open-type="contact"
        />
        <iox-button-icon
          icon="shopping-cart"
          text="购物车"
          @click="onClickIcon"
        />
        <iox-button-item
          text="加入购物车"
          type="warning"
          @click="onClickButton"
        />
        <iox-button-item
          loading
          loading-text="加载中"
          text="立即购买"
          @click="onClickButton"
        />
      </iox-button-group>
    </demo-block>

    <demo-block title="提示信息">
      <iox-button-group custom-class="button-group-position" :safe-area-inset-bottom="false">
        <iox-button-icon icon="commenting-o" text="客服" dot />
        <iox-button-icon icon="shopping-cart" text="购物车" info="5" />
        <iox-button-icon icon="shopping-bag" text="店铺" />
        <iox-button-item >立即购买</iox-button-item>
      </iox-button-group>
    </demo-block>

    <demo-block title="自定义按钮颜色">
      <iox-button-group custom-class="button-group-position" :safe-area-inset-bottom="false">
        <iox-button-icon icon="commenting-o" text="客服" />
        <iox-button-icon icon="shopping-bag" text="店铺" />
        <iox-button-item color="#be99ff" type="warning" text="加入购物车" />
        <iox-button-item color="#7232dd" text="立即购买" />
      </iox-button-group>
    </demo-block>

    <demo-block title="朴素按钮">
      <iox-button-group custom-class="button-group-position" :safe-area-inset-bottom="false">
        <iox-button-icon icon="commenting-o" text="客服" />
        <iox-button-icon icon="shopping-bag" text="店铺" />
        <iox-button-item color="#7232dd"  text="加入购物车" type="warning" />
        <iox-button-item plain color="#7232dd" text="立即购买" />
      </iox-button-group>
    </demo-block>

    <iox-toast
      :show="toast.show" 
      :type="toast.type" 
      :mask="toast.mask" 
      :z-index="toast.zIndex" 
      :position="toast.position" 
      :forbid-click="toast.forbidClick" 
      :loading-type="toast.loadingType" 
      :message="toast.message" 
      :duration="toast.duration"
      @close="toast.show = false"
    />
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import { 
  ToastOptions, toast
} from '../utils/toast';

@Component
export default class Index extends mixins(Fonts) {
  toast: ToastOptions = toast();

  onClickIcon() {
    this.toast = toast('点击图标');
  }

  onClickButton() {
    this.toast = toast('点击按钮');
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 按钮组',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-button-group'
      // #endif
    };
  }
}
</script>

<style lang="less">
.button-group-position {
  position: relative !important;
}
</style>
