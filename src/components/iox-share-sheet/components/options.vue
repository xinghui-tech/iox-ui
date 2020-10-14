<template>
  <view :class="mainClass" :style="mainStyle">
    <template v-for="(item, index) in options">
      <view
        :key="index"
        class="iox-share-sheet__option"
        :data-index="index"
        @tap="onSelect"
      >
        <button class="iox-share-sheet__button" :open-type="item.openType">
          <image :src="getIconURL(item.icon)" class="iox-share-sheet__icon" />
        </button>
        <view v-if="item.name" class="iox-share-sheet__name">{{ item.name }}</view>
        <view v-if="item.description" class="iox-share-sheet__option-description">
          {{ item.description }}
        </view>
      </view>
    </template>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from "vue-property-decorator";
import Base from '../../../mixins/base';

const PRESET_ICONS = ['qq', 'weibo', 'wechat', 'link', 'qrcode', 'poster'];
const classPrefix = 'iox-share-sheet';
declare type Arr = [
  {
    [key: string]: any
  }
]
@Component
export default class Options extends mixins(Base) {

  @Prop({
    type: Boolean,
  },)
  showBorder!: boolean;

  @Prop({
    type: Array,
  },)
  options!: Arr;


  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.bem('share-sheet__options', { border: this.showBorder })} ${this._rootClasses}`;
  }

  onSelect(event: any) {
    const { index } = event.currentTarget.dataset;
    const option = this.options[index];
    this.$emit('select', { ...option, index });
  }


  getIconURL(icon: any) {
    if (PRESET_ICONS.indexOf(icon) !== -1) {
      return 'https://img.yzcdn.cn/vant/share-icon-' + icon + '.png';
    }
    return icon;
  }

}
</script>

<style lang="less">
@import '../../../style/widget/iox-share-sheet/options.less';

</style>