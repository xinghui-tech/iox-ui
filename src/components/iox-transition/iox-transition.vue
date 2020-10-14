<template>
  <view
    v-if="inited"
    :class="mainClass" :style="mainStyle"
    @transitionend="onTransitionEnd"
    @tap="onClick"
    @touchmove.stop="noop"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import Base from '../../mixins/base';
import { transition } from '../../mixins/transition';

const classPrefix = 'iox-transition';

@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class',
    'custom-class'
  ]
  // #endif
})
export default class IoxTransition extends mixins(Base, transition(true)) {
  
  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.classPrefix} ${this.classes} ${this._rootClasses}`;
  }

  get mainStyle() {
    return `-webkit-transition-duration: ${this.currentDuration}ms; transition-duration: ${this.currentDuration}ms; `
            + `${this.display ? '' : 'display: none;'} ${this._rootStyles}`;
  }

  onClick(event: Event) {
    this.$emit('click', event);
  }

  noop() {}
}
</script>

<style lang="less">
@import '../../style/widget/iox-transition/iox-transition.less';

</style>