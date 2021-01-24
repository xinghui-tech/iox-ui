<template>
  <view :class="mainClass" :style="boxingStyles">
    <view v-if="title" class="demo-block__title">{{ title }}</view>
    <slot />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../mixins/base';
import Boxing from '../mixins/boxing';

@Component
export default class DemoBlock extends mixins(Base, Boxing) {
  @Prop({type: String})
  title?: string;

  @Prop({type: Boolean})
  padding?: boolean;

  get mainClass() {
    return `demo-block boxing-class iox-clearfix ${ this.padding ? 'demo-block--padding' : '' } ${this._rootClasses} `;
  }
}
</script>

<style lang="less">

.demo-block__title {
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  color: rgba(69,90,100,.6);
  padding: 20px 15px 15px;
}

.demo-block--padding {
  padding: 0 15px;
}

.demo-block--padding .demo-block__title {
  padding-left: 0;
}
</style>
