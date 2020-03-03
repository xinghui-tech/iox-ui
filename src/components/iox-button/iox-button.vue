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
import { Prop, Mixins } from 'vue-property-decorator';

import base, { props } from '../../mixins/base';
import { props as buttonProps } from '../../mixins/button';
import openType, { props as opentypeProps } from '../../mixins/open-type';

const classPrefix = 'iox-button';
@Component({
  mixins: [props, buttonProps, opentypeProps],
})
export default class IoxButton extends Mixins(base, openType) {
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

  get classPrefix() {
    return classPrefix;
  }

  get loadingColor() {
    return '';
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