<template>
  <view
    :class="mainClass"
    :style="mainStyle"
    hover-class="iox-sidebar-item--hover"
    hover-stay-time="70"
    @tap="onClick"
  >
    <view class="iox-sidebar-item__text">
      <iox-info
        v-if="badge != null || info !== null || dot"
        :dot="dot"
        :info="badge != null ? badge : info"
      />
      <view v-if="title">{{ title }}</view>
      <slot v-else name="title" />
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';

const classPrefix = 'iox-sidebar-item';

@Component({
  name: 'iox-sidebar-item',
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['active-class', 'disabled-class', 'custom-class']
  // #endif
})
export default class IoxSidebarItem extends mixins(Base, Emitter) {
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
  badge?: string;

  // data
  parent?: Vue;
  selected = false;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes = this.bem('sidebar-item', { selected: this.selected, disabled: this.disabled });
    return `${classes} ${ this.selected ? 'active-class' : '' } ${ this.disabled ? 'disabled-class' : '' } custom-class`;
  }

  beforeMount() {
    this.$$dispatch('iox-sidebar', 'item-attached', this);
  }

  destroyed() {
    this.$$dispatch('iox-sidebar', 'item-detached', this);
  }

  onClick() {
    const { parent } = this;

    if (!parent || this.disabled) {
      return;
    }

    const index = (parent as any).children.indexOf(this);

    (parent as any).setActive(index).then(() => {
      this.$emit('click', index);
      parent.$emit('change', index);
    });
  }

  setActive(selected: boolean) {
    return this.selected = selected;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-sidebar-item/iox-sidebar-item.less';

</style>