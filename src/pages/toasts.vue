<template>
  <block>
    <demo-block title="文字提示" padding>
      <iox-button type="primary" @tap="showToast" class="demo-margin-right">文字提示</iox-button>
      <iox-button type="primary" @tap="showLongToast">长文字提示</iox-button>
    </demo-block>

    <demo-block title="加载提示" padding>
      <iox-button type="primary" @tap="showLoadingToast" class="demo-margin-right">加载提示</iox-button>
      <iox-button type="primary" @tap="showCustomLoadingToast">自定义加载图标</iox-button>
    </demo-block>

    <demo-block title="成功/失败提示" padding>
      <iox-button type="info" @tap="showSuccessToast" class="demo-margin-right">成功提示</iox-button>
      <iox-button type="danger" @tap="showFailToast">失败提示</iox-button>
    </demo-block>

    <demo-block title="动态更新提示" padding>
      <iox-button type="primary" @tap="showCustomizedToast">动态更新提示</iox-button>
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
  ToastOptions, toast,
  success as toastSuccess, 
  loading as toastLoading, 
  fail as toastFail 
} from '../utils/toast';

@Component
export default class Index extends mixins(Fonts) {
  toast: ToastOptions = toast();

  showToast(options: ToastOptions | string = '提示内容') {
    this.toast = toast(options);
  }

  showLongToast() {
    this.showToast('这是一条长文字提示，超过一定字数就会换行');
  }

  showLoadingToast() {
    this.toast = toastLoading({ message: '加载中...', forbidClick: true, mask: true });
  }

  showCustomLoadingToast() {
    this.toast = toastLoading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
  }

  showSuccessToast() {
    this.toast = toastSuccess('成功文案');
  }

  showFailToast() {
    this.toast = toastFail('失败提示');
  }

  showCustomizedToast() {
    const text = (second: number) => `倒计时 ${second} 秒`;
    this.toast = toastLoading({
      duration: 0,
      forbidClick: true,
      message: text(3),
    });

    let second = 3;
    const timer = setInterval(() => {
      second--;
      if (second) {
        this.toast.message = text(second);
      } else {
        clearInterval(timer);
        this.toast.show = false;
      }
    }, 1000);
  }
}
</script>

<style lang="less">
</style>
