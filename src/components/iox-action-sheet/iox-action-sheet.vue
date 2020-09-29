<template>
  <iox-popup
    :show="show"
    position="bottom"
    :round="round"
    :z-index="zIndex"
    :overlay="overlay"
    custom-class="iox-action-sheet"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    :close-on-click-overlay="closeOnClickOverlay"
    @close="onClickOverlay"
  >
    <view v-if="title" class="iox-hairline--bottom iox-action-sheet__header">
      {{ title }}
      <iox-icon
        name="close"
        custom-class="iox-action-sheet__close"
        @click="onClose"
      />
    </view>
    <view v-if="description" class="iox-action-sheet__description">
      {{ description }}
    </view>
    <view v-if="actions && actions.length">
      <!-- button外包一层view，防止actions动态变化，导致渲染时button被打散 -->
      <template v-for="(item, index) in actions">
        <button
          :key="index"
          :open-type="item.openType"
          :style="item.color ? 'color: ' + item.color : ''"
          :class="[bem('action-sheet__item', { disabled: item.disabled || item.loading }) , 'iox-hairline--top', item.className || '' ]"
          hover-class="iox-action-sheet__item--hover"
          :data-index="index"
          @tap="onSelect"
          @getuserinfo="onGetUserInfo"
          @contact="onContact"
          @getphonenumber="onGetPhoneNumber"
          @error="onError"
          @launchapp="onLaunchApp"
          @opensetting="onOpenSetting"
          :lang="lang"
          :session-from="sessionFrom"
          :send-message-title="sendMessageTitle"
          :send-message-path="sendMessagePath"
          :send-message-img="sendMessageImg"
          :show-message-card="showMessageCard"
          :app-parameter="appParameter"
        >
          <block v-if="!item.loading">
            {{ item.name }}
            <text v-if="item.subname" class="iox-action-sheet__subname" >{{ item.subname }}</text>
          </block>
          <iox-loading v-else custom-class="iox-action-sheet__loading" size="20px" />
        </button>
      </template>
    </view>
    <slot />
    <view
      v-if="cancelText"
      class="iox-action-sheet__cancel"
      hover-class="iox-action-sheet__cancel--hover"
      hover-stay-time="70"
      @tap="onCancel"
    >
      {{ cancelText }}
    </view>
  </iox-popup>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Button from '../../mixins/button';
import OpenType from '../../mixins/open-type';

declare type Actions = [
  {
    disabled: Boolean;
    loading: Boolean;
    [key: string]: any;
  }
]

const classPrefix = 'iox-action-sheet';
@Component({

})
export default class IoxActionSheet extends mixins(Base, Button, OpenType) {


  @Prop() show!: boolean;
  @Prop() title!: string;
  @Prop() cancelText?: string;
  @Prop() description?: string;

  @Prop({
    type: Boolean,
    default: true
  })
  round?: boolean;

  @Prop({
    type: Number,
    default: 100
  })
  zIndex?: number;

  @Prop({
    type: Array,
    default: []
  })
  actions!: Actions;

  @Prop({
    type: Boolean,
    default: true
  })
  overlay?: boolean;

  @Prop({
    type: Boolean,
    default: true
  })
  closeOnClickOverlay?: boolean;

  @Prop({
    type: Boolean,
    default: true
  })
  closeOnClickAction?: boolean;

  @Prop({
    type: Boolean,
    default: true
  })
  safeAreaInsetBottom?: boolean;



  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.classPrefix} custom-class`;
  }

  beforeCreate() {
  }

  destroyed() {
  }

  created() {
  }

  mounted() {
  }


  onSelect(event: any) {
    const { index } = event.currentTarget.dataset;
    const item = this.actions[index];
    console.log('onSelect event ===', event);
    if (item && !item.disabled && !item.loading) {
      this.$emit('select', item);
      if (this.closeOnClickAction) {
        console.log('onSelect onClose ===', item);
        this.onClose();
      }
    }
  }

  onCancel() {
    this.$emit('cancel');
  }

  onClose() {
    this.$emit('close');
  }

  onClickOverlay() {
    this.$emit('click-overlay');
    this.onClose();
  }

}
</script>

<style lang="less">
@import '../../style/widget/iox-action-sheet/iox-action-sheet.less';

</style>