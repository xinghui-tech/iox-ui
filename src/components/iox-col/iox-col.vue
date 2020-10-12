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

const classPrefix = 'iox-col';

@Component({
  inject: {
    gutter: {
      default: () => {
        return {value: 0};
      }
    }
  }
})
export default class IoxCol extends mixins(Base) {
  @Prop({
    type: [Number, String]
  })
  span?: number | string;

  @Prop({
    type: [Number, String]
  })
  offset?: number | string;

  // data
  viewStyle = '';

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `${this.viewStyle} ${this.customStyle || ''}`;
  }

  get mainClass() {
    const classes = this.bem('col', [this.span]);
    return `custom-class ${classes} ${this.offset ? 'iox-col--offset-' + this.offset : ''}`;
  }

  @Watch('gutter', { deep: true })
  onGutterChanged(newVal: {value: number}) {
    this.setGutter((newVal as any).value);
  }

  setGutter(gutter: number) {
    const padding = `${gutter / 2}px`;
    const viewStyle = gutter ? `padding-left: ${padding}; padding-right: ${padding};` : '';

    if (viewStyle !== this.viewStyle) {
      this.viewStyle = viewStyle;
    }
  }

  mounted() {
    this.setGutter((this as any).gutter.value);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-col/iox-col.less';

</style>