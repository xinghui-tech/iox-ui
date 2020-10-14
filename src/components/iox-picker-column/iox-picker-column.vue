<template>
  <view
    :class="mainClass" :style="mainStyle"
    @touchstart="onTouchStart"
    @touchmove.stop="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <view :style="'' + optionsStyle">
      <view
        v-for="(option, index) in options"
        :key="index"
        :style="'height: ' + itemHeight + 'px;'"
        :class="`iox-ellipsis iox-picker-column__item ` + (option && option.disabled ? 'iox-picker-column__item--disabled ' : '' ) + ( index === currentIndex ? activeClasses : '' )"
        @tap="onClickItem(index)"
      >{{ getOptionText(option, valueKey) }}</view>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { range, isObj } from '../../utils/utils';

const DEFAULT_DURATION = 200;

const classPrefix = 'iox-picker-column';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['active-class', 'custom-class'],
  // #endif
})
export default class IoxPickerColumn extends mixins(Base) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  activeClass?: string;
  // #endif

  @Prop({
    type: String,
    required: true
  })
  valueKey!: string;

  @Prop({
    type: String,
  })
  className?: string;

  @Prop({
    type: Number,
    required: true
  })
  itemHeight!: number;

  @Prop({
    type: Number,
    required: true,
  })
  visibleItemCount!: number;

  @Prop({
    type: Array,
    default: [],
  })
  initialOptions!: any[];

  @Prop({
    type: Number,
    default: 0,
  })
  defaultIndex!: number;

  startY = 0;
  offset = 0;
  duration = 0;
  startOffset = 0;
  options: any[] = [];
  currentIndex = 0;
  

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `height: ${ this.itemHeight * this.visibleItemCount }px; ${this._rootStyles}`;
  }

  get activeClasses() {
    let cls = 'active-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.activeClass || '');
    // #endif

    return `iox-picker-column__item--selected ${cls}`;
  }

  get optionsStyle() {
    const { duration, itemHeight, offset, visibleItemCount } = this;
    return `transition: transform ${ duration }ms; line-height: ${ itemHeight }px; transform: translate3d(0, ${ offset + (itemHeight * (visibleItemCount - 1)) / 2 }px, 0)`;
  }

  //hooks
  created() {
    const { defaultIndex, initialOptions } = this;

    this.setThen({
      currentIndex: defaultIndex,
      options: initialOptions,
    }).then(()=> {
      this.setIndex(defaultIndex);
    });
  }

  //methods
  getCount() {
    return this.options.length;
  }

  onTouchStart(event: TouchEvent) {
    this.startY = event.touches[0].clientY,
    this.startOffset = this.offset,
    this.duration = 0;
  }

  onTouchMove(event: TouchEvent) {
    const deltaY = event.touches[0].clientY - this.startY;
    this.offset = range(
      this.startOffset + deltaY,
      -(this.getCount() * this.itemHeight),
      this.itemHeight
    );
  }

  onTouchEnd() {
    if (this.offset !== this.startOffset) {
      this.duration = DEFAULT_DURATION;

      const index = range(
        Math.round(-this.offset / this.itemHeight),
        0,
        this.getCount() - 1
      );
      this.setIndex(index, true);
    }
  }

  onClickItem(index: number) {
    this.setIndex(index, true);
  }

  adjustIndex(index: number) {
    const count = this.getCount();

    index = range(index, 0, count);
    for (let i = index; i < count; i++) {
      if (!this.isDisabled(this.options[i])) return i;
    }
    for (let i = index - 1; i >= 0; i--) {
      if (!this.isDisabled(this.options[i])) return i;
    }
  }

  isDisabled(option: any) {
    return isObj(option) && option.disabled;
  }

  getOptionText(option: any) {
    return isObj(option) && this.valueKey in option ?
      option[this.valueKey] : option;
  }

  @Watch('defaultIndex')
  setIndex(index: number, userAction?: boolean) {
    index = this.adjustIndex(index) || 0;
    const offset = -index * this.itemHeight;

    if (index !== this.currentIndex) {
      return this.setThen({ offset, currentIndex: index }).then(() => {
        userAction && this.$emit('change', index);
      });
    }

    return this.setThen({ offset });
  }

  setValue(value: string) {
    const { options } = this;
    for (let i = 0; i < options.length; i++) {
      if (this.getOptionText(options[i]) === value) {
        return this.setIndex(i);
      }
    }
    return Promise.resolve();
  }

  getValue() {
    return this.options[this.currentIndex];
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-picker-column/iox-picker-column.less';

</style>