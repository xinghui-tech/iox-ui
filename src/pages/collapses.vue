<template>
  <block>
    <demo-block title="基础用法">
      <iox-collapse v-model="active1" data-key="active1">
        <iox-collapse-item :title="title1">{{ content1 }}</iox-collapse-item>
        <iox-collapse-item :title="title2">{{ content2 }}</iox-collapse-item>
        <iox-collapse-item :title="title3" disabled>{{ content3 }}</iox-collapse-item>
      </iox-collapse>
    </demo-block>

    <demo-block title="手风琴">
      <iox-collapse v-model="active2" data-key="active2" accordion>
        <iox-collapse-item :title="title1">{{ content1 }}</iox-collapse-item>
        <iox-collapse-item :title="title2">{{ content2 }}</iox-collapse-item>
        <iox-collapse-item :title="title3">{{ content3 }}</iox-collapse-item>
      </iox-collapse>
    </demo-block>

    <demo-block title="事件监听">
      <iox-collapse v-model="active3" data-key="active3" @open="onOpen" @close="onClose">
        <iox-collapse-item :title="title1">{{ content1 }}</iox-collapse-item>
        <iox-collapse-item :title="title2">{{ content2 }}</iox-collapse-item>
        <iox-collapse-item :title="title3">{{ content3 }}</iox-collapse-item>
      </iox-collapse>
    </demo-block>

    <demo-block title="自定义标题内容">
      <iox-collapse v-model="active4">
        <iox-collapse-item>
          <view slot="title">
            {{ title1 }}
            <iox-icon name="question" custom-class="iox-icon-question" />
          </view>
          {{ content1 }}
        </iox-collapse-item>
        <iox-collapse-item
          :title="title2"
          value="内容"
          icon="shopping-bag"
        >
          {{ content2 }}
        </iox-collapse-item>
      </iox-collapse>
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
} from '../utils/toast';

@Component
export default class Index extends mixins(Fonts) {
  toast: ToastOptions = toast();

  active1 = [0];
  active2 = 0;
  active3 = [];
  active4 = [];
  title1 = '有赞微商城';
  title2 = '有赞零售';
  title3 = '有赞美业';
  content1 = '提供多样店铺模板，快速搭建网上商城';
  content2 = '网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失';
  content3 = '线上拓客，随时预约，贴心顺手的开单收银';


  onOpen(name: string | number) {
    this.toast = toast(`展开: ${name}`);
  }

  onClose(name: string | number) {
    this.toast = toast(`关闭: ${name}`);
  }

  onShareAppMessage() {
    
  }
}
</script>

<style lang="less">
.iox-icon-question {
  margin-left: 5px;
  font-size: 15px !important;
  color: #1989fa;
  vertical-align: -3px;
}

</style>
