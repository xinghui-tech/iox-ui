<template>
  <iox-popup
    :show="show"
    :z-index="zIndex"
    :overlay="overlay"
    :transition="transition"
    :custom-class="mainClass"
    :custom-style="mainStyle"
    :overlay-style="overlayStyle"
    :close-on-click-overlay="closeOnClickOverlay"
    @close="onClickOverlay"
  >
    <view
      v-if="title || useTitleSlot "
      :class="[bem('dialog__header', { isolated: !(message || useSlot) })]"
    >
      <slot v-if="useTitleSlot" name="title" />
      <block v-else-if="title">{{ title }}</block>
    </view>

    <slot v-if="useSlot" />
    <view
      v-else-if="message"
      :class="[bem('dialog__message', [theme, messageAlign, { hasTitle: title }])]"
    >
      <text class="iox-dialog__message-text">{{ message }}</text>
    </view>

    <view v-if="theme === 'round-button'" custom-class="iox-dialog__footer--round-button">
      <iox-button
        v-if="showCancelButton"
        size="large"
        :loading="loading.cancel"
        class="iox-dialog__button iox-hairline--right"
        custom-class="iox-dialog__cancel"
        :custom-style="'color: ' + cancelButtonColor"
        @click="onCancel"
      >
        {{ cancelButtonText }}
      </iox-button>
      <iox-button
        v-if="showConfirmButton"
        size="large"
        class="iox-dialog__button"
        :loading="loading.confirm"
        custom-class="iox-dialog__confirm"
        :custom-style="'color: ' + confirmButtonColor"

        :open-type="confirmButtonOpenType"
        :lang="lang"
        :business-id="businessId"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :app-parameter="appParameter"

        @click="onConfirm"
        @getuserinfo="onGetUserInfo"
        @contact="onContact"
        @getphonenumber="onGetPhoneNumber"
        @error="onError"
        @launchapp="onLaunchApp"
        @opensetting="onOpenSetting"
      >
        {{ confirmButtonText }}
      </iox-button>
    </view>

    <view v-else class="iox-hairline--top iox-dialog__footer">
      <iox-button
        v-if="showCancelButton"
        size="large"
        :loading="loading.cancel"
        class="iox-dialog__button iox-hairline--right"
        custom-class="iox-dialog__cancel"
        :custom-style="'color: ' + cancelButtonColor"
        @click="onCancel"
      >
        {{ cancelButtonText }}
      </iox-button>
      <iox-button
        v-if="showConfirmButton"
        size="large"
        class="iox-dialog__button"
        :loading="loading.confirm"
        custom-class="iox-dialog__confirm"
        :custom-style="'color: ' + confirmButtonColor"

        :open-type="confirmButtonOpenType"
        :lang="lang"
        :business-id="businessId"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :app-parameter="appParameter"

        @click="onConfirm"
        @getuserinfo="onGetUserInfo"
        @contact="onContact"
        @getphonenumber="onGetPhoneNumber"
        @error="onError"
        @launchapp="onLaunchApp"
        @opensetting="onOpenSetting"
      >
        {{ confirmButtonText }}
      </iox-button>
    </view>
  </iox-popup>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Button from '../../mixins/button';
import OpenType from '../../mixins/open-type';
import { addUnit } from '../../utils/utils';
import { GRAY, RED } from '../../utils/color';

type Action = 'confirm' | 'cancel' | 'overlay';

const classPrefix = 'iox-dialog';
@Component({
  props: {
    show: {
      type: Boolean,
    },
    title: String,
    message: String,
    theme: {
      type: String,
      default: 'default'
    },
    useSlot: Boolean,
    className: String,
    customStyle: String,
    messageAlign: String,
    overlayStyle: String,
    useTitleSlot: Boolean,
    showCancelButton: Boolean,
    closeOnClickOverlay: Boolean,
    confirmButtonOpenType: String,
    width: [String, Number],
    zIndex: {
      type: Number,
      default: 2000
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonColor: {
      type: String,
      default: RED
    },
    cancelButtonColor: {
      type: String,
      default: GRAY
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: 'scale'
    },
    value: [Object, Number, Boolean, Array]
  },
})
export default class IoxDialog extends mixins(Base, Button, OpenType) {
  // props
  show?: boolean;
  theme!: string;
  width?: string | number;
  className?: string;
  value?: any;


  @Watch('show')
  onShowChanged(show: boolean) {
    !show && this.stopLoading();
  }

  loading = {
    confirm: false,
    cancel: false
  };

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes: string = this.bem('dialog', this.theme);
    return `custom-class ${classes} ${ this.className || '' }`;
  }

  get mainStyle() {
    return `width: ${addUnit(this.width) }; ${this.customStyle || ''}`;
  }

  onConfirm() {
    this.handleAction('confirm');
  }

  onCancel() {
    this.handleAction('cancel');
  }

  onClickOverlay() {
    this.onClose('overlay');
  }

  handleAction(action: Action) {
    (this.loading as any)[action] = true;
    this.onClose(action);
  }

  stopLoading() {
    this.loading = {
      confirm: false,
      cancel: false
    };
  }

  onClose(action?: Action) {
    if (action) {
      this.$emit(action, this.value);
    }
    this.$emit('close', action);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-dialog/iox-dialog.less';

</style>