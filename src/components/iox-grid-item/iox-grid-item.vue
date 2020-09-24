<template>
  <view 
    :class="mainClass" 
    :style="mainStyle"
    @tap="onClick">
    <view
      :class="contentClass"
      :style="contentStyle"
    >
      <block v-if="useSlot">
        <slot />
      </block>
      <block v-else>
        <view class="iox-grid-item__icon icon-class">
          <iox-icon v-if="icon" :name="icon" :color="iconColor" 
            :dot="dot" :info="badge || info" :size="iconSize" />
          <slot v-else name="icon"></slot>
        </view>
        <view class="iox-grid-item__text text-class">
          <text v-if="text">{{ text }}</text>
          <slot v-else name="text"></slot>
        </view>
      </block>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';
import Link from '../../mixins/link';
import { addUnit } from '../../utils/utils';

const classPrefix = 'iox-grid-item';

@Component({
  name: 'iox-grid-item',
  externalClasses: ['content-class', 'icon-class', 'text-class'],
})
export default class IoxGridItem extends mixins(Base, Emitter, Link) {
  @Prop({
    type: String,
  })
  icon?: string;

  @Prop({
    type: String,
  })
  iconColor?: string;

  @Prop({
    type: Boolean,
  })
  dot?: boolean;

  @Prop({
    type: String,
  })
  info?: string;

  @Prop({
    type: String,
  })
  badge!: string;

  @Prop({
    type: String,
  })
  text!: string;

  @Prop({
    type: Boolean,
  })
  useSlot!: boolean;

  // data
  viewStyle = '';
  parent?: Vue;
  index?: number;

  contentStyle: string | null = null;
  center = true;
  border = true;
  square = false;
  gutter: number | string = 0;
  clickable = false;
  direction: string | null = null;
  iconSize?: string;

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `${this.viewStyle} ${this.customStyle || ''}`;
  }

  get mainClass() {
    const classes = this.bem('grid-item', { square: this.square });
    return `custom-class ${classes}`;
  }

  get contentClass() {
    const { direction, center, square, clickable, border, gutter } = this;
    const classes = this.bem('grid-item__content', [direction, { center, square, clickable, surround: border && gutter }]);
    return `content-class ${ classes } ${ this.border ? 'iox-hairline--surround' : '' }`;
  }

  beforeMount() {
    this.$$dispatch('iox-grid', 'grid-item-attached', this);
    this.$nextTick(() => {
      this.updateStyle();
    });
  }

  destroyed() {
    this.$$dispatch('iox-grid', 'grid-item-detached', this);
  }

  updateStyle() {
    if (!this.parent) {
      return;
    }

    const {
      columnNum,
      border,
      square,
      gutter,
      clickable,
      center,
      direction,
      iconSize,
      children
    } = this.parent as any;
    const width = `${100 / columnNum}%`;

    const styleWrapper = [];
    styleWrapper.push(`width: ${width}`);

    if (square) {
      styleWrapper.push(`padding-top: ${width}`);
    }

    if (gutter) {
      const gutterValue = addUnit(gutter);
      styleWrapper.push(`padding-right: ${gutterValue}`);

      const index = children.indexOf(this);
      if (index >= columnNum && !square) {
        styleWrapper.push(`margin-top: ${gutterValue}`);
      }
    }

    let contentStyle = '';

    if (square && gutter) {
      const gutterValue = addUnit(gutter);

      contentStyle = `
        right: ${gutterValue};
        bottom: ${gutterValue};
        height: auto;
      `;
    }

    this.viewStyle = styleWrapper.join('; ');
    this.contentStyle = contentStyle;
    this.center = center;
    this.border = border;
    this.square = square;
    this.gutter = gutter;
    this.clickable = clickable;
    this.direction = direction;
    this.iconSize = iconSize;

    this.$emit('resize', columnNum);
  }

  onClick() {
    this.$emit('click');
    this.jumpLink();
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-grid-item/iox-grid-item.less';

</style>