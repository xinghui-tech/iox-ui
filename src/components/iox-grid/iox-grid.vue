<template>
  <view 
    :class="mainClass"
    :style="mainStyle">
    <slot />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { addUnit } from '../../utils/utils';

type BoundingClientRect = WechatMiniprogram.BoundingClientRectCallbackResult;

const classPrefix = 'iox-grid';
@Component({
  name: 'iox-grid',
})
export default class IoxTabs extends mixins(Base) {
  @Prop({
    type: Boolean,
  })
  square?: boolean;

  @Prop({
    type: [Number, String],
    default: 0,
  })
  gutter!: number | string;

  @Prop({
    type: Boolean,
  })
  clickable?: boolean;

  @Prop({
    type: Number,
    default: 4,
  })
  columnNum!: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  center!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  border!: boolean;

  @Prop({
    type: String,
  })
  direction?: string;

  @Prop({
    type: String,
  })
  iconSize?: string;

  viewStyle = '';
  children!: Vue[];

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.customClass || ''} ${this.classPrefix} ${ this.border && !this.gutter ? 'iox-hairline--top' : '' }`;
  }

  get mainStyle() {
    return `${this.customStyle || ''} ${this.viewStyle}`;
  }

  created() {
    this.children = [];
    this.$on('grid-item-attached', (item: Vue) => {
      this.children.push(item);
      (item as any).parent = this;
      (item as any).index = this.children.length - 1;
    });
    this.$on('grid-item-detached', (item: Vue) => {
      const index: number = (item as any).index;
      this.children = this.children.filter((c: any) => c.index !== index)
        .map((c: any, i) => {
          c.index = i;
          return c;
        }
      );
    });

    const { gutter } = this;
    if (gutter) {
      this.viewStyle = `padding-left: ${addUnit(gutter)}`;
    }
  }

  @Watch('square')
  @Watch('gutter')
  @Watch('clickable')
  @Watch('columnNum')
  @Watch('center')
  @Watch('border')
  @Watch('direction')
  @Watch('iconSize')
  updateChildren() {
    this.children.forEach(
      (child: Vue) => {
        (child as any).updateStyle();
      }
    );
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-grid/iox-grid.less';

</style>