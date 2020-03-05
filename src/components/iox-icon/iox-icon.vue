<template>
  <view
    :class="mainClass"
    :style="mainStyle"
    @tap="onClick"
  >
    <iox-info
      v-if="info !== null || dot"
      :dot="dot"
      :info="info"
      custom-class="iox-icon__info"
    />
    <image
      v-if="isImageName"
      :src="name"
      mode="aspectFit"
      class="iox-icon__image"
    />
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import * as utils from '../../utils/utils';
import base, { props } from '../../mixins/base';

const classPrefix = 'iox-icon';
@Component({
  mixins: [props]
})
export default class IoxIcon extends mixins(base) {
  @Prop({
    type: String,
    default: '',
  })
  name!: string;

  @Prop({
    type: String,
    default: null,
  })
  info!: string | null;

  @Prop({
    type: Boolean,
    default: false,
  })
  dot!: boolean;

  @Prop({
    type: String,
  })
  customStyle?: string;

  @Prop({
    type: String,
    default: '',
  })
  color!: string;

  @Prop({
    type: [Number, String],
    default: 32,
  })
  size!: number;

  get isImageName() {
    return this.name.indexOf('/') !== -1
  }

  get utils() {
    return utils;
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.customClass || ''} ${this.classPrefix} ${ this.isImageName ? this.classPrefix + '--image' : this.classPrefix + '-' + this.name }`;
  }

  get mainStyle() {
    return `${this.customStyle || ''} color: ${ this.color }; font-size: ${ utils.addUnit(this.size) }; ${ this.customStyle }`;
  }

  onClick() {
    this.$emit('click');
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-icon/iox-icon.less';

</style>