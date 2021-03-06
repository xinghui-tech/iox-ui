<template>
  <view 
    :class="mainClass" 
    :style="mainStyle"
    @tap="onClick">
    <view
      :class="contentClasses"
      :style="contentStyle"
    >
      <block v-if="useSlot">
        <slot />
      </block>
      <block v-else>
        <view :class="iconClasses">
          <iox-icon v-if="icon" :name="icon" :color="iconColor" 
            :dot="dot" :info="badge || info" :size="iconSize" />
          <slot v-else name="icon"></slot>
        </view>
        <view :class="textClasses">
          <text v-if="text">{{ text }}</text>
          <slot v-else name="text"></slot>
        </view>
      </block>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';
import Link from '../../mixins/link';
import { addUnit } from '../../utils/utils';

const classPrefix = 'iox-grid-item';

@Component({
  name: 'iox-grid-item',
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['content-class', 'icon-class', 'text-class', 'custom-class'],
  // #endif
})
export default class IoxGridItem extends mixins(Base, Emitter, Link) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  contentClass?: string;

  @Prop({type: String})
  iconClass?: string;

  @Prop({type: String})
  textClass?: string;
  // #endif

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
    type: [String, Number]
  })
  info?: string | number;

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
    return `${this.viewStyle} ${this._rootStyles}`;
  }

  get mainClass() {
    const classes = this.bem('grid-item', { square: this.square });
    return `${classes} ${this._rootClasses}`;
  }

  get contentClasses() {
    const { direction, center, square, clickable, border, gutter } = this;
    const classes = this.bem('grid-item__content', [direction, { center, square, clickable, surround: border && gutter }]);
    let cls = 'content-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.contentClass || '');
    // #endif
    return `${ classes } ${ this.border ? 'iox-hairline--surround' : '' } ${cls}`;
  }

  get iconClasses() {
    let cls = 'icon-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.iconClass || '');
    // #endif

    return `iox-grid-item__icon ${cls}`;
  }

  get textClasses() {
    let cls = `text-class`;
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.textClass || '');
    // #endif

    return `iox-grid-item__text ${cls}`;
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