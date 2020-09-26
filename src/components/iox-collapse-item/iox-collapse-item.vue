<template>
  <view
  :class="mainClass" :style="mainStyle"
  >
    <iox-cell
      :title="title"
      title-class="title-class"
      :icon="icon"
      :value="value"
      :label="label"
      :is-link="isLink"
      :clickable="clickable"
      :border="border && expanded"
      :class="[bem('collapse-item__title', { disabled, expanded })]"
      right-icon-class="iox-cell__right-icon"
      custom-class="iox-cell"
      hover-class="iox-cell--hover"
      @click="onClick"
    >
      <block><block slot="title" ><slot name="title" /></block></block>
      <block><block slot="icon"><slot name="icon" /></block></block>
      <block><block slot="value"><slot name="value" /></block></block>
      <block><block slot="right-icon"><slot name="right-icon" /></block></block>
    </iox-cell>
    <view
      :class="[bem('collapse-item__wrapper')]"
      style="height: 0;"
      :animation="animations"
    >
      <view
        class="iox-collapse-item__content content-class"
      >
        <slot />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';

const classPrefix = 'iox-collapse-item';

@Component({
  name: 'iox-collapse-item',
  externalClasses: ['title-class', 'content-class', 'custom-class'],
})
export default class IoxCollapseItem extends mixins(Base, Emitter) {
  @Prop({
    type: String,
    default: null
  })
  name!: string | null;

  @Prop({
    type: String,
  })
  title?: string;

  @Prop({
    type: String,
  })
  value?: string;

  @Prop({
    type: String,
  })
  icon?: string;

  @Prop({
    type: String,
  })
  label?: string;

  @Prop({
    type: Boolean,
  })
  disabled?: boolean;

  @Prop({
    type: Boolean,
  })
  clickable?: boolean;
  
  @Prop({
    type: Boolean,
    default: true
  })
  border!: boolean;

  @Prop({
    type: Boolean,
    default: true
  })
  isLink!: boolean;

  index = 0;
  expanded = false;
  parent?: Vue;
  animation!: WechatMiniprogram.Animation;
  animations: WechatMiniprogram.IAnyObject[] | null = null;
  inited = false;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `iox-collapse-item custom-class ${ this.index !== 0 ? 'iox-hairline--top' : '' }`;
  }

  created() {
    this.animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease-in-out',
    });
  }

  beforeMount() {
    this.$$dispatch('iox-collapse', 'item-attached', this);
  }

  mounted() {
    this.updateExpanded();

    this.inited = true;
  }

  destroyed() {
    this.$$dispatch('iox-collapse', 'item-detached', this);
  }

  updateExpanded() {
    if (!this.parent) {
      return Promise.resolve();
    }

    const { value, accordion } = this.parent as any;
    const { children = [] } = this.parent as any;
    const { name } = this;

    const index = children.indexOf(this);
    const currentName = name == null ? index : name;

    const expanded = accordion ? value === currentName
      : (value || []).some((name: string | number) => name === currentName);

    if (expanded !== this.expanded) {
      this.updateStyle(expanded);
    }

    this.index = index;
    this.expanded = expanded;
  }

  updateStyle(expanded: boolean) {
    const { inited } = this;
    this.getRect('.iox-collapse-item__content')
      .then((rect) => (rect as NodeInfo).height!)
      .then((height: number) => {
        const { animation } = this;
        if (!animation) {
          return;
        }

        if (expanded) {
          if (height === 0) {
            animation.height('auto').top(1).step();
          } else {
            animation
              .height(height)
              .top(1)
              .step({
                duration: inited ? 300 : 1,
              })
              .height('auto')
              .step();
          }

          this.animations = animation.export();
          return;
        }

        animation.height(height).top(0).step({ duration: 1 }).height(0).step({
          duration: 300,
        });

        this.animations = animation.export();
      });
  }

  onClick() {
    if (this.disabled) {
      return;
    }

    const { name, expanded } = this;
    const index = (this.parent as any).children.indexOf(this);
    const currentName = name == null ? index : name;

    (this.parent as any).switch(currentName, !expanded);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-collapse-item/iox-collapse-item.less';

</style>