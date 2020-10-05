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

    <view class="iox-notice-bar__wrap">
      <view :class="['iox-notice-bar__content', !scrollable && !wrapable ? 'iox-ellipsis' : '']" :animation="animationData">
        {{ text }}
      </view>
    </view>

    <iox-icon
      v-if="mode === 'closeable'"
      class="iox-notice-bar__right-icon"
      name="close"
      @tap.stop="onClickIcon"
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
import { requestAnimationFrame } from '../../utils/utils';

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
    type: String,
  })
  wrapable?: string;

  show = true;
  animation!: WechatMiniprogram.Animation;
  resetAnimation!: WechatMiniprogram.Animation;
  timer?: number | null;
  wrapWidth = 0;
  contentWidth = 0;
  duration = 300;
  animationData: WechatMiniprogram.AnimationExportResult | null = null;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes: string = this.bem('notice-bar', { withicon: this.mode, wrapable: this.wrapable });
    return `${classes} custom-class`;
  }

  get mainStyle() {
    return `color: ${ this.color }; background-color: ${ this.backgroundColor }; background: ${ this.background } ${this.customStyle || ''}`;
  }

  created() {
    this.resetAnimation = wx.createAnimation({
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
    Promise.all([
      this.getRect('.iox-notice-bar__content'),
      this.getRect('.iox-notice-bar__wrap'),
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
        this.animation = wx.createAnimation({
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

    this.animationData = this.resetAnimation
        .translateX(this.wrapWidth)
        .step()
        .export();

    requestAnimationFrame(() => {
      this.animationData = this.animation
          .translateX(-this.contentWidth)
          .step()
          .export();
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