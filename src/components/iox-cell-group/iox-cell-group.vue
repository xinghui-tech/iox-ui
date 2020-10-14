<template>
  <view :class="mainClass" :style="mainStyle">
    <view
      v-if="title"
      :class="titleClasses"
    >
      {{ title }}
    </view>
    <view :class="cellsClass">
      <slot />
    </view>
  </view>
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
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({
    type: String,
  })
  titleClass?: string;
  // #endif

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

  get cellsClass() {
    return `${ this.border ? 'iox-hairline--top-bottom' : '' }`;
  }

  get titleClasses() {
    let cls = 'title-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.titleClass || '' );
    // #endif
    return `iox-cell-group__title ${cls}`;
  }

}
</script>

<style lang="less">
@import '../../style/widget/iox-cell-group/iox-cell-group.less';

</style>