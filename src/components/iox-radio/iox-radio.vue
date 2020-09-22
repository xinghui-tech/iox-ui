<template>
  <view :class="mainClass" :style="mainStyle">
    <view
      v-if="labelPosition === 'left'"
      :class="labelClass"
      @tap="onClickLabel"
    >
      <slot />
    </view>
    <view class="iox-radio__icon-wrap" :style="'font-size: ' + iconSized" @tap="onChange">
      <slot v-if="useIconSlot" name="icon" />
      <iox-icon
        v-else
        name="check"
        :class="iconClass"
        :style="iconStyle"
        custom-class="icon-class"
        :custom-style="'line-height: ' + iconSized + '; font-size: .8em; display: block;'"
      />
    </view>
    <view
      v-if="labelPosition === 'right'"
      :class="labelClass"
      @tap="onClickLabel"
    >
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Model } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';
import { addUnit } from '../../utils/utils';

const classPrefix = 'iox-radio';
@Component({
  name: 'iox-radio',
  behaviors: ['uni://form-field'],
  externalClasses: ['icon-class', 'label-class', 'custom-class'],
})
export default class IoxRadio extends mixins(Base, Emitter) {
  @Model('change', { type: [String, Number] })
  readonly value?: string | number;

  @Prop({
    type: Boolean,
  })
  disabled?: boolean;

  @Prop({
    type: Boolean,
  })
  useIconSlot?: boolean;

  @Prop({
    type: String,
  })
  checkedColor?: string;

  @Prop({
    type: String,
    default: 'right'
  })
  labelPosition?: string;

  @Prop({
    type: Boolean,
  })
  labelDisabled?: boolean;

  @Prop({
    type: String,
    default: 'round'
  })
  shape!: string;

  @Prop({
    type: [String, Number],
    default: 20
  })
  iconSize!: string | number;

  name!: string;
  parent?: Vue;
  parentDisabled = false;

  get classPrefix() {
    return classPrefix;
  }

  get labelClass() {
    const classes = this.bem('radio__label', [this.labelPosition, { disabled: this.disabled }]);
    return `label-class ${classes}`;
  }

  get iconClass() {
    const { shape, disabled, value, name } = this;
    return this.bem('radio__icon', [shape, { disabled, checked: value === name }]);
  }

  get iconStyle() {
    const { iconSize, checkedColor, disabled, value, name } = this;
    return `font-size: ${addUnit(iconSize)}; ${checkedColor && !disabled && value === name ? 'border-color:' + checkedColor + '; background-color:' + checkedColor + ';' : ''}`;
  }

  get iconSized() {
    return addUnit(this.iconSize);
  }

  emitChange(value: string | number) {
    const instance = this.parent || this;
    instance.$emit('input', value);
    instance.$emit('change', value);
  }

  onChange() {
    if (!this.disabled) {
      this.emitChange(this.name);
    }
  }

  onClickLabel() {
    const { disabled, labelDisabled, name } = this;
    if (!disabled && !labelDisabled) {
      this.emitChange(name);
    }
  }

  mounted() {
    this.$$dispatch('iox-radio-group', 'radio-attached', this);
  }

  destroyed() {
    this.$$dispatch('iox-radio-group', 'radio-detached', this);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-radio/iox-radio.less';

</style>