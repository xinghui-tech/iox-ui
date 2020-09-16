<template>
  <view
  :class="mainClass" :style="mainStyle"
  >
    <iox-cell 
      v-if="title || desc || status"
      :title="title"
      :label="desc"
      :value="status"
      custom-class="header-class"
      value-class="iox-panel__header-value"
    />
    <slot v-else name="header" />

    <view class="iox-panel__content">
      <slot />
    </view>

    <view v-if="useFooterSlot" class="iox-panel__footer iox-hairline--top footer-class">
      <slot name="footer" />
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';

const classPrefix = 'iox-panel';
@Component({
  externalClasses: ['header-class', 'footer-class', 'custom-class'],
})
export default class IoxPanel extends mixins(Base) {
  @Prop({
    type: String
  })
  desc?: string;

  @Prop({
    type: String
  })
  title?: string;

  @Prop({
    type: String
  })
  status?: string;

  @Prop({
    type: Boolean
  })
  useFooterSlot?: boolean;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.customClass || ''} ${this.classPrefix} iox-hairline--top-bottom`;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-panel/iox-panel.less';

</style>