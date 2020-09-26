<template>
  <block>
    <demo-block title="基础用法">
      <iox-cell
        is-link
        title="选择单个日期"
        :value="formatFullDate(date.selectSingle)"
        @click="show('selectSingle', 'single')"
      />

      <iox-cell
        is-link
        title="选择多个日期"
        :value="formatMultiple(date.selectMultiple)"
        @click="show('selectMultiple', 'multiple')"
      />

      <iox-cell
        is-link
        title="选择日期区间"
        :value="formatRange(date.selectRange)"
        @click="show('selectRange', 'range')"
      />
    </demo-block>

    <demo-block title="快捷选择">
      <iox-cell
        is-link
        title="选择单个日期"
        :value="formatFullDate(date.quickSelect1)"
        @click="show('quickSelect1', 'single')"
      />

      <iox-cell
        is-link
        title="选择日期区间"
        :value="formatRange(date.quickSelect2)"
        @click="show('quickSelect2', 'range')"
      />
    </demo-block>

    <demo-block title="自定义日历">
      <iox-cell
        is-link
        title="自定义颜色"
        :value="formatRange(date.customColor)"
        @click="show('customColor', 'range')"
      />

      <iox-cell
        is-link
        title="自定义日期范围"
        :value="formatFullDate(date.customRange)"
        @click="show('customRange', 'single')"
      />

      <iox-cell
        is-link
        title="自定义按钮文字"
        :value="formatRange(date.customConfirm)"
        @click="show('customConfirm', 'range')"
      />

      <iox-cell
        is-link
        title="自定义日期文案"
        :value="formatRange(date.customDayText)"
        @click="show('customDayText', 'range')"
      />

      <iox-cell
        is-link
        title="自定义弹出位置"
        :value="formatFullDate(date.customPosition)"
        @click="show('customPosition', 'single')"
      />

      <iox-cell
        is-link
        title="日期区间最大范围"
        :value="formatRange(date.maxRange)"
        @click="show('maxRange', 'range')"
      />
    </demo-block>

    <demo-block title="平铺展示">
      <iox-calendar
        title="日历"
        :poppable="false"
        :show-confirm="false"
        :min-date="tiledMinDate"
        :max-date="tiledMaxDate"
        class="tiled-calendar"
      />
    </demo-block>

    <iox-calendar
      :show="showCalendar"
      :type="type"
      :color="color"
      :round="round"
      :position="position"
      :min-date="minDate"
      :max-date="maxDate"
      :max-range="maxRange"
      :formatter="formatter"
      :show-confirm="showConfirm"
      :confirm-text="confirmText"
      :confirm-disabled-text="confirmDisabledText"
      @confirm="onConfirm"
      @select="onSelect"
      @unselect="onUnselect"
      @open="onOpen"
      @opened="onOpened"
      @close="onClose"
      @closed="onClosed"
    >
    </iox-calendar>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import { wrapFunc, releaseFunc } from '../utils/func-utils';
import { Day } from '@/components/iox-calendar/utils';

@Component
export default class Index extends mixins(Fonts) {
  date = {
    maxRange: [],
    selectSingle: null,
    selectRange: [],
    selectMultiple: [],
    quickSelect1: null,
    quickSelect2: [],
    customColor: [],
    customConfirm: [],
    customRange: null,
    customDayText: [],
    customPosition: null
  };
  id = '';
  type = 'single';
  round = true;
  color: string | null = null;
  minDate = Date.now();
  maxDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 6,
    new Date().getDate()
  ).getTime();
  maxRange: string | null = null;
  position: string | null = null;
  formatter: string | null = null;
  showConfirm = false;
  showCalendar = false;
  tiledMinDate = new Date(2012, 0, 10).getTime();
  tiledMaxDate = new Date(2012, 2, 20).getTime();
  confirmText: string | null = null;
  confirmDisabledText: string | null = null;

  onConfirm(dates: Date | Date[]) {
    console.log(dates);
    this.showCalendar = false;

    (this.date as any)[this.id] = dates;
  }

  onSelect(dates: Date | Date[]) {
    console.log(dates);
  }

  onUnselect(dates: Date | Date[]) {
    console.log(dates);
  }

  onClose() {
    this.showCalendar = false;
  }

  onOpen() {
    console.log('open');
  }

  onOpened() {
    console.log('opened');
  }

  onClosed() {
    console.log('closed');
  }

  resetSettings() {
    const data = ({
      round: true,
      color: null,
      minDate: Date.now(),
      maxDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 6,
        new Date().getDate()
      ).getTime(),
      maxRange: null,
      position: 'bottom',
      formatter: null,
      showConfirm: true,
      confirmText: '确定',
      confirmDisabledText: null
    });
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (key === 'formatter') {
          this.setFormater((data as any)[key]);
        } else {
          (this as any)[key] = (data as any)[key];
        }
      }
    }
  }

  show(id: string, type: string) {
    this.resetSettings();
    const data: any = {
      id,
      type,
      showCalendar: true
    };

    switch (id) {
      case 'quickSelect1':
      case 'quickSelect2':
        data.showConfirm = false;
        break;
      case 'customColor':
        data.color = '#07c160';
        break;
      case 'customConfirm':
        data.confirmText = '完成';
        data.confirmDisabledText = '请选择结束时间';
        break;
      case 'customRange':
        data.minDate = new Date(2010, 0, 1).getTime();
        data.maxDate = new Date(2010, 0, 31).getTime();
        break;
      case 'customDayText':
        data.minDate = new Date(2010, 4, 1).getTime();
        data.maxDate = new Date(2010, 4, 31).getTime();
        data.formatter = this.setFormater(this.dayFormatter);
        break;
      case 'customPosition':
        data.round = false;
        data.position = 'right';
        break;
      case 'maxRange':
        data.maxRange = 3;
        break;
    }

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (key === 'formatter') {
          this.setFormater((data as any)[key]);
        } else {
          (this as any)[key] = (data as any)[key];
        }
      }
    }
  }

  dayFormatter(day: Day) {
    const month = day.date.getMonth() + 1;
    const date = day.date.getDate();

    if (month === 5) {
      if (date === 1) {
        day.topInfo = '劳动节';
      } else if (date === 4) {
        day.topInfo = '五四青年节';
      } else if (date === 11) {
        day.text = '今天';
      }
    }

    if (day.type === 'start') {
      day.bottomInfo = '入店';
    } else if (day.type === 'end') {
      day.bottomInfo = '离店';
    }

    return day;
  }

  formatDate(date: Date) {
    if (date) {
      date = new Date(date);
      return date.getMonth() + 1 + '/' + date.getDate();
    }
  }

  formatFullDate(date: Date) {
    if (date) {
      date = new Date(date);
      return date.getFullYear() + '/' + this.formatDate(date);
    }
  }

  formatMultiple(dates: Date[]) {
    if (dates.length) {
      return '选择了 ' + dates.length + '个日期';
    }
  }

  formatRange(dateRange: Date[]) {
    if (dateRange.length) {
      return this.formatDate(dateRange[0]) + ' - ' + this.formatDate(dateRange[1]);
    }
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }

  setFormater(formater: Function) {
    if (this.formatter) {
      releaseFunc(this.formatter);
    }
    if (formater) {
      this.formatter = wrapFunc(formater);
    } else {
      this.formatter = null;
    }

  }

  onUnload() {
    if (this.formatter) {
      releaseFunc(this.formatter);
    }
  }
}
</script>

<style lang="less">
.tiled-calendar {
  --calendar-height: 500px;
}
</style>
