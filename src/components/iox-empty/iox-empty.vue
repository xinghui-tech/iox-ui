<template>
  <view :class="mainClass" :style="mainStyle" >
    <view class="iox-empty__image">
      <slot name="image"></slot>
    </view>
    <view class="iox-empty__image">
      <image v-if="imageUrl" class="iox-empty__image__img" :src="imageUrl" />
    </view>

    <view class="iox-empty__description">
      <slot name="description"></slot>
    </view>
    <view class="iox-empty__description">
      {{ description }}
    </view>

    <view class="iox-empty__bottom">
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';

const PRESETS = ['error', 'search', 'default', 'network'];

const classPrefix = 'iox-empty';

@Component
export default class IoxEmpty extends mixins(Base) {
  @Prop({
    type: String,
  })
  description?: string;

  @Prop({
    type: String,
    default: 'default'
  })
  image!: string;

  imageUrl = `https://img.yzcdn.cn/vant/empty-image-${this.image}.png`;


  get classPrefix() {
    return classPrefix;
  }

  //hooks
  created() {
    if (PRESETS.indexOf(this.image) !== -1) {
      this.imageUrl = `https://img.yzcdn.cn/vant/empty-image-${this.image}.png`;
    } else {
      this.imageUrl = this.image;
    }
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-empty/iox-empty.less';

</style>