<template>
  <iox-cell
    :size="size"
    :icon="leftIcon"
    :center="center"
    :border="border"
    :is-link="isLink"
    :required="required"
    :clickable="clickable"
    :title-width="titleWidth"
    :arrow-direction="arrowDirection"
    title-style="margin-right: 12px;"
    custom-style="customStyle"
    custom-class="iox-field"
    title-class="label-class"
  >
    <slot name="left-icon" slot="icon" />
    <view v-if="label" :class="[bem('field__label', { disabled })]" slot="title">
      {{ label }}
    </view>
    <slot v-else name="label" slot="title" />
    <view :class="[bem('field__body', [type])]">
      <textarea
        v-if="type === 'textarea'"
        :class="['input-class', bem('field__input', [inputAlign, type, { disabled, error }])]"
        :fixed="fixed"
        :focus="focus"
        :cursor="cursor"
        :value="value"
        :auto-focus="autoFocus"
        :disabled="disabled || readonly"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :placeholder-class="bem('field__placeholder', { error, disabled })"
        :auto-height="!!autosize"
        :style="'' + inputStyle(autosize)"
        :cursor-spacing="cursorSpacing"
        :adjust-position="adjustPosition"
        :show-confirm-bar="showConfirmBar"
        :hold-keyboard="holdKeyboard"
        :selection-end="selectionEnd"
        :selection-start="selectionStart"
        :disable-default-padding="disableDefaultPadding"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
        @confirm="onConfirm"
        @linechange="onLineChange"
        @keyboardheightchange="onKeyboardHeightChange"
      >
      </textarea>
      <input
        v-else
        :class="['input-class', bem('field__input', [inputAlign, { disabled, error }])]"
        :type="type"
        :focus="focus"
        :cursor="cursor"
        :value="value"
        :auto-focus="autoFocus"
        :disabled="disabled || readonly"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :placeholder-class="bem('field__placeholder', { error })"
        :confirm-type="confirmType"
        :confirm-hold="confirmHold"
        :hold-keyboard="holdKeyboard"
        :cursor-spacing="cursorSpacing"
        :adjust-position="adjustPosition"
        :selection-end="selectionEnd"
        :selection-start="selectionStart"
        :password="password || type === 'password'"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
        @confirm="onConfirm"
        @keyboardheightchange="onKeyboardHeightChange"
      />
      <iox-icon
        v-if="showClear"
        name="times-circle-o"
        class="iox-field__clear-root iox-field__icon-root"
        @touchstart="onClear"
      />
      <view class="iox-field__icon-container" @tap="onClickIcon">
        <iox-icon
          v-if="rightIcon || icon"
          :name="rightIcon || icon"
          :class="['iox-field__icon-root', iconClass]"
          custom-class="right-icon-class"
        />
        <slot name="right-icon" />
        <slot name="icon" />
      </view>
      <view class="iox-field__button">
        <slot name="button" />
      </view>
    </view>
    <view v-if="showWordLimit && maxlength" class="iox-field__word-limit">
      <view :class="[bem('field__word-num', { full: length >= maxlength })]">{{ length }}</view>/{{ maxlength }}
    </view>
    <view v-if="errorMessage" :class="[bem('field__error-message', [errorMessageAlign, { disabled, error }])]">
      {{ errorMessage }}
    </view>
  </iox-cell>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Model, Watch } from 'vue-property-decorator';
import * as utils from '../../utils/utils';
import Base from '../../mixins/base';
import { commonProps, inputProps, textareaProps } from './props';

const classPrefix = 'iox-field';
@Component({
  behaviors: ['uni://form-field'],
  externalClasses: ['input-class', 'right-icon-class', 'label-class', 'custom-class'],
  props: {
    ...commonProps,
    ...inputProps,
    ...textareaProps,
    size: String,
    icon: String,
    label: String,
    error: Boolean,
    center: Boolean,
    isLink: Boolean,
    leftIcon: String,
    rightIcon: String,
    autosize: [Boolean, Object],
    required: Boolean,
    iconClass: String,
    clickable: Boolean,
    inputAlign: String,
    customStyle: String,
    errorMessage: String,
    arrowDirection: String,
    showWordLimit: Boolean,
    errorMessageAlign: String,
    readonly: Boolean,
    clearable: Boolean,
    border: {
      type: Boolean,
      default: true,
    },
    titleWidth: {
      type: String,
      default: '6.2em',
    },
  },
})
export default class IoxField extends mixins(Base) {
  type!: string;
  size?: string;
  clearable?: boolean;
  readonly?: boolean;
  disabled?: boolean;

  @Model('input', { type: String })
  readonly value?: string;

  focused = false;
  innerValue = '';
  showClear = false;

  get classPrefix() {
    return classPrefix;
  }

  get length() {
    return this.value ? this.value.toString().length : 0;
  }

  @Watch('readonly')
  @Watch('clearable')
  setShowClear() {
    const { clearable, readonly } = this;
    const { focused, value } = this;
    this.showClear = !!clearable && !!focused && !!value && !readonly;
  }

  onInput(event: CustomEvent) {
    this.emitChange(event.detail.value);
    this.setShowClear();
  }

  onFocus(event: CustomEvent) {
    this.focused = true;
    this.setShowClear();
    this.$emit('focus', event.detail);
  }

  onBlur(event: CustomEvent) {
    this.focused = false;
    this.setShowClear();
    this.$emit('blur', event.detail);
  }

  onClickIcon() {
    this.$emit('click-icon');
  }

  onClear() {
    this.emitChange('');
    this.setShowClear();
  }

  onConfirm(event: CustomEvent) {
    this.emitChange(event.detail.value);
    this.setShowClear();
    this.$emit('confirm', event.detail.value);
  }

  setValue(value: any) {
    this.emitChange(value);
    this.setShowClear();
  }

  onLineChange(event: CustomEvent) {
    this.$emit('linechange', event.detail);
  }

  onKeyboardHeightChange(event: CustomEvent) {
    this.$emit('keyboardheightchange', event.detail);
  }

  emitChange(value: any) {
    this.$nextTick(() => {
      this.$emit('input', value);
    });
  }

  inputStyle(autosize: any) {
    if (autosize && autosize.constructor === 'Object') {
      let style = '';
      if (autosize.minHeight) {
        style += 'min-height:' + utils.addUnit(autosize.minHeight) + ';';
      }
      if (autosize.maxHeight) {
        style += 'max-height:' + utils.addUnit(autosize.maxHeight) + ';';
      }
      return style;
    }

    return '';
  }

  noop() {}
}
</script>

<style lang="less">
@import '../../style/widget/iox-field/iox-field.less';

</style>