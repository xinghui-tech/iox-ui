<template>
  <view :class="mainClass" :style="mainStyle" >
    <slot />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch, Model } from 'vue-property-decorator';
import Base from '../../mixins/base';

const classPrefix = 'iox-collapse';

@Component({
  name: 'iox-collapse'
})
export default class IoxCollapse extends mixins(Base) {
  // props
  @Model('change', { type: [String, Array, Number], default: '' })
  readonly value?: string | number | (string | number)[];

  @Prop({
    type: Boolean,
  })
  accordion?: boolean;

  @Prop({
    type: Boolean,
  })
  border?: boolean;

  children!: Vue[];

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${classPrefix} ${ this.border ? 'iox-hairline--top-bottom' : '' } ${this._rootClasses}`;
  }

  @Watch('value')
  @Watch('accordion')
  updateExpanded() {
    this.children.forEach((child: any) => {
      child.updateExpanded();
    });
  }

  switch(name: string | number, expanded: boolean) {
    const { accordion, value } = this;
    const changeItem = name;
    let expands: string | number | (string | number)[] = name;
    if (!accordion) {
      const values: (string | number)[]  = Array.isArray(value) ? value : (value ? [value] : []);

      expands = expanded ? values.concat(name)
        : values.filter((activeName: any) => activeName !== name);
    } else {
      expands = expanded ? name : '';
    }

    if (expanded) {
      this.$emit('open', changeItem);
    } else {
      this.$emit('close', changeItem);
    }

    this.$emit('input', expands);
    this.$emit('change', expands);
  }

  created() {
    this.children = [];
    this.$on('item-attached', (item: Vue) => {
      this.children.push(item);
      (item as any).parent = this;
      (item as any).index = this.children.length - 1;
      (item as any).updateExpanded();
    });
    this.$on('item-detached', (item: Vue) => {
      const index: number = (item as any).index;
      this.children = this.children.filter((c: any) => c.index !== index)
        .map((c: any, i) => {
          c.index = i;
          return c;
        });
    });
  }
}
</script>

<style lang="less">
// @import '../../style/widget/iox-collapse/iox-collapse.less';

</style>