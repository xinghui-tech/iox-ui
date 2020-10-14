<template>
  <view
    :class="mainClass"
    :style="mainStyle"
    @tap="onClick"
  >
    <view class="iox-tabbar-item__icon">
      <iox-icon
        v-if="icon"
        :name="icon"
        custom-class="iox-tabbar-item__icon__inner"
      />
      <block v-else>
        <slot
          v-if="active"
          name="icon-active"
        />
        <slot v-else name="icon" />
      </block>
      <iox-info
        :dot="dot"
        :info="info"
        custom-class="iox-tabbar-item__info"
      />
    </view>
    <view class="iox-tabbar-item__text">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';

const classPrefix = 'iox-tabbar-item';

@Component({
  name: 'iox-tabbar-item'
})
export default class IoxTabbarItem extends mixins(Base, Emitter) {
  @Prop({
    type: Boolean,
  })
  dot?: boolean;

  @Prop({
    type: [String, Number]
  })
  info?: string | number;

  @Prop({
    type: String,
  })
  icon?: string;

  @Prop({
    type: String,
  })
  name?: string;

  // data
  index = 0;
  active = false;
  activeColor = '';
  inactiveColor = '';

  parent?: Vue;

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `color: ${ this.active ? this.activeColor : this.inactiveColor } ${this._rootStyles}`;
  }

  get mainClass() {
    const classes = this.bem('tabbar-item', { active: this.active });
    return `${classes} ${this._rootClasses}`;
  }

  onClick() {
    if (this.parent) {
      (this.parent as any).onChange(this);
    }
    this.$emit('click');
  }

  updateFromParent() {
    const { parent } = this;
    if (!parent) {
      return;
    }

    const index = (parent as any).children.indexOf(this);
    const active = (this.name || index) === (parent as any).active;
    const patch: { [key: string]: any } = {};

    if (active !== this.active) {
      patch.active = active;
    }
    if ((parent as any).activeColor !== this.activeColor) {
      patch.activeColor = (parent as any).activeColor;
    }
    if ((parent as any).inactiveColor !== this.inactiveColor) {
      patch.inactiveColor = (parent as any).inactiveColor;
    }

    return Object.keys(patch).length > 0 ? this.setThen(patch)
      : Promise.resolve();
  }

  beforeMount() {
    this.$$dispatch('iox-tabbar', 'item-attached', this);
  }

  destroyed() {
    this.$$dispatch('iox-tabbar', 'item-detached', this);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-tabbar-item/iox-tabbar-item.less';

</style>