<template>
  <view :class="'custom-class iox-loading ' + vertical ? 'iox-loading--vertical' : '' ">
    <view
      :class="'iox-loading__spinner iox-loading__spinner--' + type "
      :style="'color: ' + color + '; width: ' + utils.addUnit(size) + '; height: ' + utils.addUnit(size)"
    >
      <template v-if="type === 'spinner'">
        <view
          v-for="(item, index) in 12"
          :key="index"
          class="iox-loading__dot"
        />
      </template>
    </view>
    <view class="iox-loading__text" :style="'font-size: ' + utils.addUnit(textSize) + ';'">
      <slot />
    </view>
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
    type: Number,
    default: 32,
  })
  size!: number;

  @Prop({
    type: Number,
    default: 16,
  })
  textSize!: number;

  get utils() {
    return utils;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-loading/iox-loading.less';

</style>