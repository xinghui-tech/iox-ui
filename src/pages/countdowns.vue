<template>
  <block>
    <demo-block title="基础用法">
      <iox-count-down :time="time" />
    </demo-block>

    <demo-block title="自定义格式">
      <iox-count-down
        :time="time"
        format="DD 天 HH 时 mm 分 ss 秒"
      />
    </demo-block>

    <demo-block title="毫秒级渲染">
      <iox-count-down
        millisecond
        :time="time"
        format="HH:mm:ss:SSS"
      />
    </demo-block>

    <demo-block title="自定义样式">
      <iox-count-down
        use-slot
        :time="time"
        @change="onChange"
      >
        <text class="item">{{ timeData.hours }}</text>
        <text class="item">{{ timeData.minutes }}</text>
        <text class="item">{{ timeData.seconds }}</text>
      </iox-count-down>
    </demo-block>

    <demo-block title="手动控制">
      <iox-count-down
        class="control-count-down"
        millisecond
        :time="3000"
        :auto-start="false"
        format="ss:SSS"
        @finish="finished"
        ref="countdown"
      />

      <iox-grid clickable column-num="3">
        <iox-grid-item text="开始" icon="play-circle-o" @click="start" />
        <iox-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
        <iox-grid-item text="重置" icon="refresh" @click="reset" />
      </iox-grid>
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
import { TimeData } from '../utils/countdown-utils';
import { 
  ToastOptions, toast,
  success as toastSuccess, 
  loading as toastLoading, 
  fail as toastFail 
} from '../utils/toast';

@Component
export default class Index extends mixins(Fonts) {
  toast: ToastOptions = toast();
  time = 30 * 60 * 60 * 1000;
  timeData = {};

  showToast(options: ToastOptions | string = '提示内容') {
    this.toast = toast(options);
  }

  onChange(time: TimeData) {
    this.timeData = time;
  }

  start() {
    const countDown: any = this.$refs.countdown;
    countDown.start();
  }

  pause() {
    const countDown: any = this.$refs.countdown;
    countDown.pause();
  }

  reset() {
    const countDown: any = this.$refs.countdown;
    countDown.reset();
  }

  finished() {
    this.showToast('倒计时结束');
  }

  onShareAppMessage() {
    
  }
}
</script>

<style lang="less">
.iox-count-down {
  margin: 0 16px 10px;
}

.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
  border-radius: 2px;
}
</style>
