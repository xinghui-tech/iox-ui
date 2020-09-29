<template>
  <block>
    <iox-cell center title="基础用法">
      <iox-stepper v-model="value1" />
    </iox-cell>

    <iox-cell center title="步长设置">
      <iox-stepper v-model="value2" :step="2" />
    </iox-cell>

    <iox-cell center title="限制输入范围">
      <iox-stepper v-model="value3" :min="5" :max="8" />
    </iox-cell>

    <iox-cell center title="限制输入整数">
      <iox-stepper v-model="value4" integer />
    </iox-cell>

    <iox-cell center title="禁用状态">
      <iox-stepper v-model="value5" disabled />
    </iox-cell>

    <iox-cell center title="禁用长按">
      <iox-stepper v-model="value6" :long-press="false" />
    </iox-cell>

    <iox-cell center title="固定小数位数">
      <iox-stepper v-model="value7" :step="0.2" :decimal-length="1" />
    </iox-cell>

    <iox-cell center title="异步变更">
      <iox-stepper
        v-model="value8"
        async-change
        @change="onChange"
      />
    </iox-cell>

    <iox-cell center title="自定义大小">
      <iox-stepper v-model="value9" input-width="40px" button-size="32px" />
    </iox-cell>

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
  ToastOptions, toast,
  success as toastSuccess,
  loading as toastLoading,
  fail as toastFail
} from '../utils/toast';

@Component
export default class Index extends mixins(Fonts) {
  toast: ToastOptions = toast();

  value1= 1;
  value2= 1;
  value3= 1;
  value4= 1;
  value5= 1;
  value6= 1;
  value7= 1;
  value8= 1;
  value9= 1;


  onChange(event: any) {
    this.toast = toastLoading({  forbidClick: true });

    setTimeout(() => {
      this.toast.show = false;
    }, 500);
  }


  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {

  }
}
</script>

<style lang="less">
  page {
    background-color: #fff;
  }
</style>
