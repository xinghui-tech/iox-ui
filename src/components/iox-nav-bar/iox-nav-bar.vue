<template>
  <view :class="mainClass" :style="mainStyle" >
    <view class="iox-nav-bar__content">
      <view class="iox-nav-bar__left" @tap="onClickLeft">
        <block v-if="leftArrow || leftText">
          <iox-icon
            v-if="leftArrow"
            size="16px"
            name="angle-left"
            custom-class="iox-nav-bar__arrow"
          />
          <view
            v-if="leftText"
            class="iox-nav-bar__text"
            hover-class="iox-nav-bar__text--hover"
            hover-stay-time="70"
          >{{ leftText }}</view>
        </block>
        <slot v-else name="left" />
      </view>
      <view class="iox-nav-bar__title title-class iox-ellipsis">
        <block v-if="title">{{ title }}</block>
        <slot v-else name="title" />
      </view>
      <view class="iox-nav-bar__right" @tap="onClickRight">
        <view
          v-if="rightText"
          class="iox-nav-bar__text"
          hover-class="iox-nav-bar__text--hover"
          hover-stay-time="70"
        >{{ rightText }}</view>
        <slot v-else name="right" />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { getSystemInfoSync } from '../../utils/utils';

const classPrefix = 'iox-nav-bar';

@Component({
  externalClasses: ['title-class', 'custom-class']
})
export default class IoxNavBar extends mixins(Base) {
  @Prop({
    type: String,
    default: ''
  })
  title?: string;

  @Prop({
    type: Boolean,
  })
  fixed?: boolean;

  @Prop({
    type: Boolean,
  })
  placeholder?: boolean;

  @Prop({
    type: String,
  })
  leftText?: string;

  @Prop({
    type: String,
  })
  rightText?: string;

  @Prop({
    type: String,
    default: '',
  })
  textColor!: string;

  @Prop({
    type: Boolean,
  })
  leftArrow?: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  border!: boolean;

  @Prop({
    type: Number,
    default: 1,
  })
  zIndex!: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  safeAreaInsetTop!: boolean;

  statusBarHeight = 0;
  height = 44;
  baseStyle = '';

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes: string = this.bem('nav-bar', { fixed: this.fixed });
    return `${classes} custom-class ${ this.border ? 'iox-hairline--bottom' : '' }`;
  }

  get mainStyle() {
    return `${this.baseStyle} ${this.customStyle || ''}`;
  }

  created() {
    const { statusBarHeight } = getSystemInfoSync();
    const { safeAreaInsetTop, zIndex } = this;
    const paddingTop = safeAreaInsetTop ? statusBarHeight : 0;
    const baseStyle = `z-index: ${zIndex};padding-top: ${paddingTop}px;`;
    this.statusBarHeight = statusBarHeight;
    this.height = 44 + statusBarHeight,
    this.baseStyle = baseStyle;
  }

  mounted() {
    this.setHeight();
  }

  onClickLeft() {
    this.$emit('click-left');
  }

  onClickRight() {
    this.$emit('click-right');
  }

  @Watch('fixed')
  @Watch('placeholder')
  setHeight() {
    if (!this.fixed || !this.placeholder) {
      return;
    }

    this.$nextTick(() => {
      this.getRect('.iox-nav-bar').then(
        (res) => {
          this.height = (res as UniApp.NodeInfo).height!;
        }
      );
    });
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-nav-bar/iox-nav-bar.less';

</style>