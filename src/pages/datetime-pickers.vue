<template>
  <block>
    <demo-block title="选择完整时间">
      <iox-datetime-picker
        type="datetime"
        data-type="datetime"
        :loading="loading"
        :value="currentDate1"
        :min-date="minDate"
        @input="(value) => onInput('datetime', value)"
      />
    </demo-block>

    <demo-block title="选择日期（年月日）">
      <iox-datetime-picker
        type="date"
        data-type="date"
        value="currentDate2"
        :min-date="minDate"
        @input="(value) => onInput('date', value)"
        :formatter="formatter"
      />
    </demo-block>

    <demo-block title="选择日期（年月）">
      <iox-datetime-picker
        type="year-month"
        data-type="year-month"
        :value="currentDate3"
        :min-date="minDate"
        @input="(value) => onInput('year-month', value)"
      />
    </demo-block>

    <demo-block title="选择时间">
      <iox-datetime-picker
        type="time"
        data-type="time"
        :value="currentDate4"
        :min-hour="minHour"
        :max-hour="maxHour"
        @input="(value) => onInput('time', value)"
      />
    </demo-block>

    <demo-block title="选项过滤器">
      <iox-datetime-picker
        type="time"
        :value="currentDate4"
        :filter="filter"
      />
    </demo-block>

    <iox-toast
      :show="toast.show" 
      :type="toast.type" 
      :mask="toast.mask" 
      :z-index="toast.zIndex" 
      :position="toast.position" 
      :forbid-click="toast.forbidClick" 
      :loading-type="toast.loadingType" 
      :message="toast.message" 
      :duration="toast.duration"
      @close="toast.show = false"
    />
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import {  ToastOptions, toast } from '../utils/toast';
import Fonts from '../mixins/font';
import { wrapFunc, releaseFunc } from '../utils/func-utils';


@Component
export default class Index extends mixins(Fonts) {
  toast: ToastOptions = toast();

  minHour = 10;
  maxHour = 20;
  minDate = new Date(2018, 0, 1).getTime();
  maxDate = new Date(2019, 10, 1).getTime();
  currentDate1 = new Date(2018, 2, 31).getTime();
  currentDate2 = null;
  currentDate3 = new Date(2018, 0, 1);
  currentDate4 = '12:00';
  loading = false;

  formatter: string | null = null;
  filter: string | null = null;

  onInput(type: string, value: string | number) {
    const result = this.getResult(value, type);

    this.toast = toast(result.toString());
  }

  getResult(time: string | number, type: string) {
    const date = new Date(time);
    switch (type) {
      case 'datetime':
        return date.toLocaleString();
      case 'date':
        return date.toLocaleDateString();
      case 'year-month':
        return `${date.getFullYear()}/${date.getMonth() + 1}`;
      case 'time':
        return time;
      default:
        return '';
    }
  }

  onLoad() {
    this.formatter = wrapFunc((type: string, value: any) => {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    });

    this.filter = wrapFunc((type: string, options: any[]) => {
      if (type === 'minute') {
        return options.filter(option => option % 5 === 0);
      }

      return options;
    });
  }

  onUnload() {
    releaseFunc(this.formatter);
    releaseFunc(this.filter);
  }

}
</script>

<style lang="less">
</style>
