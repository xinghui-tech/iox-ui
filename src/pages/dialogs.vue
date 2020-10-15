<template>
  <block>
    <demo-block title="提示弹窗" padding>
      <iox-button type="primary" class="demo-margin-right" @click="onClickAlert">
        提示弹窗
      </iox-button>
      <iox-button type="primary" @click="onClickAlert2">
        提示弹窗（无标题）
      </iox-button>
    </demo-block>

    <demo-block title="圆角样式" padding>
      <iox-button type="primary" class="demo-margin-right" @click="onClickThemeAlert">
        提示弹窗
      </iox-button>
      <iox-button type="primary" @click="onClickThemeAlert2">
        提示弹窗（无标题）
      </iox-button>
    </demo-block>

    <demo-block title="确认弹窗" padding>
      <iox-button type="primary" @click="onClickConfirm">
        确认弹窗
      </iox-button>
    </demo-block>

    <demo-block title="组件调用" padding>
      <iox-button type="primary" class="demo-margin-right" @click="showCustomDialog">
        组件调用
      </iox-button>
      <iox-dialog
        use-slot
        title="标题"
        :show="show"
        show-cancel-button
        @close="onClose"
        confirm-button-open-type="getUserInfo"
        @getuserinfo="getUserInfo"
      >
        <image
          class="demo-image"
          src="https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg"
        />
      </iox-dialog>
    </demo-block>

    <iox-dialog 
      :show="dialog.show"
      :title="dialog.title"
      :message="dialog.message"
      :theme="dialog.theme"
      :show-cancel-button="dialog.showCancelButton"
      @close="dialog.show = false"/>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import { 
  DialogOptions, dialog,
  confirm as confirmDialog, 
} from '../utils/dialog';


const message = '代码是写出来给人看的，附带能在机器上运行';
@Component
export default class Index extends mixins(Fonts) {
  show = false;
  dialog: DialogOptions = dialog();

  showCustomDialog() {
    this.show = true;
  }

  getUserInfo(event: CustomEvent) {
    console.log(event.detail);
  }

  onClickThemeAlert() {
    this.dialog = dialog(message, '标题', {theme: 'round-button'});
  }

  onClickThemeAlert2() {
    this.dialog = dialog(message, '', {
      theme: 'round-button',
    });
  }

  onClickAlert() {
    this.dialog = dialog(message, '标题');
  }

  onClickAlert2() {
    this.dialog = dialog(message);
  }

  onClickConfirm() {
    this.dialog = confirmDialog(message, '标题');
  }

  onClose() {
    this.show = false;
  }

  onShareAppMessage() {
    return {
      title: 'IOX UI 对话框',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-dialog'
      // #endif
    };
  }
}
</script>

<style lang="less">
.demo-image {
  box-sizing: border-box;
  width: 100%;
  padding: 25px 20px 0;
}
</style>
