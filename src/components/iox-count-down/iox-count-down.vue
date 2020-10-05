<template>
  <view :class="mainClass" :style="mainStyle" >
    <slot v-if="useSlot"/>
    <block v-else>{{ formattedTime }}</block>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { parseTimeData, isSameSecond, parseFormat } from '../../utils/countdown-utils';

function simpleTick(fn: Function) {
  return setTimeout(fn, 30);
}

const classPrefix = 'iox-count-down';
@Component
export default class IoxCountDown extends mixins(Base) {

  @Prop({
    type: Boolean,
  })
  useSlot?: boolean;

  @Prop({
    type: Boolean,
  })
  millisecond?: boolean;

  @Prop({
    type: Number,
    default: 0
  })
  time!: number;

  @Prop({
    type: String,
    default: 'HH:mm:ss',
  })
  format!: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  autoStart!: boolean;

  timeData = parseTimeData(0);
  formattedTime = '0';
  tid: number | null = null;
  counting = false;
  endTime = 0;
  remain = 0;

  get classPrefix() {
    return classPrefix;
  }

  created() {
    this.reset();
  }

  destroyed() {
    if (this.tid) {
      clearTimeout(this.tid);
    }
    this.tid = null;
  }

  // 开始
  start() {
    if (this.counting) {
      return;
    }

    this.counting = true;
    this.endTime = Date.now() + this.remain;
    this.tick();
  }

  // 暂停
  pause() {
    this.counting = false;
    if (this.tid) {
      clearTimeout(this.tid);
      this.tid = null;
    }
  }

  // 重置
  @Watch('time')
  reset() {
    this.pause();
    this.remain = this.time;
    this.setRemain(this.remain);

    if (this.autoStart) {
      this.start();
    }
  }

  tick() {
    if (this.millisecond) {
      this.microTick();
    } else {
      this.macroTick();
    }
  }

  microTick() {
    this.tid = simpleTick(() => {
      this.setRemain(this.getRemain());

      if (this.remain !== 0) {
        this.microTick();
      }
    });
  }

  macroTick() {
    this.tid = simpleTick(() => {
      const remain = this.getRemain();

      if (!isSameSecond(remain, this.remain) || remain === 0) {
        this.setRemain(remain);
      }

      if (this.remain !== 0) {
        this.macroTick();
      }
    });
  }

  getRemain() {
    return Math.max(this.endTime - Date.now(), 0);
  }

  setRemain(remain: number) {
    this.remain = remain;
    const timeData = parseTimeData(remain);

    if (this.useSlot) {
      this.$emit('change', timeData);
    }

    this.formattedTime = parseFormat(this.format, timeData);

    if (remain === 0) {
      this.pause();
      this.$emit('finish');
    }
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-count-down/iox-count-down.less';

</style>