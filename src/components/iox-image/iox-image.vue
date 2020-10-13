<template>
  <view
    :class="mainClass"
    :style="mainStyle"
    @tap="onClick"
  >
    <image
      v-if="!error"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      :class="imageClasses"
      :show-menu-by-longpress="showMenuByLongpress"
      @load="onImageLoad"
      @error="onImageError"
    />

    <view
      v-if="loading && showLoading"
      :class="loadingClasses"
    >
      <slot v-if="useLoadingSlot" name="loading" />
      <iox-icon v-else name="photo" size="22" />
    </view>
    <view
      v-if="error && showError"
      :class="errorClasses"
    >
      <slot v-if="useErrorSlot" name="error" />
      <iox-icon v-else name="warning" size="22" />
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import * as utils from '../../utils/utils';
import Base from '../../mixins/base';
import Button from '../../mixins/button';
import OpenType from '../../mixins/open-type';

const FIT_MODE_MAP: {[k: string]: string} = {
  none: 'center',
  fill: 'scaleToFill',
  cover: 'aspectFill',
  contain: 'aspectFit',
  widthFix: 'widthFix',
  heightFix: 'heightFix',
};

const classPrefix = 'iox-image';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['custom-class', 'loading-class', 'error-class', 'image-class'],
  // #endif
})
export default class IoxImage extends mixins(Base, Button, OpenType) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  loadingClass?: string;

  @Prop({type: String})
  errorClass?: string;

  @Prop({type: String})
  imageClass?: string;
  // #endif

  @Prop({
    type: String,
    required: true
  })
  src!: string;

  @Prop({
    type: Boolean,
  })
  round?: boolean;

  @Prop({
    type: [String, Number],
  })
  width?: number | string;

  @Prop({
    type: [String, Number],
  })
  height?: number | string;

  @Prop({
    type: [String, Number],
  })
  radius?: string | number;

  @Prop({
    type: Boolean,
  })
  lazyLoad?: boolean;

  @Prop({
    type: Boolean,
  })
  useErrorSlot?: boolean;

  @Prop({
    type: Boolean,
  })
  useLoadingSlot?: boolean;

  @Prop({
    type: Boolean,
  })
  showMenuByLongpress?: boolean;

  @Prop({
    type: String,
    default: 'fill'
  })
  fit!: string;

  @Prop({
    type: Boolean,
    default: true
  })
  showError?: boolean;

  @Prop({
    type: Boolean,
    default: true
  })
  showLoading?: boolean;

  error = false;
  loading = true;
  viewStyle = '';
  mode: string = FIT_MODE_MAP[this.fit];

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes = this.bem('image', { round: this.round });
    return `${classes} ${this._rootClasses}`;
  }

  get mainStyle() {
    return `${this.viewStyle} ${this._rootStyles}`;
  }

  get loadingClasses() {
    let cls = 'loading-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.loadingClass || '');
    // #endif

    return `iox-image__loading ${cls}`;
  }

  get errorClasses() {
    let cls = 'error-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.errorClass || '');
    // #endif

    return `iox-image__error ${cls}`;
  }

  get imageClasses() {
    let cls = `image-class`;
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.imageClass || '');
    // #endif

    return `iox-image__img ${cls}`;
  } 

  @Watch('src')
  onSrcChanged() {
    this.error = false;
    this.loading = true;
  }

  mounted() {
    this.setMode();
    this.setStyle();
  }

  @Watch('fit')
  setMode() {
    this.mode = FIT_MODE_MAP[this.fit];
  }

  @Watch('width')
  @Watch('height')
  setStyle() {
    const { width, height, radius } = this;
    let style = '';

    if (utils.isDef(width)) {
      style += `width: ${utils.addUnit(width)};`;
    }

    if (utils.isDef(height)) {
      style += `height: ${utils.addUnit(height)};`;
    }

    if (utils.isDef(radius)) {
      style += 'overflow: hidden;';
      style += `border-radius: ${utils.addUnit(radius)};`;
    }

    this.viewStyle = style;
  }

  onImageLoad(event: CustomEvent) {
    this.loading = false;

    this.$emit('load', event.detail);
  }

  onImageError(event: CustomEvent) {
    this.loading = false;
    this.error = true;

    this.$emit('error', event.detail);
  }

  onClick(event: CustomEvent) {
    this.$emit('click', event.detail);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-image/iox-image.less';

</style>