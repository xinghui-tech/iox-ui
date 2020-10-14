<template>
  <iox-transition
    name="slide-down"
    :show="isShow"
    custom-class="iox-notify__container"
    :custom-style="'z-index:'+zIndex+';top:'+[addUnit(top)]+';'"
    @click="onTap"
  >
    <view
      :class="mainClass"
      :style="mainStyle"
    >
      <view
        v-if="safeAreaInsetTop"
        :style="'height:'+statusBarHeight+'px;'"
      />
      <text>{{ message }}</text>
    </view>
  </iox-transition>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { addUnit, getSystemInfoSync } from '../../utils/utils';
import { WHITE } from '../../utils/color';

const classPrefix = 'iox-notify';
@Component
export default class IoxNotify extends mixins(Base) {

  @Prop({
    type: Boolean,
  })
  show?: boolean;

  @Prop({type: String}) message?: string;
  @Prop({type: String}) background?: string;
  @Prop({type: Number}) top?: number;

  @Prop({
    type: String,
    default: 'danger',
  })
  type!: 'primary' | 'success' | 'danger' | 'warning';

  @Prop({
    type: String,
    default: WHITE,
  })
  color!: string;

  @Prop({
    type: Number,
    default: 3000,
  })
  duration!: number;

  @Prop({
    type: Number,
    default: 110,
  })
  zIndex!: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  safeAreaInsetTop!: boolean;

  isShow = false;
  statusBarHeight = 0;
  timer?: number;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.classPrefix} iox-notify--${this.type} ${this._rootClasses}`;
  }

  get mainStyle() {
    return `background: ${this.background}; color: ${this.color}; ${this._rootStyles}`;
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
      this.showFun();
    } else {
      // clear timer
      this.hideFun();
    }
  }

  created() {
    const { statusBarHeight } = getSystemInfoSync();
    this.statusBarHeight = statusBarHeight;
  }

  mounted() {
    const { statusBarHeight } = getSystemInfoSync();
    this.statusBarHeight = statusBarHeight;
  }

  protected addUnit(values: string | number | null, unit = 'px'): string | undefined  {
    return addUnit(values);
  }

  showFun() {
    const { duration } = this as any;
    clearTimeout(this.timer);
    this.$emit('opened');
    if (duration > 0 && duration !== Infinity) {
      this.timer = setTimeout(() => {
        this.hideFun();
      }, duration);
    }
  }

  hideFun() {
    clearTimeout(this.timer);
    this.$emit('close');
  }

  onTap(event: TouchEvent) {
    this.$emit('click', event);
  }


}
</script>

<style lang="less">
@import '../../style/widget/iox-notify/iox-notify.less';

</style>