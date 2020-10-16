<template>
  <view
    :class="mainClass"
    :style="mainStyle"
    :hover-class="hoverClasses"
    hover-stay-time="70"
    @tap="onClick"
  >
    <slot v-if="extraPosition === 'top'" name="extra" />

    <iox-icon
      v-if="icon"
      :name="icon"
      class="iox-cell__left-icon-wrap"
      custom-class="iox-cell__left-icon"
    />
    <slot v-else name="icon" />

    <view v-if="showTitle"
      :style="(titleWidth ? 'max-width:' + titleWidth + ';min-width:' + titleWidth + ';' : '') + (titleStyle || '')"
      :class="titleClasses"
    >
      <block v-if="title">{{ title }}</block>
      <slot v-else name="title" />

      <view v-if="label || useLabelSlot" :class="labelClasses">
        <slot v-if="useLabelSlot" name="label" />
        <block v-else-if="label">{{ label }}</block>
      </view>
    </view>

    <view :class="valueClasses">
      <block v-if="value || value === 0">{{ value }}</block>
      <slot v-else />
    </view>

    <iox-icon
      v-if="isLink && !useRightIconSlot"
      :name="arrowDirection ? 'angle' + '-' + arrowDirection : 'angle-right'"
      :class="rightIconClasses"
      custom-class="iox-cell__right-icon"
    />
    <slot v-else name="right-icon" />

    <slot v-if="extraPosition !== 'top'" name="extra" />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Link from '../../mixins/link';

const classPrefix = 'iox-cell';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: [
    'title-class',
    'label-class',
    'value-class',
    'right-icon-class',
    'hover-class',
    'custom-class'
  ]
  // #endif
})
export default class IoxCell extends mixins(Base, Link) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  titleClass?: string;

  @Prop({type: String})
  labelClass?: string;

  @Prop({type: String})
  valueClass?: string;

  @Prop({type: String})
  rightIconClass?: string;

  @Prop({type: String})
  hoverClass?: string;
  // #endif

  @Prop({
    type: String,
    default: null
  })
  title?: string | null;

  @Prop({
    type: String,
    default: null
  })
  value?: string | null;

  @Prop({
    type: String,
  })
  icon?: string;

  @Prop({
    type: String,
  })
  size?: string;

  @Prop({
    type: String,
  })
  label?: string;

  @Prop({
    type: Boolean,
  })
  center?: boolean;

  @Prop({
    type: Boolean,
  })
  isLink?: boolean;

  @Prop({
    type: Boolean,
  })
  required?: boolean;

  @Prop({
    type: Boolean,
  })
  clickable?: boolean;

  @Prop({
    type: String,
  })
  titleWidth?: string;

  @Prop({
    type: String,
  })
  arrowDirection?: string;

  @Prop({
    type: Boolean,
  })
  useLabelSlot?: boolean;

  @Prop({
    type: Boolean,
  })
  useRightIconSlot?: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  border!: boolean;

  @Prop({
    type: String,
  })
  titleStyle?: string;

  @Prop({
    type: String,
    default: 'bottom'
  })
  extraPosition!: string;

  @Prop({
    type: Boolean,
    default: true
  })
  showTitle!: boolean;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes: string = this.bem('cell', [
      this.size,
      {
        center: this.center,
        required: this.required,
        borderless: !this.border,
        clickable: this.isLink || this.clickable,
      }
    ]);
    return `${classes} ${this._rootClasses}`;
  }

  get titleClasses() {
    let cls = 'title-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.titleClass || '');
    // #endif

    return `iox-cell__title ${cls}`;
  }

  get labelClasses() {
    let cls = 'label-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.labelClass || '');
    // #endif

    return `iox-cell__label ${cls}`;
  }

  get valueClasses() {
    let cls = `value-class`;
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.valueClass || '');
    // #endif

    return `iox-cell__value ${cls}`;
  }

  get rightIconClasses() {
    let cls = `right-icon-class`;
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.rightIconClass || '');
    // #endif

    return `iox-cell__right-icon-wrap ${cls}`;
  }

  get hoverClasses() {
    let cls = 'hover-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.hoverClass || '');
    // #endif

    return `iox-cell--hover ${cls}`;
  }

  onClick(event: TouchEvent) {
    this.$emit('click', event);
    this.jumpLink();
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-cell/iox-cell.less';

</style>