<template>
  <view
    :class="mainClass" :style="mainStyle"
    @tap="onClick"
  >
    <view :class="nodeClasses">
      <iox-loading v-if="loading" :color="loadingColor" custom-class="iox-switch__loading" />
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Model } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { BLUE, GRAY_DARK } from '../../utils/color';

const classPrefix = 'iox-switch';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  behaviors: ['uni://form-field'],
  externalClasses: ['node-class', 'custom-class'],
  // #endif
})
export default class IoxSwitch extends mixins(Base) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  name?: string;

  @Prop({type: String})
  nodeClass?: string;
  // #endif

  // props
  @Model('change', { type: [Object, Boolean], default: true })
  readonly value!: boolean | any;

  @Prop({
    type: String,
    default: '30px'
  })
  size!: string;

  @Prop({
    type: Boolean,
  })
  loading?: boolean;

  @Prop({
    type: Boolean,
  })
  disabled?: boolean;

  @Prop({
    type: String,
  })
  inactiveColor?: string;

  @Prop({
    type: String,
  })
  activeColor?: string;

  @Prop({
    type: [Object, Boolean],
    default: true,
  })
  activeValue!: boolean | any;

  @Prop({
    type: [Object, Boolean],
    default: false,
  })
  inactiveValue!: boolean | any;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const { value, activeValue, disabled } = this;
    const classes: string = this.bem('switch', { on: value === activeValue, disabled: disabled });
    return `${classes} ${this._rootClasses}`;
  }

  get mainStyle() {
    const { size, value, activeColor, inactiveColor } = this;
    return `font-size: ${size}; ${(value ? activeColor : inactiveColor) ? 'background-color: ' + (value ? activeColor : inactiveColor ) : ''} ${this._rootStyles}`;
  }

  get nodeClasses() {
    let cls = 'node-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.nodeClass || '');
    // #endif

    return `iox-switch__node ${cls}`;
  }

  get loadingColor() {
    const { activeColor, inactiveColor } = this;
    return this.value ? activeColor || BLUE : inactiveColor || GRAY_DARK;
  }

  //hooks
  created() {
  }

  //methods
  onClick() {
    const { activeValue, inactiveValue } = this;
    if (!this.disabled && !this.loading) {
      const checked = this.value === activeValue;
      const value = !checked ? activeValue : inactiveValue;
      this.$emit('input', value);
      this.$emit('change', value);
    }
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-switch/iox-switch.less';

</style>