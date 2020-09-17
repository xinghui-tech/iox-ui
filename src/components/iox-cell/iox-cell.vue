<template>
  <view
    :class="mainClass"
    :style="mainStyle"
    hover-class="iox-cell--hover hover-class"
    hover-stay-time="70"
    @tap="onClick"
  >
    <iox-icon
      v-if="icon"
      :name="icon"
      class="iox-cell__left-icon-wrap"
      custom-class="iox-cell__left-icon"
    />
    <slot v-else name="icon" />

    <view
      :style="(titleWidth ? 'max-width:' + titleWidth + ';min-width:' + titleWidth + ';' : '') + titleStyle"
      class="iox-cell__title title-class"
    >
      <block v-if="title">{{ title }}</block>
      <slot v-else name="title" />

      <view v-if="label || useLabelSlot" class="iox-cell__label label-class">
        <slot v-if="useLabelSlot" name="label" />
        <block v-else-if="label">{{ label }}</block>
      </view>
    </view>

    <view class="iox-cell__value value-class">
      <block v-if="value || value === 0">{{ value }}</block>
      <slot v-else />
    </view>

    <iox-icon
      v-if="isLink"
      :name="arrowDirection ? 'chevron' + '-' + arrowDirection : 'chevron-right'"
      class="iox-cell__right-icon-wrap right-icon-class"
      custom-class="iox-cell__right-icon"
    />
    <slot v-else name="right-icon" />

    <slot name="extra" />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Link from '../../mixins/link';

const classPrefix = 'iox-cell';
@Component({
  externalClasses: [
    'title-class',
    'label-class',
    'value-class',
    'right-icon-class',
    'hover-class',
    'custom-class'
  ]
})
export default class IoxCell extends mixins(Base, Link) {
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
    default: true,
  })
  border?: boolean;

  @Prop({
    type: String,
  })
  titleStyle?: string;

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
    return `custom-class ${this.customClass || ''} ${classes}`;
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