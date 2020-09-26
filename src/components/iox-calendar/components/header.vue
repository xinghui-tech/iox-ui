<template>
  <view class="iox-calendar__header">
    <block v-if="showTitle">
      <view class="iox-calendar__header-title"><slot name="title" /></view>
      <view class="iox-calendar__header-title">{{ title }}</view>
    </block>

    <view v-if="showSubtitle" class="iox-calendar__header-subtitle">
      {{ subtitle }}
    </view>

    <view class="iox-calendar__weekdays">
      <view v-for="(item, index) in weekdays" :key="index" class="iox-calendar__weekday">
        {{ item }}
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../../mixins/base';

const classPrefix = 'iox-calendar';
@Component
export default class IoxCalendarHeader extends mixins(Base) {
  @Prop({
    type: String,
    default: '日期选择',
  })
  title!: string;

  @Prop({
    type: String,
  })
  subtitle?: string;

  @Prop({
    type: Boolean,
  })
  showTitle?: boolean;

  @Prop({
    type: Boolean,
  })
  showSubtitle?: boolean;

  weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  get classPrefix() {
    return classPrefix;
  }
}
</script>

<style lang="less">
@import '../../../style/widget/iox-calendar/header.less';

</style>