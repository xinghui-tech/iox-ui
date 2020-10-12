<template>
  <view
    :class="mainClass" :style="mainStyle"
  >
    <view class="iox-checkbox__icon-wrap" @tap="toggle">
      <slot v-if="useIconSlot" name="icon" />
      <iox-icon
        v-else
        name="check"
        size="0.8em"
        :class="iconClass"
        :style="iconStyle"
        custom-class="icon-class"
        custom-style="line-height: 1.25em;"
      />
    </view>
    <view :class="'label-class ' + bem('checkbox__label', [labelPosition, { disabled: disabled || parentDisabled }])" @tap="onClickLabel">
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

function emit(
  target: Vue,
  value: boolean | any[]
) {
  target.$emit('input', value);
  target.$emit('change', value);
}

const classPrefix = 'iox-checkbox';
@Component({
  name: 'iox-checkbox',
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  behaviors: ['uni://form-field'],
  externalClasses: ['icon-class', 'label-class', 'custom-class'],
  // #endif
})
export default class IoxCheckbox extends mixins(Base, Emitter) {
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

  name?: string;
  parent?: Vue;
  parentDisabled = false;

  get classPrefix() {
    return classPrefix;
  }

  get iconClass() {
    const { shape, disabled, parentDisabled, value } = this;
    return this.bem('checkbox__icon', [shape, { disabled: disabled || parentDisabled, checked: value }]);
  }

  get iconStyle() {
    const {checkedColor, value, disabled, parentDisabled, iconSize} = this;
    const styles = [['font-size', addUnit(iconSize)]];
    if (checkedColor && value && !disabled && !parentDisabled) {
      styles.push(['border-color', checkedColor]);
      styles.push(['background-color', checkedColor]);
    }

    return styles
      .map(item => {
        return item.join(':');
      })
      .join(';');
  }

  emitChange(value: boolean) {
    if (this.parent) {
      this.setParentValue(this.parent, value);
    } else {
      emit(this, value);
    }
  }

  toggle() {
    const { parentDisabled, disabled, value } = this;
    if (!disabled && !parentDisabled) {
      this.emitChange(!value);
    }
  }

  onClickLabel() {
    const { labelDisabled, parentDisabled, disabled, value } = this;
    if (!disabled && !labelDisabled && !parentDisabled) {
      this.emitChange(!value);
    }
  }

  setParentValue(
    parent: Vue,
    value: boolean
  ) {
    const parentValue = (parent as any).value.slice();
    const { name } = this;
    const { max } = parent as any;

    if (value) {
      if (max && parentValue.length >= max) {
        return;
      }

      if (parentValue.indexOf(name) === -1) {
        parentValue.push(name);
        emit(parent, parentValue);
      }
    } else {
      const index = parentValue.indexOf(name);
      if (index !== -1) {
        parentValue.splice(index, 1);
        emit(parent, parentValue);
      }
    }

  }

  beforeMount() {
    this.$$dispatch('iox-checkbox-group', 'checkbox-attached', this);
  }

  destroyed() {
    this.$$dispatch('iox-checkbox-group', 'checkbox-detached', this);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-checkbox/iox-checkbox.less';

</style>