<template>
	<button
    :class="mainClass"
    :style="mainStyle"
    :hover-class="hoverClasses"
    :lang="lang"
    :open-type="openType"
    :session-from="sessionFrom"
    :business-id="businessId"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    :app-parameter="appParameter"
    :aria-label="ariaLabel"
    @tap="onClick"
    @getuserinfo="onGetUserInfo"
    @contact="onContact"
    @getphonenumber="onGetPhoneNumber"
    @error="onError"
    @launchapp="onLaunchApp"
    @opensetting="onOpenSetting"
  >
    <template v-if="loading">
      <iox-loading
        :custom-class="loadingClasses"
        :size="loadingSize"
        :type="loadingType"
        :color="loadingColor"
      />
      <view
        v-if="loadingText"
        class="iox-button__loading-text"
      >
        {{ loadingText }}
      </view>
    </template>
    <template v-else>
      <iox-icon
        v-if="icon"
        size="1.2em"
        :name="icon"
        class="iox-button__icon"
        custom-style="line-height: inherit;"
      />
      <view class="iox-button__text">
        <slot />
      </view>
    </template>
  </button>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop, Mixins, Watch } from 'vue-property-decorator';

import Base from '../../mixins/base';
import ButtonProps from '../../mixins/button';
import OpenType from '../../mixins/open-type';

const classPrefix = 'iox-button';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  behaviors: ['uni://form-field'],
  externalClasses: ['hover-class', 'loading-class', 'custom-class']
  // #endif
})
export default class IoxButton extends Mixins(Base, ButtonProps, OpenType) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  name?: string;

  @Prop({type: String})
  hoverClass?: string;

  @Prop({type: String})
  loadingClass?: string;
  // #endif

  @Prop({
    type: String,
    default: 'default'
  })
  type!: string;

  @Prop({
    type: String,
    default: 'normal'
  })
  size!: string;

  @Prop({
    type: String,
  })
  color?: string;
  
  @Prop({
    type: String,
  })
  icon?: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  loading!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  disabled!: boolean;

  @Prop({
    type: String,
    default: 'circular',
  })
  loadingType!: string;

  @Prop({
    type: [Number, String],
    default: '20px',
  })
  loadingSize!: string | number;

  @Prop({
    type: String,
  })
  loadingText?: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  plain!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  block!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  round!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  square!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  hairline!: boolean;

  baseStyle = '';

  @Watch('color')
  colorChanged(newVal?: string, old?: string) {
    let style = '';

    if (newVal) {
      style += `color: ${this.plain ? newVal : 'white'};`;

      if (!this.plain) {
        // Use background instead of backgroundColor to make linear-gradient work
        style += `background: ${newVal};`;
      }

      // hide border when color is linear-gradient
      if (newVal.indexOf('gradient') !== -1) {
        style += 'border: 0;';
      } else {
        style += `border-color: ${newVal};`;
      }
    }

    if (style !== this.baseStyle) {
      this.baseStyle = style;
    }
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const { block, round, plain, square, loading, disabled, hairline } = this;
    const classes = this.bem('button', [this.type, this.size, { 
      block, round, plain, square, loading, disabled, hairline, 
      unclickable: this.disabled || this.loading 
    }]);

    let cls = `${classes} ${this.hairline ? 'iox-hairline--surround' : ''} ${this._rootClasses}`;
    return cls;
  }

  get hoverClasses() {
    let cls = 'hover-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.hoverClass || '');
    // #endif

    return `iox-button--active ${cls}`;
  }

  get loadingClasses() {
    let cls = 'loading-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.loadingClass || '');
    // #endif

    return cls;
  }

  get mainStyle() {
    // calculate style
    this.colorChanged(this.color);
    return `${this.baseStyle} ${this._rootStyles}`;
  }

  get loadingColor() {
    if(this.plain) {
      return this.color ? this.color: '#c9c9c9';
    }

    if(this.type === 'default') {
      return '#c9c9c9';
    }
    return 'white';
  }

  onClick() {
    if (!this.disabled && !this.loading) {
      this.$emit('click');
    }
  }

}
</script>

<style lang="less">
@import '../../style/widget/iox-button/iox-button.less';

</style>