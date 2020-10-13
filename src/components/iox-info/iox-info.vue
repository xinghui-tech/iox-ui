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
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';

const classPrefix = 'iox-info';
@Component
export default class IoxInfo extends mixins(Base) {
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
    default: '',
  })
  color!: string;

  get isImageName() {
    return this.name.indexOf('/') !== -1;
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.classPrefix} ${this.dot ? this.classPrefix + '--dot' : ''} ${this._rootClasses}`;
  }

  onClick() {
    this.$emit('click');
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-info/iox-info.less';

</style>