<template>
  <view :class="mainClass" :style="mainStyle">
    <view class="iox-step__wrapper">
      <template v-for="(item, index) in steps">
        <view
          :key="index"
          @tap="onClick"
          :data-index="index"
          :class="[bem('step', [direction, status(index, active)]), 'iox-hairline']"
          :style="status(index, active) === 'inactive' ? 'color: ' + inactiveColor: ''"
        >
          <view class="iox-step__title" :style="item.color ? 'color: ' + item.color : ((index === active) ? 'color: ' + activeColor : '')">
            <view :class="(index === active) ? textClasses : inactiveTextClasses" :style="item.color ? 'color: ' + item.color : ''">{{ item.text }}</view>
            <view v-if="item.title" :class="(index === active) ? titleClasses : inactiveTitleClasses" :style="item.color ? 'color: ' + item.color : ''">{{ item.title }}</view>
            <view :class="(index === active) ? descClasses : inactiveDescClasses" :style="item.color ? 'color: ' + item.color : ''">{{ item.desc }}</view>
          </view>
          <view class="iox-step__circle-container">
            <block v-if="index !== active">
              <iox-icon
                v-if="item.inactiveIcon || inactiveIcon"
                :color="item.color || (status(index, active) === 'inactive' ? inactiveColor: activeColor)"
                :name="item.inactiveIcon || inactiveIcon"
                custom-class="iox-step__icon"
              />
              <view
                v-else
                class="iox-step__circle"
                :style="'background-color: ' + (item.color || (index < active ? activeColor : inactiveColor))"
              />
            </block>

            <iox-icon v-else :name="item.activeIcon || activeIcon" :color="item.color || activeColor" custom-class="iox-step__icon"/>
          </view>
          <view
            v-if="index !== (steps.length - 1)"
            class="iox-step__line" :style="'background-color: ' + (steps[index+1].color || (index < active ? activeColor : inactiveColor))"
          />
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import Base from '../../mixins/base';
import { GREEN, GRAY_DARK } from '../../utils/color';

const classPrefix = 'iox-steps';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: [ 'text-class', 'title-class', 'desc-class', 'inactive-text-class', 'inactive-title-class', 'inactive-desc-class', 'custom-class' ]
  // #endif
})
export default class IoxSteps extends mixins(Base) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  textClass?: string;

  @Prop({type: String})
  titleClass?: string;

  @Prop({type: String})
  descClass?: string;

  @Prop({type: String})
  inactiveTextClass?: string;

  @Prop({type: String})
  inactiveTitleClass?: string;

  @Prop({type: String})
  inactiveDescClass?: string;
  // #endif

  @Prop({
    type: String,
  },)
  icon!: string;

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
    default: 'check',
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
    return `${this.bem('steps', [this.direction])} ${this._rootClasses}`;
  }

  get titleClasses() {
    let cls = 'title-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.titleClass || '');
    // #endif

    return cls;
  }

  get textClasses() {
    let cls = 'text-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.textClass || '');
    // #endif

    return cls;
  }

  get descClasses() {
    let cls = `desc-class`;
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.descClass || '');
    // #endif

    return cls;
  }

  get inactiveTitleClasses() {
    let cls = `inactive-title-class`;
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.inactiveTitleClass || '');
    // #endif

    return cls;
  }

  get inactiveTextClasses() {
    let cls = 'inactive-text-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.inactiveTextClass || '');
    // #endif

    return cls;
  }

  get inactiveDescClasses() {
    let cls = 'inactive-desc-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.inactiveTextClass || '');
    // #endif

    return cls;
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