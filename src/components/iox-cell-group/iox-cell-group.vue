<template>
  <block>
    <view
      v-if="title"
      class="iox-cell-group__title title-class"
    >
      {{ title }}
    </view>
    <view :class="mainClass">
      <slot />
    </view>
  </block>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';

const classPrefix = 'iox-cell-group';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: [ 'title-class', 'custom-class']
  // #endif
})
export default class IoxCellGroup extends mixins(Base) {
  @Prop({
    type: String,
    default: null
  })
  title?: string | null;

  @Prop({
    type: Boolean,
    default: true,
  })
  border!: boolean;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.classPrefix} ${ this.border ? 'iox-hairline--top-bottom' : '' }`;
  }

}
</script>

<style lang="less">
@import '../../style/widget/iox-cell-group/iox-cell-group.less';

</style>