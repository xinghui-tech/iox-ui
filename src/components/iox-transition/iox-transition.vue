<template>
  <view
    v-if="transitionInited"
    :class="mainClass" :style="mainStyle"
    @transitionend="onTransitionEnd"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import * as utils from '../../utils/utils';
import Base from '../../mixins/base';
import Transition, { Duration } from '../../mixins/transition';

const classPrefix = 'iox-transition';

@Component
export default class IoxTransition extends mixins(Base, Transition) {
  @Prop({
    type: Boolean,
    default: true
  })
  show!: boolean;

  @Prop({
    type: String,
    default: 'fade'
  })
  type!: string;

  @Prop({
    type: [Number, Object],
    default: 300,
    validator(val: any) {
      if (typeof val === 'number') {
        return val > 0;
      } else if (typeof val === 'object') {
        if (!val.hasOwnProperty('enter')) {
          return false;
        }
        if (!val.hasOwnProperty('leave')) {
          return false;
        }
      }
      return false;
    }
  })
  duration!: Duration;

  @Watch('show')
  showChanged(newVal: boolean, oldVal: boolean) {
    this.showTransition = newVal;
  }

  @Watch('type')
  typeChanged(newVal: string, oldVal: string) {
    this.transitionType = newVal || 'fade';
  }

  @Watch('duration')
  durationChanged(newVal: Duration, oldVal: Duration) {
    this.transitionDuration = newVal || 300;
  }

  get utils() {
    return utils;
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.customClass || ''} ${this.classPrefix} ${this.transitionClasses}`;
  }

  get mainStyle() {
    return `-webkit-transition-duration: ${this.transitionCurrentDuration}ms; transition-duration: ${this.transitionCurrentDuration}ms; `
            + `${this.transitionDisplay ? '' : 'display: none;'} ${this.customStyle}`;
  }

  created() {
    this.showTransition = this.show;
    // this.transitionType = this.type || 'fade';
    // transfer event
    this.$on('transition-before-enter', () => {
      this.$emit('before-enter');
    });
    this.$on('transition-enter', () => {
      this.$emit('enter');
    });
    this.$on('transition-after-enter', () => {
      this.$emit('after-enter');
    });

    this.$on('transition-before-leave', () => {
      this.$emit('before-leave');
    });
    this.$on('transition-leave', () => {
      this.$emit('leave');
    });
    this.$on('transition-after-leave', () => {
      this.$emit('after-leave');
    });
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-transition/iox-transition.less';

</style>