<template>
  <view
    v-if="(info !== null && info !== '') || dot"
    :class="mainClass"
    :style="mainStyle"
  >
    {{ dot ? '' : info }}
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import * as utils from '../../utils/utils';
import base, { props } from '../../mixins/base';

const classPrefix = 'iox-info';
@Component({
  mixins: [props]
})
export default class IoxInfo extends mixins(base) {
  @Prop({
    type: String,
    default: '',
  })
  name!: string;

  @Prop({
    type: String,
    default: null,
  })
  inf!: string | null;

  @Prop({
    type: Boolean,
    default: false,
  })
  dot!: boolean;

  @Prop({
    type: String,
    default: '',
  })
  color!: string;

  get isImageName() {
    return this.name.indexOf('/') !== -1;
  }

  get utils() {
    return utils;
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.customClass || ''} ${this.classPrefix} ${this.dot ? this.classPrefix + '-info--dot' : ''}`;
  }

  onClick() {
    this.$emit('click');
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-info/iox-info.less';

</style>