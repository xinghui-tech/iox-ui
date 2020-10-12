<template>
  <block>
    <slot />
  </block>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Model, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';

const classPrefix = 'iox-checkbox-group';

@Component({
  name: 'iox-checkbox-group',
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  behaviors: ['uni://form-field'],
  // #endif
})
export default class IoxCheckboxGroup extends mixins(Base, Emitter) {
  @Model('input', { type: Array, default: [] })
  readonly value!: string[] | number[];

  @Prop({
    type: Number,
  })
  max?: number;

  @Prop({
    type: Boolean,
  })
  disabled?: boolean;

  children!: Vue[];

  get classPrefix() {
    return classPrefix;
  }

  //hooks
  created() {
    this.children = [];
    this.$on('checkbox-attached', (checkbox: Vue) => {
      this.children.push(checkbox);
      (checkbox as any).parent = this;
      (checkbox as any).index = this.children.length - 1;
      this.updateChild(checkbox);
    });
    this.$on('checkbox-detached', (checkbox: Vue) => {
      const index: number = (checkbox as any).index;
      this.children = this.children.filter((c: any) => c.index !== index)
        .map((c: any, i) => {
          c.index = i;
          return c;
        }
      );
    });
  }

  @Watch('value')
  @Watch('disabled')
  updateChildren() {
    (this.children || []).forEach((child: Vue) =>
      this.updateChild(child)
    );
  }

  updateChild(child: Vue) {
    const { value, disabled } = this;
    (child as any).value = value.indexOf((child as any).name as never) !== -1;
    (child as any).parentDisabled = disabled;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-checkbox-group/iox-checkbox-group.less';

</style>