<template>
  <view
    v-if="show"
    :class="mainClass"
    :style="mainStyle"
    @tap="onClick"
  >
    <iox-icon
      v-if="leftIcon"
      size="16px"
      :name="leftIcon"
      class="iox-notice-bar__left-icon"
    />
    <slot v-else name="left-icon" />

    <view :class="[uuidWrapClass, 'iox-notice-bar__wrap']">
      <view :class="[uuidContentClass, 'iox-notice-bar__content', !scrollable && !wrapable ? 'iox-ellipsis' : '']" :animation="animationData">
        {{ text }}
      </view>
    </view>

    <iox-icon
      v-if="mode === 'closeable'"
      class="iox-notice-bar__right-icon"
      name="close"
      @click="onClickIcon"
    />
    <navigator
      v-else-if="mode === 'link'"
      :url="url"
      :open-type="openType"
    >
      <iox-icon class="iox-notice-bar__right-icon" name="angle-right" />
    </navigator>
    <slot v-else name="right-icon" />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { nextSequence, requestAnimationFrame } from '../../utils/utils';

const classPrefix = 'iox-notice-bar';

@Component
export default class IoxNoticeBar extends mixins(Base) {
  @Prop({
    type: String,
    default: ''
  })
  text!: string;

  @Prop({
    type: String,
    default: ''
  })
  mode!: string;

  @Prop({
    type: String,
    default: '',
  })
  url!: string;

  @Prop({
    type: String,
    default: 'navigate',
  })
  openType!: string;

  @Prop({
    type: Number,
    default: 1,
  })
  delay!: number;

  @Prop({
    type: Number,
    default: 50,
  })
  speed!: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  scrollable!: boolean;

  @Prop({
    type: String,
    default: '',
  })
  leftIcon!: string;

  @Prop({
    type: String,
  })
  color?: string;

  @Prop({
    type: String,
  })
  backgroundColor?: string;

  @Prop({
    type: String,
  })
  background?: string;

  @Prop({
    type: Boolean,
  })
  wrapable?: boolean;

  show = true;
  animation!: UniApp.Animation;
  resetAnimation!: UniApp.Animation;
  timer?: number | null;
  wrapWidth = 0;
  contentWidth = 0;
  duration = 300;
  animationData: any | null = null;

  uuidWrapClass = `${this.classPrefix}__wrap__uuid${nextSequence()}`;
  uuidContentClass = `${this.classPrefix}__content__uuid${nextSequence()}`;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes: string = this.bem('notice-bar', { withicon: this.mode, wrapable: this.wrapable });
    return `${classes} ${this._rootClasses}`;
  }

  get mainStyle() {
    return `color: ${ this.color }; background-color: ${ this.backgroundColor }; background: ${ this.background } ${this._rootStyles}`;
  }

  created() {
    this.resetAnimation = uni.createAnimation({
      duration: 0,
      timingFunction: 'linear',
    });
  }

  mounted() {
    this.init();
  }

  destroyed() {
    this.timer && clearTimeout(this.timer);
  }

  @Watch('text')
  @Watch('speed')
  onSpeedChanged() {
    this.$nextTick(() => this.init());
  }

  init() {
    let contentSelector = '.iox-notice-bar__content';
    // #ifdef MP-ALIPAY
    contentSelector = `.${this.uuidContentClass}`;
    // #endif

    let wrapSelector = '.iox-notice-bar__wrap';
    // #ifdef MP-ALIPAY
    wrapSelector = `.${this.uuidWrapClass}`;
    // #endif

    Promise.all([
      this.getRect(contentSelector),
      this.getRect(wrapSelector),
    ]).then((rects) => {
      const [contentRect, wrapRect] = rects as UniApp.NodeInfo[];
      if ( contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width
      ) {
        return;
      }

      const { speed, scrollable, delay } = this;

      if (scrollable && wrapRect.width < contentRect.width) {
        const duration = (contentRect.width / speed) * 1000;

        this.wrapWidth = wrapRect.width;
        this.contentWidth = contentRect.width;
        this.duration = duration;
        this.animation = uni.createAnimation({
          duration,
          timingFunction: 'linear',
          delay,
        });

        this.scroll();
      }
    });
  }

  scroll() {
    this.timer && clearTimeout(this.timer);
    this.timer = null;

    this.resetAnimation
        .translateX(this.wrapWidth)
        .step();
    this.animationData = this.resetAnimation.export();

    requestAnimationFrame(() => {
      this.animation
          .translateX(-this.contentWidth)
          .step();
      this.animationData = this.animation.export();
    });

    this.timer = setTimeout(() => {
      this.scroll();
    }, this.duration);
  }

  onClickIcon(event: Event) {
    if (this.mode === 'closeable') {
      this.timer && clearTimeout(this.timer);
      this.timer = null;

      this.show = false;
      this.$emit('close', event);
    }
  }

  onClick(event: Event) {
    this.$emit('click', event);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-notice-bar/iox-notice-bar.less';

</style>