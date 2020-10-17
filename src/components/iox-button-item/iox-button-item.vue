<template>
  <view :class="mainClass" :style="mainStyle">
    <iox-button
      :lang="lang"
      :type="type"
      :color="color"
      :plain="plain"
      :loading="loading"
      :disabled="disabled"
      :open-type="openType"
      :business-id="businessId"
      :session-from="sessionFrom"
      custom-class="iox-button-item__inner"
      :hover-class="hoverClasses"
      :loading-class="loadingClasses"
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
      {{ text || '' }}
      <slot></slot>
    </iox-button>
  </view>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop, Mixins } from 'vue-property-decorator';

import Base from '../../mixins/base';
import ButtonProps from '../../mixins/button';
import OpenType from '../../mixins/open-type';
import Link from '../../mixins/link';
import Emitter from '../../mixins/emitter';

const classPrefix = 'iox-button-button';
@Component({
  name: 'iox-button-item',
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['hover-class', 'loading-class', 'custom-class'],
  // #endif
})
export default class IoxButtonItem extends Mixins(Base, Link, ButtonProps, OpenType, Emitter) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  hoverClass?: string;

  @Prop({type: String})
  loadingClass?: string;
  // #endif

  @Prop({
    type: String,
  })
  text?: string;

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
    type: Boolean,
    default: false,
  })
  plain!: boolean;

  @Prop({
    type: String,
    default: 'danger'
  })
  type!: string;

  isFirst = true;
  isLast = true;
  parent?: Vue;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const {type, isFirst, isLast, plain} = this;
    const classes = this.bem('button-item', [type, { first: isFirst, last: isLast, plain: plain }]);
    return `${classes} ${this._rootClasses}`;
  }

  get hoverClasses() {
    let cls = 'hover-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.hoverClass || '');
    // #endif

    return cls;
  }

  get loadingClasses() {
    let cls = 'loading-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.loadingClass || '');
    // #endif

    return cls;
  }

  updateStyle() {
    if (this.parent == null) {
      return;
    }

    const { children = [] } = this.parent as any;
    const { length } = children;
    const index = children.indexOf(this);
    this.isFirst = index === 0;
    this.isLast = index === length - 1;
  }

  onClick(event: Event) {
    this.$emit('click', event);
    this.jumpLink();
  }

  beforeMount() {
    this.$$dispatch('iox-button-group', 'button-attached', this);
  }

  destroyed() {
    this.$$dispatch('iox-button-group', 'button-detached', this);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-button-item/iox-button-item.less';

</style>