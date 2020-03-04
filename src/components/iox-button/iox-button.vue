<template>
	<button
    :class="mainClass"
    :style="mainStyle"
    hover-class="iox-button--active hover-class"
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
        custom-class="loading-class"
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
        name="icon"
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
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Mixins, Watch } from 'vue-property-decorator';
import bem from '../../utils/bem';

import base, { props } from '../../mixins/base';
import { props as buttonProps } from '../../mixins/button';
import openType, { props as opentypeProps } from '../../mixins/open-type';

const classPrefix = 'iox-button';
@Component({
  mixins: [props, buttonProps, opentypeProps],
})
export default class IoxButton extends Mixins(base, openType) {
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

  baseStyle: string = '';

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
    const cls = bem('button', [this.type, this.size, { 
      block: this.block, 
      round: this.round,
      plain: this.plain, 
      square: this.square,
      loading: this.loading, 
      disabled: this.disabled,
      hairline: this.hairline, 
      unclickable: this.disabled || this.loading 
    }]);
    
    return `${this.customClass || ''} ${cls} ${this.hairline ? 'iox-hairline--surround' : ''}`;
  }

  get mainStyle() {
    return `${this.baseStyle} ${this.customStyle || ''}`;
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