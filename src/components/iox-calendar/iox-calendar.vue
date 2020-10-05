<template>
  <block>
    <iox-popup
      v-if="poppable"
      :custom-class="'iox-calendar__popup--' + position"
      close-icon-class="iox-calendar__close-icon"
      :show="show"
      :round="round"
      :position="position"
      :closeable="showTitle || showSubtitle"
      :close-on-click-overlay="closeOnClickOverlay"
      @enter="onOpen"
      @close="onClose"
      @after-enter="onOpened"
      @after-leave="onClosed"
    >
      <view :class="mainClass">
        <calendar-header
          :title="title"
          :show-title="showTitle"
          :subtitle="subtitle"
          :show-subtitle="showSubtitle"
        >
          <block><block slot="title"><slot name="title" /></block></block>
        </calendar-header>

        <scroll-view class="iox-calendar__body" scroll-y :scroll-into-view="scrollIntoView">
          <month
            v-for="(item, index) in months"
            :key="index"
            :id="'month' + index"
            class="month"
            :data-date="item"
            :date="item"
            :type="type"
            :color="color"
            :min-date="minDate"
            :max-date="maxDate"
            :show-mark="showMark"
            :formatter="formatter"
            :row-height="rowHeight"
            :current-date="currentDate"
            :show-subtitle="showSubtitle"
            :allow-sameDay="allowSameDay"
            :show-month-title="index !== 0 || !showSubtitle"
            @click="onClickDay"
          />
        </scroll-view>

        <view :class="['iox-calendar__footer', safeAreaInsetBottom ? 'iox-calendar__footer--safe-area-inset-bottom' : '']">
          <slot name="footer"></slot>
        </view>

        <view :class="['iox-calendar__footer', safeAreaInsetBottom ? 'iox-calendar__footer--safe-area-inset-bottom' : '']">
          <iox-button
            v-if="showConfirm"
            round
            block
            type="danger"
            :color="color"
            custom-class="iox-calendar__confirm"
            :disabled="getButtonDisabled(type, currentDate)"
            native-type="text"
            @click="onConfirm"
          >
            {{ getButtonDisabled(type, currentDate) ? confirmDisabledText : confirmText }}
          </iox-button>
        </view>
      </view>
    </iox-popup>

    <view v-else :class="mainClass">
      <calendar-header
        :title="title"
        :show-title="showTitle"
        :subtitle="subtitle"
        :show-subtitle="showSubtitle"
      >
        <block><block slot="title"><slot name="title" /></block></block>
      </calendar-header>

      <scroll-view class="iox-calendar__body" scroll-y :scroll-into-view="scrollIntoView">
        <month
          v-for="(item, index) in months"
          :key="index"
          :id="'month' + index"
          class="month"
          :data-date="item"
          :date="item"
          :type="type"
          :color="color"
          :min-date="minDate"
          :max-date="maxDate"
          :show-mark="showMark"
          :formatter="formatter"
          :row-height="rowHeight"
          :current-date="currentDate"
          :show-subtitle="showSubtitle"
          :allow-sameDay="allowSameDay"
          :show-month-title="index !== 0 || !showSubtitle"
          @click="onClickDay"
        />
      </scroll-view>

      <view :class="['iox-calendar__footer', safeAreaInsetBottom ? 'iox-calendar__footer--safe-area-inset-bottom' : '']">
        <slot name="footer"></slot>
      </view>

      <view :class="['iox-calendar__footer', safeAreaInsetBottom ? 'iox-calendar__footer--safe-area-inset-bottom' : '']">
        <iox-button
          v-if="showConfirm"
          round
          block
          type="danger"
          :color="color"
          custom-class="iox-calendar__confirm"
          :disabled="getButtonDisabled(type, currentDate)"
          native-type="text"
          @click="onConfirm"
        >
          {{ getButtonDisabled(type, currentDate) ? confirmDisabledText : confirmText }}
        </iox-button>
      </view>
    </view>

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
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Header from './components/header.vue';
import Month from './components/month.vue';
import { requestAnimationFrame } from '../../utils/utils';
import {
  ROW_HEIGHT,
  getNextDay,
  compareDay,
  copyDates,
  calcDateNum,
  formatMonthTitle,
  compareMonth,
  getMonths,
  getDayByOffset,
  Day,
} from './utils';
import { 
  ToastOptions, toast,
} from '../../utils/toast';
import { extractFunc } from '../../utils/func-utils';

const classPrefix = 'iox-calendar';
@Component({
  components: {'calendar-header': Header, month: Month}
})
export default class IoxCalendar extends mixins(Base) {
  @Prop({
    type: String,
    default: '日期选择',
  })
  title!: string;

  @Prop({
    type: String,
  })
  color?: string;

  @Prop({
    type: Boolean,
  })
  show?: boolean;

  @Prop({
    type: String,
  })
  formatter?: string;

  @Prop({
    type: String,
    default: '',
  })
  textColor!: string;

  @Prop({
    type: String,
    default: '确定',
  })
  confirmText!: string;

  @Prop({
    type: String,
  })
  rangePrompt?: string;

  @Prop({
    type: [Number, Array],
  })
  defaultDate?: number | number[] | [number, number | null];

  @Prop({
    type: Boolean,
  })
  allowSameDay!: boolean;

  @Prop({
    type: String,
  })
  confirmDisabledText?: string;

  @Prop({
    type: String,
    default: 'single',
  })
  // single | range | multiple
  type!: string;

  @Prop({
    type: Number,
    default: () => Date.now()
  })
  minDate!: number;

  @Prop({
    type: Number,
    default: () => new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 6,
        new Date().getDate()
      ).getTime(),
  })
  maxDate!: number;

  @Prop({
    type: String,
    default: 'bottom',
  })
  position!: string;

  @Prop({
    type: [Number, String],
    default: ROW_HEIGHT,
  })
  rowHeight?: number | string;

  @Prop({
    type: Boolean,
    default: true,
  })
  round!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  poppable!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  showMark!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  showTitle!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  showConfirm!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  showSubtitle!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  safeAreaInsetBottom!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  closeOnClickOverlay!: boolean;

  @Prop({
    type: Number,
    default: null,
  })
  maxRange!: number | null;

  toast: ToastOptions = toast();

  subtitle = '';
  currentDate: number | number[] | [number, number | null] = new Date().getTime();
  scrollIntoView = '';
  contentObserver?: UniApp.IntersectionObserver;

  get classPrefix() {
    return classPrefix;
  }

  get months() {
    return getMonths(this.minDate, this.maxDate);
  }

  created() {
    this.currentDate = this.getInitialDate();
  }

  mounted() {
    if (this.show || !this.poppable) {
      this.initRect();
      this.doScrollIntoView();
    }
  }

  beforeDestroy() {
    if (this.contentObserver) {
      this.contentObserver.disconnect();
    }
  }

  @Watch('show')
  onShowChanged(newVal: boolean) {
    if (newVal) {
      this.initRect();
      this.doScrollIntoView();
    }
  }

  @Watch('defaultDate')
  onDefaultDateChanged(newVal: number | number[]) {
    this.currentDate = newVal;
    this.doScrollIntoView();
  }

  @Watch('type')
  reset() {
    this.currentDate = this.getInitialDate();
    this.doScrollIntoView();
  }

  initRect() {
    if (this.contentObserver) {
      this.contentObserver.disconnect();
    }

    const contentObserver: UniApp.IntersectionObserver = uni.createIntersectionObserver(this, {
      thresholds: [0, 0.1, 0.9, 1],
      observeAll: true,
    });

    this.contentObserver = contentObserver;

    contentObserver.relativeTo('.iox-calendar__body', 0);
    contentObserver.observe('.month', (res) => {
      if (res.boundingClientRect!.top! <= res.relativeRect!.top!) {
        this.subtitle = formatMonthTitle((res as any).dataset.date);
      }
    });
  }

  getInitialDate() {
    const { type, defaultDate, minDate } = this;

    if (type === 'range') {
      const [startDay, endDay] = defaultDate as number[] || [];
      return [
        startDay || minDate,
        endDay || getNextDay(new Date(minDate)).getTime(),
      ];
    }

    if (type === 'multiple') {
      return defaultDate || [minDate];
    }

    return defaultDate || minDate;
  }

  doScrollIntoView() {
    requestAnimationFrame(() => {
      const {
        currentDate,
        type,
        show,
        poppable,
        minDate,
        maxDate,
      } = this;
      const targetDate = type === 'single' ? currentDate : (currentDate as number[])[0];
      const displayed = show || !poppable;
      if (!targetDate || !displayed) {
        return;
      }

      const months = getMonths(minDate, maxDate);

      months.some((month, index) => {
        if (compareMonth(month, targetDate as number) === 0) {
          this.scrollIntoView = `month${index}`;
          return true;
        }

        return false;
      });
    });
  }

  onOpen() {
    this.$emit('open');
  }

  onOpened() {
    this.$emit('opened');
  }

  onClose() {
    this.$emit('close');
  }

  onClosed() {
    this.$emit('closed');
  }

  onClickDay(day: Day) {
    const { date } = day;
    const { type, currentDate, allowSameDay } = this;

    if (type === 'range') {
      const [startDay, endDay] = currentDate as number[];

      if (startDay && !endDay) {
        const compareToStart = compareDay(date, startDay);

        if (compareToStart === 1) {
          this.select([startDay, date], true);
        } else if (compareToStart === -1) {
          this.select([date, null]);
        } else if (allowSameDay) {
          this.select([date, date]);
        }
      } else {
        this.select([date, null]);
      }
    } else if (type === 'multiple') {
      let selectedIndex!: number;

      const selected = (currentDate as number[]).some((dateItem: number, index: number) => {
        const equal = compareDay(dateItem, date) === 0;
        if (equal) {
          selectedIndex = index;
        }
        return equal;
      });

      if (selected) {
        const cancelDate = (currentDate as number[]).splice(selectedIndex, 1);
        this.currentDate = currentDate;
        this.unselect(cancelDate);
      } else {
        this.select([...(currentDate as number[]), date]);
      }
    } else {
      this.select(date, true);
    }
  }

  unselect(dateArray: number[]) {
    const date = dateArray[0];
    if (date) {
      this.$emit('unselect', copyDates(date));
    }
  }

  select(date: number | Date | (number | Date)[] | [number | Date, number | Date | null], complete?: boolean) {
    if (complete && this.type === 'range' && Array.isArray(date)) {
      const valid = this.checkRange(date as [number | Date, number | Date]);

      if (!valid) {
        // auto selected to max range if showConfirm
        if (this.showConfirm) {
          this.emit([
            date[0],
            getDayByOffset(date[0], this.maxRange! - 1),
          ]);
        } else {
          this.emit(date);
        }
        return;
      }
    }

    this.emit(date);

    if (complete && !this.showConfirm) {
      this.onConfirm();
    }
  }

  emit(date: any) {
    const getTime = (date: any ) =>
      date instanceof Date ? date.getTime() : date;

    this.currentDate = Array.isArray(date) ? date.map(getTime) : getTime(date);
    this.$emit('select', copyDates(date));
  }

  checkRange(date: [Date | number, Date | number]) {
    const { maxRange, rangePrompt } = this;

    if (maxRange && calcDateNum(date) > maxRange) {
      this.toast = toast(rangePrompt || `选择天数不能超过 ${maxRange} 天`);
      return false;
    }

    return true;
  }

  onConfirm() {
    if ( this.type === 'range' && !this.checkRange(this.currentDate as [number, number]) ) {
      return;
    }
    this.$nextTick(() => {
      this.$emit('confirm', copyDates(this.currentDate));
    });
  }

  getButtonDisabled(type: string, currentDate: number | number[] | null) {
      if (currentDate == null) {
        return true;
      }

    if (type === 'range' && Array.isArray(currentDate)) {
      return !currentDate[0] || !currentDate[1];
    }

    if (type === 'multiple' && Array.isArray(currentDate)) {
      return !currentDate.length;
    }

    return !currentDate;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-calendar/iox-calendar.less';

</style>