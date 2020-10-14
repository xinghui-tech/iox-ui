<template>
  <view
    :class="mainClass"
    :style="mainStyle"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Touch from '../../mixins/touch';

const classPrefix = 'iox-tabbar';
@Component({
  name: 'iox-tabbar',
})
export default class IoxTabbar extends mixins(Base, Touch) {
  @Prop({
    type: [String, Number],
  })
  active?: string | number;

  @Prop({
    type: String,
  })
  activeColor?: string;

  @Prop({
    type: String,
  })
  inactiveColor?: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  fixed!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  border!: boolean;

  @Prop({
    type: Number,
    default: 1,
  })
  zIndex!: number;

  @Prop({
    type: Boolean,
    default: true
  })
  safeAreaInsetBottom!: boolean;

  children!: Vue[];

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes = this.bem('tabbar', { fixed: this.fixed, safe: this.safeAreaInsetBottom });
    return `${ this.border ? 'van-hairline--top-bottom' : '' } ${classes} ${this._rootClasses}`;
  }

  get mainStyle() {
    return `${ this.zIndex ? 'z-index: ' + this.zIndex : '' } ${this._rootStyles}`;
  }

  @Watch('active')
  @Watch('activeColor')
  @Watch('inactiveColor')
  updateChildren() {
    const { children } = this;
    if (!Array.isArray(children) || !children.length) {
      return Promise.resolve();
    }

    return Promise.all(
      children.map((child: any) => child.updateFromParent())
    );
  }

  onChange(child: Vue) {
    const index = this.children.indexOf(child);
    const active = (child as any).name || index;

    if (active !== this.active) {
      this.$emit('change', active);
    }
  }

  created() {
    this.children = [];
    this.$on('item-attached', (item: Vue) => {
      this.children.push(item);
      (item as any).parent = this;
      (item as any).index = this.children.length - 1;
      (item as any).updateFromParent();
    });
    this.$on('item-detached', (item: Vue) => {
      const index: number = (item as any).index;
      this.children = this.children.filter((c: any) => c.index !== index)
        .map((c: any, i) => {
          c.index = i;
          return c;
        }
      );
      this.updateChildren();
    });
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-tabbar/iox-tabbar.less';

</style>