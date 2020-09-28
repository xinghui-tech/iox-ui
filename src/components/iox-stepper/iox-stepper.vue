<template>
  <view :class="mainClass" :style="mainStyle">
    <view
      v-if="showMinus"
      data-type="minus"
      :style="'width: '+addUnit(buttonSize)+';height:'+addUnit(buttonSize)+';'"
      :class="['minus-class',bem('stepper__minus', { disabled: disabled || disableMinus || currentValue <= min })]"
      hover-class="iox-stepper__minus--hover"
      hover-stay-time="70"
      @tap="onTap"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    />
    <input
      :type="integer ? 'number' : 'digit'"
      :class="['input-class',bem('stepper__input', { disabled: disabled || disableInput })]"
      :style="'width:'+addUnit(inputWidth)+';height:'+addUnit(buttonSize)+';'"
      :value="currentValue"
      :focus="focus"
      :disabled="disabled || disableInput"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <view
      v-if="showPlus"
      data-type="plus"
      :style="'width:'+addUnit(buttonSize)+';height:'+addUnit(buttonSize)+';'"
      :class="['plus-class',bem('stepper__plus', { disabled: disabled || disablePlus || currentValue >= max })]"
      hover-class="iox-stepper__plus--hover"
      hover-stay-time="70"
      @tap="onTap"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch, Model } from 'vue-property-decorator';
import Touch from '../../mixins/touch';
import Base from '../../mixins/base';
import { addUnit } from '../../utils/utils';
import { isDef } from '../../utils/utils';

const LONG_PRESS_START_TIME = 600;
const LONG_PRESS_INTERVAL = 200;

// add num and avoid float number
function add(num1: number, num2: number) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

function equal(value1: number | string, value2: number | string) {
  return String(value1) === String(value2);
}

const classPrefix = 'iox-stepper';
@Component({
  behaviors: ['uni://form-field'],
  externalClasses: ['input-class', 'plus-class', 'minus-class'],
})
export default class IoxStepper extends mixins(Base, Touch) {

  @Model('focus', { type: [String, Number] })
  @Model('blur', { type: [String, Number] })
  @Model('change', { type: [String, Number] })
  readonly value!:  number;


  @Prop() integer?: boolean;
  @Prop() disabled?: boolean;
  @Prop() inputWidth?: null;
  @Prop() buttonSize?: null;
  @Prop() asyncChange?: boolean;
  @Prop() disableInput?: boolean;

  @Prop({
    type: Number,
    default: null
  })
  decimalLength?: number;

  @Prop({
    type: Number,
    default: 1
  })
  min?: number;

  @Prop({
    type: Number,
    default: Number.MAX_SAFE_INTEGER
  })
  max?: number;

  @Prop({
    type: Number,
    default: 1
  })
  step?: number;

  @Prop({
    type: Boolean,
    default: true
  })
  showPlus?: boolean;

  @Prop({
    type: Boolean,
    default: true
  })
  showMinus?: boolean;

  @Prop() disablePlus?: boolean;
  @Prop() disableMinus?: boolean;

  @Prop({
    type: Boolean,
    default: true
  })
  longPress?: boolean;

  currentValue: number | string = -1;
  type: string = '';
  longPressTimer: any = null;
  isLongPress: boolean = false;


  @Watch('value')
  valueChanged(newVal: number, oldVal: number) {
     if (!equal(newVal, this.currentValue)) {
      this.currentValue = this.format(newVal);
    }
  }


  @Watch('integer')
  @Watch('decimalLength')
  @Watch('min')
  @Watch('max')
  changed(newVal: number, oldVal: number) {
     this.check();
  }


  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.classPrefix} custom-class`;
  }


  mounted() {
    this.currentValue = this.format(this.value);
  }

  protected addUnit(values: string | number | null, unit = 'px'): string | undefined  {
    return addUnit(values);
  }

  protected isDef(values: any): boolean  {
    return isDef(values);
  }


  check() {
    const val = this.format(this.currentValue);
    if (!equal(val, this.currentValue)) {
      this.currentValue = val;
    }
  }

  isDisabled(type: string) {
    if (type === 'plus') {
      return (
        this.disabled || this.disablePlus || (this.currentValue >= this.max!)
      );
    }

    return (
      this.disabled || this.disableMinus || (this.currentValue <= this.min!)
    );
  }

  onFocus(event: TouchEvent) {
    this.$emit('focus', event.detail);
  }

  onBlur(event: any) {
    const value = this.format(event.detail.value);
    this.emitChange(value);
    this.$emit('blur', {
      ...event.detail,
      value,
    });
  }

  // filter illegal characters
  filter(value: string | number) {
    value = String(value).replace(/[^0-9.-]/g, '');

    if (this.integer && value.indexOf('.') !== -1) {
      value = value.split('.')[0];
    }

    return value;
  }

  // limit value range
  format(value: string | number) {
    value = this.filter(value);

    // format range
    value = value === '' ? 0 : +value;
    value = Math.max(Math.min(this.max!, value), this.min!);

    // format decimal
    if (isDef(this.decimalLength)) {
      value = value.toFixed(this.decimalLength);
    }

    return value;
  }

  onInput(event: any) {
    const { value = '' } = event.detail || {};

    // allow input to be empty
    if (value === '') {
      return;
    }

    let formatted = this.filter(value);

    // limit max decimal length
    if (isDef(this.decimalLength) && formatted.indexOf('.') !== -1) {
      const pair = formatted.split('.');
      formatted = `${pair[0]}.${pair[1].slice(0, this.decimalLength)}`;
    }

    this.emitChange(formatted);
  }

  emitChange(value: string | number) {
    if (!this.asyncChange) {
      this.currentValue = value;
    }

    this.$emit('change', value);
  }

  onChange() {
    const { type } = this;
    if (this.isDisabled(type)) {
      this.$emit('overlimit', type);
      return;
    }

    const diff = type === 'minus' ? -this.step! : +this.step!;

    const value = this.format(add(+this.currentValue, diff));

    this.emitChange(value);
    this.$emit(type);
  }

  longPressStep() {
    this.longPressTimer = setTimeout(() => {
      this.onChange();
      this.longPressStep();
    }, LONG_PRESS_INTERVAL);
  }

  onTap(event: any) {
    const { type } = event.currentTarget.dataset;
    this.type = type;
    this.onChange();
  }

  onTouchStart(event: any) {
    if (!this.longPress) {
      return;
    }
    clearTimeout(this.longPressTimer);

    const { type } = event.currentTarget.dataset;
    this.type = type;
    this.isLongPress = false;

    this.longPressTimer = setTimeout(() => {
      this.isLongPress = true;
      this.onChange();
      this.longPressStep();
    }, LONG_PRESS_START_TIME);
  }

  onTouchEnd() {
    if (!this.longPress) {
      return;
    }
    clearTimeout(this.longPressTimer);
  }

}
</script>

<style lang="less">
@import '../../style/widget/iox-stepper/iox-stepper.less';

</style>