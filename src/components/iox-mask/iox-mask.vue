<template>
  <view :class="mainClass" :style="mainStyle">
    <slot />
    <iox-transition
      :show="showMask"
      custom-class="iox-mask__wrap"
      :duration="duration"
      :name="transition"
      @touchmove.stop="noop"
    >
      <view :class="maskClasses" @click.stop="onClickMask">
      </view>
      <slot name="overlay"><view class="iox-mask__loading"><iox-loading /></view></slot>
    </iox-transition>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { Duration } from '../../mixins/transition';

const classPrefix = 'iox-mask';

@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['mask-class', 'custom-class'],
  // #endif
})
export default class IoxOverlay extends mixins(Base) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  maskClass?: string;
  // #endif

  //datas
  @Prop({
    type: Boolean,
    default: false,
  })
  showMask!: boolean;

  @Prop({
    type: [Number, Object],
    default: 300,
  })
  duration!: number | Duration;

  @Prop({
    type: String,
    default: 'fade',
  })
  transition!: string;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `position-relative ${this.classPrefix} ${this._rootClasses}`;
  }

  get maskClasses() {
    let cls = 'mask-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.maskClass || '');
    // #endif

    return `iox-mask__mask ${cls}`;
  }

  onClickMask() {
    this.$emit('click-mask');
  }

  noop() {}
}
</script>

<style lang="less">
@import '../../style/widget/iox-mask/iox-mask.less';

</style>