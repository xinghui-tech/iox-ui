<template>
  <view
    class="custom-class {{ classPrefix }} {{ isImageName ? 'iox-icon--image' : classPrefix + '-' + name }}"
    style="color: {{ color }};font-size: {{ utils.addUnit(size) }};{{ customStyle }}"
    bind:tap="onClick"
  >
    <iox-info
      wx:if="{{ info !== null || dot }}"
      dot="{{ dot }}"
      info="{{ info }}"
      custom-class="iox-icon__info"
    />
    <image
      wx:if="{{ isImageName }}"
      src="{{ name }}"
      mode="aspectFit"
      class="iox-icon__image"
    />
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import * as utils from '../../utils/utils';

@Component
export default class IoxLoading extends Vue {
  @Prop({
    type: String,
    default: 'circular',
  })
  type: 'circular' | 'spinner' = 'circular';

  @Prop({
    type: Boolean,
    default: true,
  })
  vertical: boolean = true;

  @Prop({
    type: String,
    default: '',
  })
  color: string = '';

  @Prop({
    type: Number,
    default: 32,
  })
  size: number = 32;

  @Prop({
    type: Number,
    default: 16,
  })
  textSize: number = 16;

  get utils() {
    return utils;
  }
}
</script>

<style lang="less">
@import '../common/style/var.less';
@import '@vant/icons/src/index.less';

:host {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.iox-icon {
  &--image {
    width: 1em;
    height: 1em;
  }

  &__image {
    width: 100%;
    height: 100%;
  }

  &__info {
    z-index: 1;
  }
}
</style>