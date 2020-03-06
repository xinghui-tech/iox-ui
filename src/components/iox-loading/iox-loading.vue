<template>
  <view :class="mainClass" :style="mainStyle">
    <view
      :class="spinnerClass"
      :style="spinnerStyle"
    >
      <template v-if="type === 'spinner'">
        <view
          v-for="(item, index) in 12"
          :key="index"
          class="iox-loading__dot"
        />
      </template>
    </view>
    <view class="iox-loading__text" :style="textStyle">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import * as utils from '../../utils/utils';
import base, { props } from '../../mixins/base';

const classPrefix = 'iox-loading';
@Component({
  mixins: [props]
})
export default class IoxLoading extends mixins(base) {
  @Prop({
    type: String,
    default: 'circular',
  })
  type!: 'circular' | 'spinner';

  @Prop({
    type: Boolean,
    default: true,
  })
  vertical!: boolean;

  @Prop({
    type: String,
    default: '',
  })
  color!: string;

  @Prop({
    type: [String, Number],
    default: 32,
  })
  size!: number | string;

  @Prop({
    type: [Number, String],
    default: 16,
  })
  textSize!: number | string;

  get utils() {
    return utils;
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.customClass || ''} ${this.classPrefix} ${this.vertical ? this.classPrefix + '--vertical' : ''}`;
  }

  get spinnerClass() {
    return `${this.classPrefix}__spinner ${this.classPrefix}__spinner--${this.type}`;
  }

  get spinnerStyle() {
    return `color: ${this.color}; width: ${utils.addUnit(this.size)}; height: ${utils.addUnit(this.size)}`;
  }

  get textStyle() {
    return `font-size: ${utils.addUnit(this.textSize)};`
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-loading/iox-loading.less';

</style>