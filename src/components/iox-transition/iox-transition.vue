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
import Component, { mixins } from 'vue-class-component';
import Base from '../../mixins/base';
import Transition from '../../mixins/transition';
import { Prop, Watch } from 'vue-property-decorator';

const classPrefix = 'iox-transition';

@Component({
  externalClasses: [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class',
    'custom-class'
  ]
})
export default class IoxTransition extends mixins(Base, Transition) {
  @Prop({
    type: Boolean,
    default: false
  })
  show!: boolean;
  
  @Watch('show')
  showChanged(newVal: boolean, oldVal: boolean) {
    if (newVal === oldVal) {
      return;
    }

    newVal ? this.enter() : this.leave();
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.customClass || ''} ${this.classPrefix} ${this.classes}`;
  }

  get mainStyle() {
    return `-webkit-transition-duration: ${this.currentDuration}ms; transition-duration: ${this.currentDuration}ms; `
            + `${this.display ? '' : 'display: none;'} ${this.customStyle}`;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-transition/iox-transition.less';

</style>