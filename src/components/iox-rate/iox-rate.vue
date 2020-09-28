<template>
  <view
    :class="mainClass"
    :style="mainStyle"
    @touchmove="onTouchMove"
  >
    <template v-for="(item, index) in innerCountArray">
      <view
        class="iox-rate__item"
        :key="index"
        :style="'padding-right:'+(index !== count - 1 ? [addUnit(gutter)] : '')"
      >
        <iox-icon
          :name="(index + 1) <= innerValue ? icon : voidIcon"
          class="iox-rate__icon"
          :style="'font-size:' + [addUnit(size)] + ';'"
          custom-class="icon-class"
          :data-score="index"
          :color="disabled ? disabledColor : (index + 1) <= innerValue ? color : voidColor"
          @click="onSelect(index)"
        />

        <iox-icon
          v-if="allowHalf"
          :name="(index + 0.5) <= innerValue ? icon : voidIcon"
          :class="[bem('rate__icon', ['half'])]"
          :style="'font-size:'+[addUnit(size)]+';'"
          custom-class="icon-class"
          :data-score="index - 0.5"
          :color="disabled ? disabledColor : (index + 0.5) <= innerValue ? color : voidColor"
          @click="onSelect(index - 0.5)"
        />
      </view>
    </template>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch, Model } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { addUnit } from '../../utils/utils';
import { canIUseModel } from '../../utils/utils';


const classPrefix = 'iox-rate';
@Component({
  behaviors: ['uni://form-field'],
  externalClasses: ['icon-class'],
})
export default class IoxRate extends mixins(Base) {

  @Model('input', { type: [String, Number] })
  readonly value?: string | number;


  @Prop({
    type: Boolean,
  })
  readonly?: boolean;

  @Prop({
    type: Boolean,
  })
  disabled?: boolean;

  @Prop({
    type: Boolean,
  })
  allowHalf?: boolean;

  @Prop() size?: null;

  @Prop({
    type: String,
    default: 'star'
  })
  icon?: string;

  @Prop({
    type: String,
    default: 'star-o'
  })
  voidIcon?: string;

  @Prop({
    type: String,
    default: '#ffd21e'
  })
  color?: string;

  @Prop({
    type: String,
    default: '#c7c7c7'
  })
  voidColor?: string;

  @Prop({
    type: String,
    default: '#bdbdbd'
  })
  disabledColor?: string;

  @Prop({
    type: Number,
    default: 5
  })
  count?: number;

  @Prop() gutter?: null;

  @Prop({
    type: Boolean,
    default: true
  })
  touchable?: boolean;


  innerValue = 0;
  innerCountArray = Array.from({ length: 5 });


  @Watch('value')
  valueChanged(newVal: number, oldVal: number) {
    if (newVal !== this.innerValue) {
      this.innerValue = newVal;
    }
  }

  @Watch('count')
  countChanged(newVal: number, oldVal: number) {
    this.innerCountArray = Array.from({ length: newVal });
  }


  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.classPrefix} custom-class`;
  }

  mounted() {
  }

  protected addUnit(value: string | number | null, unit = 'px'):string | undefined  {
    return addUnit(value);
  }

  onSelect(v: number) {
    const score = v;
    if (!this.disabled && !this.readonly) {
      this.innerValue = score + 1;
      wx.nextTick(() => {
        this.$emit('input', score + 1);
        this.$emit('change', score + 1);
      });
    }
  }

  onTouchMove(event: TouchEvent) {
    const touchable = this.touchable;
    if (!touchable) return;

    const { clientX } = event.touches[0];

    this.getRect('.iox-rate__icon', true).then(
      (list: any) => {
        const target = list
          .sort((item: any) => item.right - item.left)
          .find((item: any) => clientX >= item.left && clientX <= item.right);
        if (target != null) {
          const { score } = target.dataset
          this.onSelect(score);
        }
      }
    );
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-rate/iox-rate.less';

</style>