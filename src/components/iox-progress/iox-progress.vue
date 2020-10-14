<template>
  <view :class="mainClass" :style="mainStyle">
    <view
      class="iox-progress__portion"
      :style="'width: ' + percentage + '%; background: ' + ( inactive ? '#cacaca' : color )"
    >
      <view
        v-if="showPivot && text(pivotText, percentage)"
        :style="'color: ' +  textColor + '; background: ' + ( pivotColor ? pivotColor : inactive ? '#cacaca' : color )"
        class="iox-progress__pivot"
      >
        {{ text(pivotText, percentage) }}
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { addUnit } from '../..//utils/utils';
import { BLUE } from '../../utils/color';

const classPrefix = 'iox-progress';

@Component
export default class IoxProgress extends mixins(Base) {
  @Prop({
    type: Boolean,
  })
  inactive?: boolean;

  @Prop({
    type: Number,
  })
  percentage?: number;

  @Prop({
    type: String,
  })
  pivotText?: string;

  @Prop({
    type: String,
  })
  pivotColor?: string;

  @Prop({
    type: String,
  })
  trackColor?: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  showPivot!: boolean;

  @Prop({
    type: String,
    default: BLUE,
  })
  color!: string;

  @Prop({
    type: String,
    default: '#fff',
  })
  textColor!: string;

  @Prop({
    type: [Number, String],
    default: 4,
  })
  strokeWidth!: number | string;

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `height: ${ addUnit(this.strokeWidth) }; ${ this.trackColor ? 'background: ' + this.trackColor : '' } ${this._rootStyles}`;
  }

  text(pivotText: string, percentage: number) {
    return pivotText || percentage + '%';
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-progress/iox-progress.less';

</style>