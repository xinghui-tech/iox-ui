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
import { makeReactive } from '../../utils/func-utils';

const classPrefix = 'iox-row';

@Component({
  provide() {
    const gutter = {};
    return {
      gutter: makeReactive(gutter, this, {gutter: 'value'})
    };
  }
})
export default class IoxRow extends mixins(Base) {
  @Prop({
    type: Number,
    default: 0
  })
  gutter!: number;

  // data
  viewStyle = '';

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `${this.customStyle || ''} ${this.viewStyle}`;
  }

  @Watch('gutter')
  gutterChanged(newVal: number, oldVal: number) {
    this.setGutter(newVal);
  }

  setGutter(gutter: number) {
    const margin = `-${Number(gutter) / 2}px`;
    const viewStyle = gutter ? `margin-right: ${margin}; margin-left: ${margin};` : '';

    if (viewStyle !== this.viewStyle) {
      this.viewStyle = viewStyle;
    }
  }

  mounted() {
    if (this.gutter) {
      this.setGutter(this.gutter);
    }
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-row/iox-row.less';

</style>