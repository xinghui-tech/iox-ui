<template>
  <view
    :class="mainClass"
    :style="mainStyle"
  >
    <view :class="[bem('search__content', [shape])]">
      <view class="iox-search__label" v-if="label">{{ label }}</view>
      <slot v-else name="label" />

      <iox-field
        type="search"
        :left-icon="(!useLeftIconSlot) ? leftIcon : ''"
        :right-icon="(!useRightIconSlot) ? rightIcon : ''"
        :focus="focus"
        :error="error"
        :border="false"
        confirm-type="search"
        class="iox-search__field field-class"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :maxlength="maxlength"
        :input-align="inputAlign"
        input-class="input-class"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        custom-style="padding: 5px 10px 5px 0; background-color: transparent;"
        :value="value"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
        @confirm="onSearch"
        @change="onChange"
        @clear="onClear"
      >
        <slot v-if="useLeftIconSlot" name="left-icon" slot="left-icon" />
        <slot v-if="useRightIconSlot" name="right-icon" slot="right-icon" />
      </iox-field>
    </view>

    <view
      v-if="showAction || useActionSlot"
      class="iox-search__action"
      hover-class="iox-search__action--hover"
      hover-stay-time="70"
    >
      <slot v-if="useActionSlot" name="action" />
      <view v-else @tap="onCancel" class="cancel-class">{{ actionText }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Model, Prop, Watch } from "vue-property-decorator";
import Base from '../../mixins/base';
import { canIUseModel } from '../../utils/utils';

const classPrefix = 'iox-search';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  behaviors: ['uni://form-field'],
  externalClasses: [ 'field-class', 'input-class', 'cancel-class' ]
  // #endif
})
export default class IoxSearch extends mixins(Base) {
  // props
  @Model('input', { type: [String, Number] })
  readonly value?: string | number;

  @Prop({
    type: String,
  },)
  label?: string;

  @Prop({
    type: Boolean,
  },)
  focus?: boolean;

  @Prop({
    type: Boolean,
  },)
  error?: boolean;

  @Prop({
    type: Boolean,
  },)
  disabled?: boolean;

  @Prop({
    type: Boolean,
  },)
  readonly?: boolean;

  @Prop({
    type: String,
  },)
  inputAlign?: string;

  @Prop({
    type: Boolean,
  },)
  showAction?: boolean;

  @Prop({
    type: Boolean,
  },)
  useActionSlot?: boolean;

  @Prop({
    type: Boolean,
  },)
  useLeftIconSlot?: boolean;

  @Prop({
    type: Boolean,
  },)
  useRightIconSlot?: boolean;

  @Prop({
    type: String,
    default: 'search'
  },)
  leftIcon?: string;

  @Prop({
    type: String,
  },)
  rightIcon?: string;

  @Prop({
    type: String,
  },)
  placeholder?: string;

  @Prop({
    type: String,
  },)
  placeholderStyle?: string;

  @Prop({
    type: String,
    default: '取消'
  },)
  actionText?: string;

  @Prop({
    type: String,
    default: '#ffffff'
  },)
  background?: string;

  @Prop({
    type: Number,
    default: -1
  },)
  maxlength?: string;

  @Prop({
    type: String,
    default: 'square'
  },)
  shape?: string;

  @Prop({
    type: Boolean,
    default: true
  },)
  clearable?: boolean;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.classPrefix} ${this.bem('search', { withaction: this.showAction || this.useActionSlot })} custom-class`;
  }

  get mainStyle() {
    return `${this.customStyle || ''};background:${this.background};`;
  }

  onChange(value: string | number) {
    this.$emit('change', value);
  }

  onInput(value: string | number) {
    this.$emit('input', value);
  }

  onCancel() {
    setTimeout(() => {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('cancel');
    }, 200);
  }

  onSearch(event: Event) {
    this.$emit('search', event);
  }

  onFocus(event: Event) {
    this.$emit('focus', event);
  }

  onBlur(event: Event) {
    this.$emit('blur', event);
  }

  onClear() {
    this.$emit('clear');
  }

}
</script>

<style lang="less">
@import '../../style/widget/iox-search/iox-search.less';

</style>