<template>
  <iox-transition
    :show="show"
    :custom-class="classPrefix"
    :custom-style="mainStyle"
    :duration="duration"
    @tap="onClick"
    @touchmove.stop="noop"
  >
    <slot></slot>
  </iox-transition>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import * as utils from '../../utils/utils';
import base, { props } from '../../mixins/base';
import ioxTransition from '@/components/iox-transition/iox-transition.vue';

const classPrefix = 'iox-overlay';

@Component({
  mixins: [ props ],
  components: {
    ioxTransition,
  }
})
export default class IoxTransition extends mixins(base) {
  @Prop({
    type:Boolean,
    default:false,
  })
  show!:boolean;

  @Prop({
    type: [Number, Object],
    default: 300,
  })
  duration!: number | boolean;

  @Prop({
    type: Number,
    default: 1,
  })
  zIndex!: number;

  get utils() {
    return utils;
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `${'z-index:'+this.zIndex+';'+this.customStyle} `;
  }

  onClick() {
    this.$emit('click');
  }

  noop() {}
}
</script>

<style lang="less">
@import '../../style/widget/iox-overlay/iox-overlay.less';

</style>