<template>
  <view
    :class="mainClass"
    :style="mainStyle"
    @tap="onClick"
  >
    <view
      class="iox-slider__bar"
      :style="sliderBarStyle"
    >
      <view
        class="iox-slider__button-wrapper"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <slot
          v-if="useButtonSlot"
          name="button"
        />
        <view
          v-else
          class="iox-slider__button"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch, Model } from 'vue-property-decorator';
import Touch from '../../mixins/touch';
import Base from '../../mixins/base';
import { addUnit } from '../../utils/utils';
import { canIUseModel } from '../../utils/utils';



const classPrefix = 'iox-slider';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  behaviors: ['uni://form-field'],
  // #endif
})
export default class IoxSlider extends mixins(Base, Touch) {

  @Model('drag', { type: [String, Number] })
  @Model('change', { type: [String, Number] })
  readonly value!:  number;

  @Prop() disabled?: boolean;
  @Prop() useButtonSlot?: boolean;
  @Prop() activeColor?: string;
  @Prop() inactiveColor?: string;

  @Prop({
    type: Number,
    default: 100
  })
  max?: number;

  @Prop({
    type: Number,
    default: 0
  })
  min?: number;

  @Prop({
    type: Number,
    default: 1
  })
  step?: number;

  @Prop({
    type: Number,
    default: 2
  })
  barHeight?: number;

  barStyle = '';
  startValue: number = 0;
  dragStatus = '';
  newValue: number = 0

  // @Watch('value')
  // valueChanged(newVal: number, oldVal: number) {
  //    if (newVal !== this.value) {
  //     this.updateValue(newVal);
  //   }
  // }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.classPrefix} ${this.bem('slider', { disabled: this.disabled })} ${this._rootClasses}`;
  }

  get mainStyle() {
    return `${this.inactiveColor ? 'background:' + this.inactiveColor : ''} ${this._rootStyles}`;
  }

  get sliderBarStyle() {
    return `${this.barStyle} ${this.barStyleFun(this.barHeight!, this.activeColor!)}`;
  }

  mounted() {
    this.updateValue(this.value);
  }

  protected addUnit(values: string | number | null, unit = 'px'): string | undefined  {
    return addUnit(values);
  }

  barStyleFun(barHeight: string | number | null, activeColor: string) {
    const styles = [['height', addUnit(barHeight)]];

    if (activeColor) {
      styles.push(['background', activeColor]);
    }

    return styles
      .map(function (item) {
        return item.join(':');
      })
      .join(';');
  }

  onTouchStart(event: TouchEvent) {
    if (this.disabled) return;

    this.touchStart(event);
    this.startValue = this.format(this.value);
    this.dragStatus = 'start';
  }

  onTouchMove(event: TouchEvent) {
    if (this.disabled) return;

    if (this.dragStatus === 'start') {
      this.$emit('drag-start');
    }

    this.touchMove(event);
    this.dragStatus = 'draging';

    this.getRect('.iox-slider').then(
      (rect: any) => {
        const diff = (this.deltaX / rect.width) * 100;
        this.newValue = this.startValue + diff;
        this.updateValue(this.newValue, false, true);
      }
    );
  }

  onTouchEnd() {
    if (this.disabled) return;

    if (this.dragStatus === 'draging') {
      this.updateValue(this.newValue, true);
      this.$emit('drag-end');
    }
  }

  onClick(event: any) {
    if (this.disabled) return;
    const { min } = this as any;
    this.getRect('.iox-slider').then(
      (rect: any) => {
        const value = ((event.detail.x - rect.left) / rect.width) * this.getRange() + min;
        this.updateValue(value, true);
      }
    );
  }

  updateValue(values: number, end?: boolean, drag?: boolean) {
    values = this.format(values);
    const { min } = this as any;
    const width = `${((values - min) * 100) / this.getRange()}%`;

    // this.value = value;

    this.barStyle = `width: ${width}; ${drag ? 'transition: none;' : ''} `;

    if (drag) {
      this.$emit('drag', { value: values });
    }

    if (end) {
      this.$emit('change', values);
    }

    // if ((drag || end) && canIUseModel()) {
    //   this.value = value;
    // }
  }

  getRange() {
    const { max, min } = this as any;
    return max - min;
  }

  format(value: number) {
    const { max, min, step } = this as any;
    return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
  }

}
</script>

<style lang="less">
@import '../../style/widget/iox-slider/iox-slider.less';

</style>