<template>
  <view :class="mainClass" :style="mainStyle">
    <slot />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Touch from '../../mixins/touch';
import { isDef, addUnit } from '../../utils/utils';
import { wrapFunc, releaseFunc } from '../../utils/func-utils';

type BoundingClientRect = WechatMiniprogram.BoundingClientRectCallbackResult;

const classPrefix = 'iox-sidebar';
@Component({
  name: 'iox-sidebar',
})
export default class IoxSidebar extends mixins(Base, Touch) {
  @Prop({
    type: Number,
    default: 0
  })
  activeKey!: number;

  children!: Vue[];
  currentActive = -1;

  get classPrefix() {
    return classPrefix;
  }

  created() {
    this.children = [];
    this.$on('item-attached', (item: Vue) => {
      this.children.push(item);
      (item as any).parent = this;
      (item as any).index = this.children.length - 1;
      this.setActive(this.activeKey);
    });
    this.$on('item-detached', (item: Vue) => {
      const index: number = (item as any).index;
      this.children = this.children.filter((c: any) => c.index !== index)
        .map((c: any, i) => {
          c.index = i;
          return c;
        }
      );
      this.setActive(this.activeKey);
    });
  }

  @Watch('activeKey')
  setActive(activeKey: number) {
    const { children, currentActive } = this;

    if (!children.length) {
      return Promise.resolve();
    }

    this.currentActive = activeKey;

    const stack: Promise<unknown>[] = [];

    if (currentActive !== activeKey && children[currentActive]) {
      stack.push((children[currentActive] as any).setActive(false));
    }

    if (children[activeKey]) {
      stack.push((children[activeKey] as any).setActive(true));
    }

    return Promise.all(stack);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-sidebar/iox-sidebar.less';

</style>