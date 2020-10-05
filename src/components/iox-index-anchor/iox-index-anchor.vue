<template>
  <view class="iox-index-anchor-wrapper"
    :style="wrapperStyle"
  >
    <view
      :class="mainClass"
      :style="mainStyle"
    >
      <slot v-if="useSlot"/>
      <block v-else>
        <text>{{ anchor }}</text>
      </block>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';

type BoundingClientRect = WechatMiniprogram.BoundingClientRectCallbackResult;

const classPrefix = 'iox-index-anchor';
@Component({
  name: 'iox-index-anchor',
})
export default class IoxIndexAnchor extends mixins(Base, Emitter) {
  @Prop({
    type: Boolean,
  })
  useSlot?: boolean;

  @Prop({
    type: [Number, String],
  })
  anchor?: number | string;

  active = false;
  wrapperStyle = '';
  anchorStyle = '';

  height = 0;
  top = 0;
  parent?: Vue;

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `${this.anchorStyle} ${this.customStyle || ''}`;
  }

  get mainClass() {
    return `${this.classPrefix} ${ this.active ? 'iox-index-anchor--active iox-hairline--bottom' : '' } custom-class`;
  }

  beforeMount() {
    this.$$dispatch('iox-index-bar', 'anchor-attached', this);
  }

  destroyed() {
    this.$$dispatch('iox-index-bar', 'anchor-detached', this);
  }

  scrollIntoView(scrollTop: number) {
    if (!this.parent) {
      return;
    }

    this.getBoundingClientRect().then(
      (rect) => {
        uni.pageScrollTo({
          duration: 0,
          scrollTop: scrollTop + (rect as UniApp.NodeInfo).top! - (this.parent as any).stickyOffsetTop,
        });
      }
    );
  }

  getBoundingClientRect() {
    return this.getRect('.iox-index-anchor-wrapper');
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-index-anchor/iox-index-anchor.less';

</style>