<template>
  <view :class="mainClass" :style="mainStyle" :data-date="date">
    <view v-if="showMonthTitle" class="iox-calendar__month-title">
      {{ formatMonthTitle(date) }}
    </view>

    <view v-if="visible" class="iox-calendar__days">
      <view v-if="showMark" class="iox-calendar__month-mark">
        {{ getMark(date) }}
      </view>

      <view
        v-for="(item, index) in days"
        :key="index"
        :style="'' + getDayStyle(item.type, index, date, rowHeight, color)"
        :class="[bem('calendar__day', [item.type]), item.className]"
        @tap="onClick(index)"
      >
        <view v-if="item.type === 'selected'" class="iox-calendar__selected-day" :style="'background: ' + color">
          <view v-if="item.topInfo" class="iox-calendar__top-info">{{ item.topInfo }}</view>
          <iox-icon v-if="item.icon" :name="item.icon" />
          {{ item.text }}
          <view v-if="item.bottomInfo" class="iox-calendar__bottom-info">
            {{ item.bottomInfo }}
          </view>
        </view>

        <view v-else>
          <view v-if="item.topInfo" class="iox-calendar__top-info">{{ item.topInfo }}</view>
          <iox-icon v-if="item.icon" :name="item.icon" />
          {{ item.text }}
          <view v-if="item.bottomInfo" class="iox-calendar__bottom-info">
            {{ item.bottomInfo }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../../mixins/base';
import {
  ROW_HEIGHT,
  getMonthEndDay,
  compareDay,
  getPrevDay,
  getNextDay,
} from '../utils';
import { Day } from '../../../utils/calendar';
import { extractFunc } from '../../../utils/func-utils';

const classPrefix = 'iox-calendar';
@Component
export default class IoxCalendarMonth extends mixins(Base) {
  @Prop({
    type: [Date, Number, String],
    required: true,
  })
  date!: Date | number | string;

  @Prop({
    type: String,
  })
  type?: string;

  @Prop({
    type: String,
  })
  color?: string;

  @Prop({
    type: Number,
    required: true,
  })
  minDate!: number;

  @Prop({
    type: Number,
    required: true,
  })
  maxDate!: number;

  @Prop({
    type: Boolean,
  })
  showMark?: boolean;

  @Prop({
    type: Number,
    required: true,
  })
  rowHeight!: number;

  @Prop({
    type: String,
  })
  formatter?: string;

  @Prop({
    type: [Number, Array],
    required: true
  })
  currentDate!: number | number[];

  @Prop({
    type: Boolean,
  })
  allowSameDay?: boolean;

  @Prop({
    type: Boolean,
  })
  showSubtitle?: boolean;

  @Prop({
    type: Boolean,
  })
  showMonthTitle?: boolean;

  visible = true;
  days: Day[] = [];

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `iox-calendar__month ${this._rootClasses}`;
  }

  get mainStyle() {
    const { visible, date: now, rowHeight} = this;
    if (!visible) {
      const date = new Date(now);

      const totalDay = getMonthEndDay(
        date.getFullYear(),
        date.getMonth() + 1
      );
      const offset = new Date(now).getDay();
      const padding = Math.ceil((totalDay + offset) / 7) * rowHeight;

      return 'padding-bottom: ' + padding + 'px';
    }

    return '';
  }

  @Watch('date')
  @Watch('type')
  @Watch('minDate')
  @Watch('maxDate')
  @Watch('formatter')
  @Watch('currentDate')
  setDays() {
    const days = [];
    const startDate = new Date(this.date);
    const year = startDate.getFullYear();
    const month = startDate.getMonth();

    const totalDay = getMonthEndDay(
      startDate.getFullYear(),
      startDate.getMonth() + 1
    );

    for (let day = 1; day <= totalDay; day++) {
      const date = new Date(year, month, day);
      const type = this.getDayType(date);

      let config = {
        date,
        type,
        text: day,
        bottomInfo: this.getBottomInfo(type),
      };

      if (this.formatter) {
        config = extractFunc(this.formatter)(config);
      }

      days.push(config);
    }

    this.days = days;
  }

  created() {
    this.setDays();
  }

  onClick(index: number) {
    const item = this.days[index];
    if (item.type !== 'disabled') {
      this.$emit('click', item);
    }
  }

  getMultipleDayType(day: Date) {
    const { currentDate } = this;
    if (!Array.isArray(currentDate)) {
      return '';
    }

    const isSelected = (date: Date) =>
      currentDate.some((item) => compareDay(item, date) === 0);

    if (isSelected(day)) {
      const prevDay = getPrevDay(day);
      const nextDay = getNextDay(day);
      const prevSelected = isSelected(prevDay);
      const nextSelected = isSelected(nextDay);

      if (prevSelected && nextSelected) {
        return 'multiple-middle';
      }

      if (prevSelected) {
        return 'end';
      }

      return nextSelected ? 'start' : 'multiple-selected';
    }

    return '';
  }

  getRangeDayType(day: Date) {
    const { currentDate, allowSameDay } = this;
    if (!Array.isArray(currentDate)) {
      return;
    }

    const [startDay, endDay] = currentDate;

    if (!startDay) {
      return;
    }

    const compareToStart = compareDay(day, startDay);

    if (!endDay) {
      return compareToStart === 0 ? 'start' : '';
    }

    const compareToEnd = compareDay(day, endDay);

    if (compareToStart === 0 && compareToEnd === 0 && allowSameDay) {
      return 'start-end';
    }

    if (compareToStart === 0) {
      return 'start';
    }

    if (compareToEnd === 0) {
      return 'end';
    }

    if (compareToStart > 0 && compareToEnd < 0) {
      return 'middle';
    }
  }

  getDayType(day: Date) {
    const { type, minDate, maxDate, currentDate } = this;

    if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
      return 'disabled';
    }

    if (type === 'single') {
      return compareDay(day, currentDate as number) === 0 ? 'selected' : '';
    }

    if (type === 'multiple') {
      return this.getMultipleDayType(day);
    }

    /* istanbul ignore else */
    if (type === 'range') {
      return this.getRangeDayType(day);
    }
  }

  getBottomInfo(type?: string) {
    if (this.type === 'range') {
      if (type === 'start') {
        return '开始';
      }
      if (type === 'end') {
        return '结束';
      }
      if (type === 'start-end') {
        return '开始/结束';
      }
    }
  }

  getMark(date: Date | number | string) {
    return new Date(date).getMonth() + 1;
  }


  getDayStyle(type: string, index: number, date: Date | number | string, rowHeight: number, color: string) {
    const style = [];
    const offset = new Date(date).getDay();

    if (index === 0) {
      style.push(['margin-left', (100 * offset) / 7 + '%']);
    }

    if (rowHeight !== ROW_HEIGHT) {
      style.push(['height', rowHeight + 'px']);
    }

    if (color) {
      if (type === 'start' || type === 'end'
        || type === 'multiple-selected' || type === 'multiple-middle') {
        style.push(['background', color]);
      } else if (type === 'middle') {
        style.push(['color', color]);
      }
    }

    return style.map((item) => {
      return item.join(':');
    }).join(';');
  }

  formatMonthTitle(date: Date | number | string) {
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
  }
}
</script>

<style lang="less">
@import '../../../style/widget/iox-calendar/month.less';

</style>