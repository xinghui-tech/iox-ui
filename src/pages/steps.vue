<template>
  <block>
    <demo-block title="基础用法">
      <iox-steps
        :steps="steps"
        :active="active"
        @click-step="onClick"
        active-icon="check"
        custom-class="demo-margin-bottom"
      />

      <iox-button custom-class="demo-margin-left" @click="nextStep">下一步</iox-button>
    </demo-block>

    <demo-block title="自定义样式">
      <iox-steps
        :steps="steps"
        :active="active"
        active-icon="check"
        active-color="#38f"
        inactive-icon="angle-right"
      />
    </demo-block>

    <demo-block title="自定义图标">
      <iox-steps
        :steps="customIconSteps"
        :active="active"
      />
    </demo-block>

    <demo-block title="竖向步骤条">
      <iox-steps
        :steps="steps"
        :active="active"
        direction="vertical"
        active-icon="check-circle"
        active-color="#ee0a24"
      />
    </demo-block>

    <iox-toast id="iox-toast"
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
import icons from '../awesome-font-icons';

const steps = [
  {
    text: '步骤一',
    desc: '描述信息',
  },
  {
    text: '步骤二',
    desc: '描述信息',
  },
  {
    text: '步骤三',
    desc: '描述信息',
  },
  {
    text: '步骤四',
    desc: '描述信息',
  },
];
type ToastOptions = {
  show?: boolean;
  type?: string;
  mask?: boolean;
  zIndex?: number;
  position?: string;
  duration?: number;
  forbidClick?: boolean;
  loadingType?: string;
  message?: string | number;
}
const defaultToastOptions: ToastOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: false,
  zIndex: 1000,
  duration: 2000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
};
@Component
export default class Index extends mixins(Fonts) {
  toast: ToastOptions = {...defaultToastOptions};

  active = 1;
  steps = steps;
  customIconSteps = steps.map((item, index) => ({
    ...item,
    inactiveIcon: icons.outline[index],
    activeIcon: icons.basic[index],
  }));

  nextStep() {
    this.active = ++this.active % 4;
  }

  showToast(toast: ToastOptions | string = '提示内容') {
    if (typeof toast === 'string') {
      toast = { message: toast };
    }
    this.toast = {...defaultToastOptions, ...toast, ...{show: true}};
  }

  onClick(event: TouchEvent) {
    this.showToast({ message: `Index: ${event.detail}`, type: 'success', forbidClick: true, mask: true});
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }
}
</script>

<style lang="less">

</style>
