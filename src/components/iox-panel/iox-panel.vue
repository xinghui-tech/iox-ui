<template>
  <view
  :class="mainClass" :style="mainStyle"
  >
    <iox-cell
      v-if="title || desc || status"
      :title="title"
      :label="desc"
      :value="status"
      :border="border"
      value-class="iox-panel__header-value"
      :custom-class="headerClasses"
    />
    <slot v-else name="header" />

    <view class="iox-panel__content">
      <slot />
    </view>

    <view v-if="useFooterSlot" :class="footerClasses">
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
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['header-class', 'footer-class', 'custom-class'],
  // #endif
})
export default class IoxPanel extends mixins(Base) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  headerClass?: string;

  @Prop({type: String})
  footerClass?: string;
  // #endif

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
  border?: boolean;

  @Prop({
    type: Boolean
  })
  useFooterSlot?: boolean;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.classPrefix} iox-hairline--top-bottom ${this._rootClasses}`;
  }

  get headerClasses() {
    let cls = 'header-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.headerClass || '');
    // #endif

    return cls;
  }

  get footerClasses() {
    let cls = 'footer-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.footerClass || '');
    // #endif

    return `iox-panel__footer iox-hairline--top ${cls}`;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-panel/iox-panel.less';

</style>