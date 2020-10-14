<template>
  <iox-picker
    :class="mainClass"
    :style="mainStyle"
    :active-class="activeClasses"
    :toolbar-class="toolbarClasses"
    :column-class="columnClasses"
    :title="title"
    :columns="columns"
    :item-height="itemHeight"
    :show-toolbar="showToolbar"
    :visible-item-count="visibleItemCount"
    :confirm-button-text="confirmButtonText"
    :cancel-button-text="cancelButtonText"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    ref="picker"
  />
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { isDef } from '../../utils/utils';
import { extractFunc } from '../../utils/func-utils';

const currentYear = new Date().getFullYear();

function isValidDate(date: number) {
  return isDef(date) && !isNaN(new Date(date).getTime());
}

function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

function padZero(val: string | number): string {
  return `00${val}`.slice(-2);
}

function times(n: number, iteratee: (index: number) => string): string[] {
  let index = -1;
  const result = Array(n < 0 ? 0 : n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

function getTrueValue(formattedValue: string): number {
  if (!formattedValue) return NaN;
  while (isNaN(parseInt(formattedValue, 10))) {
    formattedValue = formattedValue.slice(1);
  }
  return parseInt(formattedValue, 10);
}

function getMonthEndDay(year: number, month: number): number {
  return 32 - new Date(year, month - 1, 32).getDate();
}

const defaultFormatter = (_: string, value: string) => value;

const classPrefix = 'iox-datetime-picker';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['active-class', 'toolbar-class', 'column-class', 'custom-class'],
  // #endif
})
export default class IoxDatetimePicker extends mixins(Base) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  activeClass?: string;

  @Prop({type: String})
  toolbarClass?: string;

  @Prop({type: String})
  columnClass?: string;
  // #endif

  @Prop({
    type: String,
  })
  title?: string;

  @Prop({
    type: Boolean,
  })
  loading?: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  showToolbar!: boolean;

  @Prop({
    type: String,
    default: '取消',
  })
  cancelButtonText!: string;

  @Prop({
    type: String,
    default: '确认',
  })
  confirmButtonText!: string;

  @Prop({
    type: Number,
    default: 6,
  })
  visibleItemCount!: number;

  @Prop({
    type: Number,
    default: 44,
  })
  itemHeight!: number;

  @Prop({
    type: [String, Number],
  })
  value?: string | number;

  @Prop({
    type: String,
  })
  filter?: string;

  @Prop({
    type: String,
    default: 'datetime',
  })
  type!: string;

  @Prop({
    type: String,
  })
  formatter?: string;

  @Prop({
    type: Number,
    default: new Date(currentYear - 10, 0, 1).getTime(),
  })
  minDate!: number;

  @Prop({
    type: Number,
    default: new Date(currentYear + 10, 11, 31).getTime(),
  })
  maxDate!: number

  @Prop({
    type: Number,
    default: 0,
  })
  minHour!: number;

  @Prop({
    type: Number,
    default: 23,
  })
  maxHour!: number;

  @Prop({
    type: Number,
    default: 0,
  })
  minMinute!: number;

  @Prop({
    type: Number,
    default: 59,
  })
  maxMinute!: number;

  innerValue = Date.now();
  columns = [];
  picker?: Vue;

  get classPrefix() {
    return classPrefix;
  }

  get activeClasses() {
    let cls = 'active-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.activeClass || '');
    // #endif

    return cls;
  }

  get toolbarClasses() {
    let cls = 'toolbar-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.toolbarClass || '');
    // #endif

    return cls;
  }

  get columnClasses() {
    let cls = 'column-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.columnClass || '');
    // #endif

    return cls;
  }

  @Watch('value')
  @Watch('type')
  @Watch('minDate')
  @Watch('maxDate')
  @Watch('minHour')
  @Watch('maxHour')
  @Watch('minMinute')
  @Watch('maxMinute')
  @Watch('maxHour')
  updateValue() {
    const val = this.correctValue(this.value);
    const isEqual = val === this.innerValue;
    if (!isEqual) {
      this.updateColumnValue(val).then(() => {
        this.$emit('input', val);
      });
    } else {
      this.updateColumns();
    }
  }

  getPicker() {
    if (this.picker == null) {
      this.picker = this.$refs.picker as Vue;

      const picker: any = this.picker;
      const { setColumnValues } = picker;
      picker.setColumnValues = (...args: any) =>
        setColumnValues.apply(picker, [...args, false]);
    }

    return this.picker;
  }

  updateColumns() {
    const formatter  = this.formatter ? extractFunc(this.formatter) : defaultFormatter;
    const results = this.getOriginColumns().map((column) => ({
      values: column.values.map((value) => formatter(column.type, value)),
    }));

    return this.setThen({ columns: results });
  }

  getOriginColumns() {
    const { filter } = this;
    const results = this.getRanges().map(({ type, range }) => {
      let values = times(range[1] - range[0] + 1, (index) => {
        let value: string | number = range[0] + index;
        value = type === 'year' ? `${value}` : padZero(value);
        return value;
      });

      if (filter) {
        values = extractFunc(filter)(type, values);
      }

      return { type, values };
    });

    return results;
  }

  getRanges() {
    if (this.type === 'time') {
      return [
        {
          type: 'hour',
          range: [this.minHour, this.maxHour],
        },
        {
          type: 'minute',
          range: [this.minMinute, this.maxMinute],
        },
      ];
    }

    const {
      maxYear,
      maxDate,
      maxMonth,
      maxHour,
      maxMinute,
    } = this.getBoundary('max', this.innerValue);
    const {
      minYear,
      minDate,
      minMonth,
      minHour,
      minMinute,
    } = this.getBoundary('min', this.innerValue);

    const result = [
      {
        type: 'year',
        range: [minYear, maxYear],
      },
      {
        type: 'month',
        range: [minMonth, maxMonth],
      },
      {
        type: 'day',
        range: [minDate, maxDate],
      },
      {
        type: 'hour',
        range: [minHour, maxHour],
      },
      {
        type: 'minute',
        range: [minMinute, maxMinute],
      },
    ];

    if (this.type === 'date') result.splice(3, 2);
    if (this.type === 'year-month') result.splice(2, 3);
    return result;
  }

  correctValue(value: any) {
    // validate value
    const isDateType = this.type !== 'time';
    if (isDateType && !isValidDate(value)) {
      value = this.minDate;
    } else if (!isDateType && !value) {
      const { minHour } = this;
      value = `${padZero(minHour)}:00`;
    }

    // time type
    if (!isDateType) {
      let [hour, minute] = value.split(':');
      hour = padZero(range(hour, this.minHour, this.maxHour));
      minute = padZero(range(minute, this.minMinute, this.maxMinute));

      return `${hour}:${minute}`;
    }

    // date type
    value = Math.max(value, this.minDate);
    value = Math.min(value, this.maxDate);

    return value;
  }

  getBoundary(type: string, innerValue: number) {
    const value = new Date(innerValue);
    const boundary = new Date((this as any)[`${type}Date`]);
    const year = boundary.getFullYear();
    let month = 1;
    let date = 1;
    let hour = 0;
    let minute = 0;

    if (type === 'max') {
      month = 12;
      date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
      hour = 23;
      minute = 59;
    }

    if (value.getFullYear() === year) {
      month = boundary.getMonth() + 1;
      if (value.getMonth() + 1 === month) {
        date = boundary.getDate();
        if (value.getDate() === date) {
          hour = boundary.getHours();
          if (value.getHours() === hour) {
            minute = boundary.getMinutes();
          }
        }
      }
    }

    return {
      [`${type}Year`]: year,
      [`${type}Month`]: month,
      [`${type}Date`]: date,
      [`${type}Hour`]: hour,
      [`${type}Minute`]: minute,
    };
  }

  onCancel() {
    this.$emit('cancel');
  }

  onConfirm() {
    this.$emit('confirm', this.innerValue);
  }

  onChange() {
    let value: number | string | Date;

    const picker: any = this.getPicker();
    const originColumns = this.getOriginColumns();

    if (this.type === 'time') {
      const indexes: number[] = picker.getIndexes();
      value = `${+originColumns[0].values[indexes[0]]}:${+originColumns[1]
        .values[indexes[1]]}`;
    } else {
      const indexes: number[] = picker.getIndexes();
      const values = indexes.map(
        (value, index) => originColumns[index].values[value]
      );
      const year = getTrueValue(values[0]);
      const month = getTrueValue(values[1]);
      const maxDate = getMonthEndDay(year, month);
      let date = getTrueValue(values[2]);
      if (this.type === 'year-month') {
        date = 1;
      }
      date = date > maxDate ? maxDate : date;
      let hour = 0;
      let minute = 0;
      if (this.type === 'datetime') {
        hour = getTrueValue(values[3]);
        minute = getTrueValue(values[4]);
      }
      value = new Date(year, month - 1, date, hour, minute);
    }
    value = this.correctValue(value);

    this.updateColumnValue(value).then(() => {
      this.$emit('input', value);
      this.$emit('change', value);
    });
  }

  updateColumnValue(value: number | string | Date) {
    let values: any[] = [];
    const { type } = this;
    const formatter = this.formatter ? extractFunc(this.formatter) : defaultFormatter;
    const picker: any = this.getPicker();

    if (type === 'time') {
      const pair = (value as string).split(':');
      values = [formatter('hour', pair[0]), formatter('minute', pair[1])];
    } else {
      const date = new Date(value);
      values = [
        formatter('year', `${date.getFullYear()}`),
        formatter('month', padZero(date.getMonth() + 1)),
      ];
      if (type === 'date') {
        values.push(formatter('day', padZero(date.getDate())));
      }
      if (type === 'datetime') {
        values.push(
          formatter('day', padZero(date.getDate())),
          formatter('hour', padZero(date.getHours())),
          formatter('minute', padZero(date.getMinutes()))
        );
      }
    }

    return this.setThen({ innerValue: value })
      .then(() => this.updateColumns())
      .then(() => picker.setValues(values));
  }

  mounted() {
    const innerValue = this.correctValue(this.value);
    this.updateColumnValue(innerValue).then(() => {
      this.$emit('input', innerValue);
    });
  }
}
</script>

<style lang="less">
// @import '../../style/widget/iox-datetime-picker/iox-datetime-picker.less';

</style>