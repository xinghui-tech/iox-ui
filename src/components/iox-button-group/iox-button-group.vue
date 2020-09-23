<template>
  <view :class="mainClass">
    <slot />
  </view>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop, Mixins } from 'vue-property-decorator';

import Base from '../../mixins/base';

const classPrefix = 'iox-button-group';
@Component({
  name: 'iox-button-group'
})
export default class IoxButtonGroup extends Mixins(Base) {
  @Prop({
    type: Boolean,
    default: true
  })
  safeAreaInsetBottom!: boolean;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.bem('button-group', { safe: this.safeAreaInsetBottom }) } custom-class`;
  }

  children!: Vue[];

  created() {
    this.children = [];
    this.$on('button-attached', (button: Vue) => {
      this.children.push(button);
      (button as any).parent = this;
      (button as any).index = this.children.length - 1;
      this.updateStyle();
    });
    this.$on('button-detached', (button: Vue) => {
      const index: number = (button as any).index;
      this.children = this.children.filter((c: any) => c.index !== index)
        .map((c: any, i) => {
          c.index = i;
          return c;
        }
      );
      this.updateStyle();
    });
  }

  updateStyle() {
    this.$nextTick(() => {
      this.children.forEach(
        (child: any) => {
          child.updateStyle();
        }
      );
    });
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-button-group/iox-button-group.less';

</style>