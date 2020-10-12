<template>
  <iox-popup
    round
    class="iox-share-sheet"
    :show="show"
    position="bottom"
    :overlay="overlay"
    :duration="duration"
    :z-index="zIndex"
    :overlay-style="overlayStyle"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    @close="onClose"
    @click-overlay="onClickOverlay"
  >
    <view class="iox-share-sheet__header">
      <view class="iox-share-sheet__title">
        <slot name="title" />
      </view>
      <view v-if="title" class="iox-share-sheet__title">{{ title }}</view>

      <view class="iox-share-sheet__description">
        <slot name="description" />
      </view>
      <view v-if="description" class="iox-share-sheet__description">
        {{ description }}
      </view>
    </view>

    <block v-if="isMulti(options)">
      <template v-for="(item, index) in options">
        <options
          :key="index"
          :show-border="index !== 0"
          :options="item"
          @select="onSelect"
        />
      </template>
    </block>

    <options v-else :options="options" @select="onSelect" />

    <button type="button" class="iox-share-sheet__cancel" @tap="onCancel">
      {{ cancelText }}
    </button>
  </iox-popup>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from "vue-property-decorator";
import options from './components/options.vue';
import Base from '../../mixins/base';

const PRESET_ICONS = ['qq', 'weibo', 'wechat', 'link', 'qrcode', 'poster'];
const classPrefix = 'iox-share-sheet';
@Component({
  components: {
    options,
  },
})
export default class IoxShareSheet extends mixins(Base) {

  // whether to show popup
  @Prop({
    type: Boolean,
  },)
  show!: boolean;

  // overlay custom style
  @Prop({
    type: Object,
  },)
  overlayStyle!: object;

  @Prop({
    type: Number,
    default: 100,
  },)
  zIndex!: number;

  @Prop({
    type: String,
  },)
  title!: string;

  @Prop({
    type: String,
    default: '取消',
  },)
  cancelText!: string;

  @Prop({
    type: String,
  },)
  description!: string;

  @Prop({
    type: Array,
    default: []
  },)
  options!: [];

  @Prop({
    type: Boolean,
    default: true,
  },)
  overlay!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  },)
  safeAreaInsetBottom!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  },)
  closeOnClickOverlay!: boolean;

  @Prop({
    type: Number,
    default: 300,
  },)
  duration!: number;


  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class`;
  }

  get mainStyle() {
    return `${this.customStyle || ''}`;
  }

  onClickOverlay() {
    this.$emit('click-overlay');
  }

  onCancel() {
    this.onClose();
    this.$emit('cancel');
  }

  onSelect(event: TouchEvent) {
    this.$emit('select', event);
  }

  onClose() {
    this.$emit('close');
  }


  isMulti(options: any) {
    if (options == null || options[0] == null) {
      return false;
    }
    return  Object.prototype.toString.call(options) === '[object Array]' && Object.prototype.toString.call(options[0]) === '[object Array]';
  }

}
</script>

<style lang="less">
@import '../../style/widget/iox-share-sheet/iox-share-sheet.less';

</style>