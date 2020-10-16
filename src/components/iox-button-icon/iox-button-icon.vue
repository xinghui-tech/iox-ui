<template>
  <iox-button
    :class="mainClass"
    :style="mainStyle"
    square
    size="large"
    :lang="lang"
    :loading="loading"
    :disabled="disabled"
    :open-type="openType"
    :business-id="businessId"
    custom-class="iox-button-icon"
    :hover-class="hoverClasses"
    :session-from="sessionFrom"
    :app-parameter="appParameter"
    :send-message-img="sendMessageImg"
    :send-message-path="sendMessagePath"
    :show-message-card="showMessageCard"
    :send-message-title="sendMessageTitle"
    @click="onClick"
    @error="onError"
    @contact="onContact"
    @opensetting="onOpenSetting"
    @getuserinfo="onGetUserInfo"
    @getphonenumber="onGetPhoneNumber"
    @launchapp="onLaunchApp"
  >
    <view class="iox-button-icon__content">
      <iox-icon
        v-if="icon"
        size="20px"
        :name="icon"
        :dot="dot"
        :info="info"
        class="iox-button-icon__icon"
        :custom-class="iconClasses"
      />
      <slot name="icon" />
      <text :class="textClasses">{{ text }}</text>
    </view>
  </iox-button>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop, Mixins } from 'vue-property-decorator';

import Base from '../../mixins/base';
import ButtonProps from '../../mixins/button';
import OpenType from '../../mixins/open-type';
import Link from '../../mixins/link';

const classPrefix = 'iox-button-icon';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['hover-class', 'icon-class', 'text-class', 'custom-class']
  // #endif
})
export default class IoxButtonIcon extends Mixins(Base, Link, ButtonProps, OpenType) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  hoverClass?: string;

  @Prop({type: String})
  iconClass?: string;

  @Prop({type: String})
  textClass?: string;
  // #endif

  @Prop({
    type: String,
  })
  text?: string;

  @Prop({
    type: String,
  })
  icon?: string;

  @Prop({
    type: Boolean,
  })
  dot?: boolean;

  @Prop({
    type: [String, Number]
  })
  info?: string | number;
  
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

  get classPrefix() {
    return classPrefix;
  }

  get hoverClasses() {
    let cls = 'hover-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.hoverClass || '');
    // #endif

    return cls;
  }

  get iconClasses() {
    let cls = 'icon-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.iconClass || '');
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

  onClick(event: Event) {
    this.$emit('click', event);
    this.jumpLink();
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-button-icon/iox-button-icon.less';

</style>