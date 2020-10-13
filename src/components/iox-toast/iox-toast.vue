<template>
  <block>
    <iox-overlay
      v-if="mask || forbidClick"
      :show="isShow"
      :z-index="zIndex"
      :custom-style="mask ? '' : 'background-color: transparent;'"
    />
    <iox-transition
      :show="isShow"
      :custom-style="'z-index: ' + zIndex"
      custom-class="iox-toast__container"
    >
      <view
        :class="mainClass"
        :style="mainStyle"
        @touchmove="noop"
      >
        <!-- text only -->
        <text v-if="type === 'text'">{{ message }}</text>

        <!-- with icon -->
        <block v-else>
          <iox-loading
            v-if="type === 'loading'"
            color="white"
            :type="loadingType"
            custom-class="iox-toast__loading"
          />
          <iox-icon v-else class="iox-toast__icon" :name="type" />
          <text v-if="message" class="iox-toast__text">{{ message }}</text>
        </block>

        <slot />
      </view>
    </iox-transition>
  </block>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';

const classPrefix = 'iox-toast';
@Component
export default class IoxToast extends mixins(Base) {
  @Prop({
    type: Boolean,
  })
  show?: boolean;

  @Prop({
    type: Boolean,
  })
  mask?: boolean;

  @Prop({
    type: String,
  })
  message?: string;

  @Prop({
    type: Boolean,
  })
  forbidClick?: boolean;

  @Prop({
    type: Number,
    default: 1000,
  })
  zIndex!: boolean;

  @Prop({
    type: String,
    default: 'text',
  })
  type!: string;

  @Prop({
    type: String,
    default: 'circular',
  })
  loadingType!: string;

  @Prop({
    type: String,
    default: 'middle',
  })
  position!: string;

  @Prop({
    type: Number,
    default: 300
  })
  duration?: number;

  isShow = false;
  timer?: number;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes = this.bem('toast', [this.type === 'text' ? 'text' : 'icon', this.position]);
    return `${classes} ${this._rootClasses}`;
  }

  @Watch('show')
  onShowChanged(newVal: boolean) {
    this.isShow = newVal;
  }

  @Watch('isShow')
  onIsShowChanged(newVal: boolean, oldVal: boolean) {
    if (newVal === oldVal) {
      return;
    }

    if (newVal) {
      this.restartTimer();
    } else {
      // clear timer
      this.clearTimer();
    }
  }

  @Watch('duration')
  @Watch('type')
  @Watch('loadingType')
  @Watch('position')
  @Watch('message')
  restartTimer() {
    this.clearTimer();
    // start timer
    if (this.duration && this.duration > 0) {
      let second = this.duration/1000;
      this.timer = setInterval(() => {
        second--;
        if (second <= 0) {
          // close
          this.clearTimer();
          this.isShow = false;
          this.$emit('close');
        }
      }, 1000);
    }
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  mounted() {
    this.isShow = !!this.show;
  }

  // for prevent touchmove
  noop() {}
}
</script>

<style lang="less">
@import '../../style/widget/iox-toast/iox-toast.less';

</style>