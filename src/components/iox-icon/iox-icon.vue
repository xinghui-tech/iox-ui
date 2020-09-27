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
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import * as utils from '../../utils/utils';
import Base from '../../mixins/base';

const classPrefix = 'iox-icon';
@Component
export default class IoxIcon extends mixins(Base) {
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
  color?: string;

  @Prop({
    type: [Number, String],
    default: 16,
  })
  size!: number | string;

  @Prop({
    type: String,
    default: 'fa',
  })
  lib!: string;

  get isImageName() {
    return this.name.indexOf('/') !== -1;
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.classPrefix} ${ this.isImageName ? this.classPrefix + '--image' : this.lib + ' ' + this.lib + '-' + this.name }`;
  }

  get mainStyle() {
    return `${ this.color ? 'color: ' + this.color + ";" : '' } font-size: ${ utils.addUnit(this.size) }; ${this.customStyle || ''}`;
  }

  onClick(event: Event) {
    this.$emit('click', event);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-icon/iox-icon.less';

</style>