<template>
  <block>
    <demo-block title="基础用法">
      <iox-swipe-cell :right-width="65" :left-width="65">
        <view slot="left" class="iox-swipe-cell__left">选择</view>
        <iox-cell-group>
          <iox-cell title="单元格" value="内容" />
        </iox-cell-group>
        <view slot="right" class="iox-swipe-cell__right">删除</view>
      </iox-swipe-cell>
    </demo-block>

    <demo-block title="异步关闭">
      <iox-swipe-cell id="swipe-cell" :right-width="65" :left-width="65" async-close @close="onClose">
        <view slot="left" class="iox-swipe-cell__left">选择</view>
        <iox-cell-group>
          <iox-cell title="单元格" value="内容" />
        </iox-cell-group>
        <view slot="right" class="iox-swipe-cell__right">删除</view>
      </iox-swipe-cell>
    </demo-block>

    <demo-block title="主动打开">
      <iox-swipe-cell id="swipe-cell2" :right-width="65" :left-width="65" name="示例" @open="onOpen" >
        <view slot="left" class="iox-swipe-cell__left">选择</view>
        <iox-cell-group>
          <iox-cell title="单元格" value="内容" />
        </iox-cell-group>
        <view slot="right" class="iox-swipe-cell__right">删除</view>
      </iox-swipe-cell>
    </demo-block>

    <iox-dialog
      :show="dialog.show"
      :title="dialog.title"
      :message="dialog.message"
      :theme="dialog.theme"
      :show-cancel-button="dialog.showCancelButton"
      @close="dialog.show = false"/>

    <iox-notify
      :show="notify.show"
      :type="notify.type"
      :message="notify.message"
      :background="notify.background"
      :duration="notify.duration"
      :z-index="notify.zIndex"
      :top="notify.top"
      :color="notify.color"
      :safeAreaInsetTop="notify.safeAreaInsetTop"
      @close="notify.show = false"
    />
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import { wrapFunc, releaseFunc } from '../utils/func-utils';

import { DialogOptions, dialog, confirm as confirmDialog,} from '../utils/dialog';
import { NotifyOptions, notify as notifyInitData, } from '../utils/notify';

const message = '代码是写出来给人看的，附带能在机器上运行';

@Component
export default class Index extends mixins(Fonts) {
  dialog: DialogOptions = dialog();
  notify: NotifyOptions = notifyInitData();

  showNotify(options: NotifyOptions | string | {[key: string]: any} = { show: true, message: '消息通知', }) {
    this.notify = notifyInitData(options);
  }


  onReady() {
  }

  onScroll(event: CustomEvent) {
  }

  onPageScroll() {
  }

  destroy() {
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
  }


  onClose(event: any) {
    console.log('onClose===', event);
    const { position, instance } = event;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        this.dialog = confirmDialog(message, '确定删除吗？');
        instance.close();
        break;
    }
  }
  onOpen(event: any) {
    console.log('onOpen===', event);
    const { position, name } = event;
    switch (position) {
      case 'left':
        this.showNotify({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`,
          show: true,
        });
        break;
      case 'right':
        this.showNotify({
          type: 'primary',
          message: `${name}${position}部分展示open事件被触发`,
          show: true,
        });
        break;
    }
  }
}
</script>

<style lang="less">
.demo-swipe-cell {
  user-select: none;
}

.iox-swipe-cell__left,
.iox-swipe-cell__right {
  display: inline-block;
  width: 65px;
  height: 44px;
  font-size: 15px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  background-color: #ee0a24;
}
</style>
