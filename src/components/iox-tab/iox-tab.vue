<template>
  <view
    :class="mainClass"
    :style="mainStyle"
  >
    <slot v-if="shouldRender" />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';

const classPrefix = 'iox-tab';

@Component({
  name: 'iox-tab'
})
export default class IoxTab extends mixins(Base, Emitter) {
  @Prop({
    type: Boolean,
  })
  dot?: boolean;

  @Prop({
    type: String,
  })
  info?: string;

  @Prop({
    type: String,
  })
  title?: string;

  @Prop({
    type: Boolean,
  })
  disabled?: boolean;

  @Prop({
    type: String,
  })
  titleStyle?: string;

  @Prop({
    type: [Number, String],
    default: '',
  })
  name!: string | number;

  // data
  inited = false;
  index = 0;
  active = false;
  shouldShow = false;
  shouldRender = false;

  parent?: Vue;

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `${this.shouldShow ? '' : 'display: none;'} ${this.customStyle || ''}`;
  }

  get mainClass() {
    const classes = this.bem('tab__pane', { active: this.active, inactive: !this.active });
    return `${this.classPrefix} ${classes} custom-class`;
  }

  get spinnerClass() {
    return `${this.classPrefix}__close`;
  }
  get computedName() {
    if (this.name !== '') {
      return this.name;
    }
    return this.index;
  }

  @Watch('dot')
  @Watch('info')
  @Watch('title')
  @Watch('disabled')
  @Watch('titleStyle')
  update() {
    if (this.parent) {
      (this.parent as any).updateTabs();
    }
  }

  beforeMount() {
    this.$$dispatch('iox-tabs', 'tab-attached', this);
  }

  destroyed() {
    this.$$dispatch('iox-tabs', 'tab-detached', this);
  }

  updateRender(active: boolean, parent: Vue) {
    this.inited = this.inited || active;
    this.active = active;
    this.shouldRender =  this.inited || !(parent as any).lazyRender;
    this.shouldShow = active || (parent as any).animated;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-tab/iox-tab.less';

</style>