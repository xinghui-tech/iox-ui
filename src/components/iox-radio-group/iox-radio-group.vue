<template>
  <block :class="mainClass" :style="mainStyle">
    <slot />
  </block>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Model, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';

const classPrefix = 'iox-radio-group';

@Component({
  name: 'iox-radio-group',
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  behaviors: ['uni://form-field'],
  // #endif
})
export default class IoxRadioGroup extends mixins(Base, Emitter) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  name?: string;
  // #endif
  
  @Model('input', { type: [Array, Number, String], default: [] })
  readonly value!: string[] | number[] | number | string;

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
    this.$on('radio-attached', (radio: Vue) => {
      this.children.push(radio);
      (radio as any).parent = this;
      (radio as any).index = this.children.length - 1;
      this.updateChild(radio);
    });
    this.$on('radio-detached', (radio: Vue) => {
      const index: number = (radio as any).index;
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
    (child as any).value = value;
    (child as any).disabled = disabled || (child as any).disabled;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-radio-group/iox-radio-group.less';

</style>