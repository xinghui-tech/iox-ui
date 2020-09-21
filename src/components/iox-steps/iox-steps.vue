<template>
  <view :class="mainClass" :style="mainStyle">
    <view class="iox-step__wrapper">
      <template v-for="(item, index) in steps">
        <view
          :key="index"
          @tap="onClick"
          :data-index="index"
          :class="[bem('step', [direction, status(index, active)])] + 'iox-hairline'"
          :style="status(index, active) === 'inactive' ? 'color: ' + inactiveColor: ''"
        >
          <view class="iox-step__title" :style="(index === active) ? 'color: ' + activeColor : ''">
            <view>{{ item.text }}</view>
            <view class="desc-class">{{ item.desc }}</view>
          </view>
          <view class="iox-step__circle-container">
            <block v-if="index !== active">
              <iox-icon
                v-if="item.inactiveIcon || inactiveIcon"
                :color="status(index, active) === 'inactive' ? inactiveColor: activeColor"
                :name="item.inactiveIcon || inactiveIcon"
                custom-class="iox-step__icon"
              />
              <view
                v-else
                class="iox-step__circle"
                :style="'background-color: ' + (index < active ? activeColor : inactiveColor)"
              />
            </block>

            <iox-icon v-else :name="item.activeIcon || activeIcon" :color="activeColor" custom-class="iox-step__icon" />
          </view>
          <view
            v-if="index !== (steps.length - 1)"
            class="iox-step__line" :style="'background-color: ' + (index < active ? activeColor : inactiveColor)"
          />
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from "vue-property-decorator";
import Base from '../../mixins/base';
import { GREEN, GRAY_DARK } from '../../utils/color';

const classPrefix = 'iox-steps';
@Component({
  externalClasses: [ 'desc-class', ]
})
export default class IoxSteps extends mixins(Base) {

  @Prop({
    type: Array
  })
  steps!: [];

  @Prop({
    type: Number
  })
  active!: number;

  @Prop({
    type: String,
    default: 'horizontal',
  },)
  direction!: string;

  @Prop({
    type: String,
    default: GREEN,
  },)
  activeColor!: string;

  @Prop({
    type: String,
    default: GRAY_DARK,
  },)
  inactiveColor!: string;

  @Prop({
    type: String,
    default: 'checked',
  },)
  activeIcon!: string;

  @Prop({
    type: String
  })
  inactiveIcon!: string;



  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.classPrefix} ${this.bem('steps', [this.direction])}`;
  }

  get mainStyle() {
    return `${this.customStyle || ''}`;
  }

  status(index?: any, active?: any) {
    if (index < active) {
      return 'finish';
    } else if (index === active) {
      return 'process';
    }
    return 'inactive';
  }

  onClick(event: TouchEvent) {
    const { currentTarget } = event;
    const { dataset } = currentTarget as any;
    const { index } = dataset;
    this.$emit('click-step', index);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-steps/iox-steps.less';

</style>