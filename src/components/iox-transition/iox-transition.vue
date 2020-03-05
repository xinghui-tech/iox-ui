<template>
  <view
    v-if="inited"
    :class="mainClass" :style="mainStyle"
    @transitionend="onTransitionEnd"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import * as utils from '../../utils/utils';
import base, { props } from '../../mixins/base';
import transition from '../../mixins/transition';

const classPrefix = 'transition';

@Component({
  mixins: [ props ]
})
export default class IoxTransition extends mixins(base ,transition) {
  classes: String[] = [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class'
  ]

  get utils() {
    return utils;
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.customClass || ''} ${'iox-' + this.classPrefix} ${this.classes}`;
  }

  get mainStyle() {
    return `${'-webkit-'+  this.classPrefix + '-duration:'+ this.currentDuration + 'ms'} ${this.classPrefix + '-duration:'+ this.currentDuration + 'ms'} ${this.display ? '' : 'display: none;'} ${this.customStyle}`;
  }

}
</script>

<style lang="less">
@import '../../style/widget/iox-transition/iox-transition.less';

</style>