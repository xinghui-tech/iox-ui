<template>
  <view :class="mainClass" :style="mainStyle" >
    <slot />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';

const classPrefix = 'iox-divider';
@Component
export default class IoxDivider extends mixins(Base) {

  @Prop({
    type: Boolean,
    default: false,
  })
  dashed!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  hairline!: boolean;

  @Prop({
    type: String,
    default: '',
  })
  contentPosition!: string;

  @Prop({
    type: [Number, String],
    default: 16,
  })
  fontSize!: number | string;

  @Prop({
    type: String,
    default: '',
  })
  borderColor!: string;

  @Prop({
    type: String,
    default: '',
  })
  textColor!: string;

  @Prop({
    type: String,
    default: '',
  })
  customStyle!: string;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const { dashed, hairline, contentPosition } = this;
    const classes: string = this.bem('divider', [{dashed, hairline}, contentPosition]);
    return `${classes} custom-class`;
  }

  get mainStyle() {
    const { borderColor, textColor, fontSize } = this;
    return `${ borderColor  ? 'border-color: ' + borderColor + ';' : '' } ${ textColor ? 'color: ' + textColor + ';' : '' } ${ fontSize ? 'font-size: ' + fontSize + 'px;' : '' } ${ this.customStyle || '' }`;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-divider/iox-divider.less';

</style>