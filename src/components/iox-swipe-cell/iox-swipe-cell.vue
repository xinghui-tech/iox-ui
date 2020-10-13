<template>
  <view
    :class="mainClass"
    :style="mainStyle"
    data-key="cell"
    @tap.stop="onClick"
    @touchstart="startDrag"
    @touchmove.stop="catchMove ? 'noop' : ''"
    @touchmove.capture="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag"
  >
    <view :style="wrapperStyle">
      <view v-if="leftWidth" class="iox-swipe-cell__left" data-key="left" @tap.stop="onClick">
        <slot name="left" />
      </view>
      <slot />
      <view v-if="rightWidth" class="iox-swipe-cell__right" data-key="right" @tap.stop="onClick">
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Touch from '../../mixins/touch';
import { range } from '../../utils/utils';

const THRESHOLD = 0.3;
let ARRAY: Vue[] = [];

const classPrefix = 'iox-swipe-cell';
@Component({})
export default class IoxSwipeCell extends mixins(Base, Touch) {

  @Prop() disabled?: boolean;
  @Prop() asyncClose?: boolean;

  @Prop({
    type: Number,
    default: 0
  })
  leftWidth?: number;

  @Prop({
    type: Number,
    default: 0
  })
  rightWidth?: number;

  @Prop({
    type: [Number, String],
    default: ''
  })
  name?: number | string;

  catchMove = false;
  offset = 0;
  dragging = false;
  wrapperStyle = '';
  startOffset: number | null = null;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.classPrefix} ${this._rootClasses}`;
  }


  @Watch('leftWidth')
  leftWidthChanged(newV: number){
    if (this.offset > 0) {
      this.swipeMove(newV);
    }
  }

  @Watch('rightWidth')
  rightWidthChanged(newV: number){
    if (this.offset < 0) {
      this.swipeMove(-newV);
    }
  }


  created() {
    this.offset = 0;
    ARRAY.push(this as any);
  }

  destroyed() {
    ARRAY = ARRAY.filter((item) => item !== this);
  }

  protected range(num: number, min: number, max: number) {
    return range(num, min, max);
  }


  open(position: 'left' | 'right') {
    const { leftWidth, rightWidth } = this as any;
    const offset = position === 'left' ? leftWidth : -rightWidth;
    this.swipeMove(offset);

    this.$emit('open', {
      position,
      name: this.name,
    });
  }

  close() {
    this.swipeMove(0);
  }

  swipeMove(offset = 0) {
    this.offset = range(offset, -(this.rightWidth as number), this.leftWidth as number);

    const transform = `translate3d(${this.offset}px, 0, 0)`;
    const transition = this.dragging ? 'none' : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';

    this.wrapperStyle = `
      -webkit-transform: ${transform};
      -webkit-transition: ${transition};
      transform: ${transform};
      transition: ${transition};
    `;
  }

  swipeLeaveTransition() {
    const { leftWidth, rightWidth } = this as any;
    const { offset } = this;

    if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
      this.open('right');
    } else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
      this.open('left');
    } else {
      this.swipeMove(0);
    }
    this.catchMove = false;
  }

  startDrag(event: TouchEvent) {
    if (this.disabled) {
      return;
    }

    this.startOffset = this.offset;
    this.touchStart(event);
  }

  noop() {}

  onDrag(event: TouchEvent) {
    if (this.disabled) {
      return;
    }

    this.touchMove(event);

    if (this.direction !== 'horizontal') {
      return;
    }

    this.dragging = true;
    ARRAY.filter((item) => item !== this).forEach((item: any) => item.close());
    this.catchMove = true;
    this.swipeMove(this.startOffset! + this.deltaX);
  }

  endDrag() {
    if (this.disabled) {
      return;
    }

    this.dragging = false;
    this.swipeLeaveTransition();
  }

  onClick(event: any) {
    const { key: position = 'outside' } = event.currentTarget.dataset;
    this.$emit('click', position);

    if (!this.offset) {
      return;
    }

    if (this.asyncClose) {
      this.$emit('close', {
        position,
        instance: this,
        name: this.name,
      });
    } else {
      this.swipeMove(0);
    }
  }


}
</script>

<style lang="less">
@import '../../style/widget/iox-swipe-cell/iox-swipe-cell.less';

</style>