<template>
  <iox-transition
    :show="show"
    :custom-class="mainClass"
    :custom-style="mainStyle"
    :duration="duration"
    :name="transition"
    @click="onClick"
  >
    <slot />
    <view v-if="showMask" :class="maskClasses" @click.stop="onClickMask">
      <slot name="mask"><view class="iox-overlay__mask--loading"><iox-loading /></view></slot>
    </view>
  </iox-transition>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { Duration } from '../../mixins/transition';

const classPrefix = 'iox-overlay';

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
  show!: boolean;

  @Prop({
    type: [Number, Object],
    default: 300,
  })
  duration!: number | Duration;

  @Prop({
    type: Number,
    default: 1,
  })
  zIndex!: number;

  @Prop({
    type: String,
    default: 'fade',
  })
  transition!: string;

  @Prop({
    type: Boolean,
    default: false
  })
  showMask!: boolean;

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `z-index: ${this.zIndex}; ${this._rootStyles}`;
  }

  get maskClasses() {
    let cls = 'mask-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.maskClass || '');
    // #endif

    return `iox-overlay__mask ${cls}`;
  }

  onClick() {
    this.$emit('click');
  }

  onClickMask() {
    this.$emit('click-mask');
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-overlay/iox-overlay.less';

</style>