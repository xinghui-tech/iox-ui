<template>
  <view :class="mainClass" style="mainStyle">
    <view
      v-if="toolbarPosition === 'top' && showToolbar"
      class="iox-picker__toolbar toolbar-class"
    >
      <view
        class="iox-picker__cancel"
        hover-class="iox-picker__cancel--hover"
        hover-stay-time="70"
        @tap="emit('cancel')"
      >
        {{ cancelButtonText }}
      </view>
      <view v-if="title" class="iox-picker__title iox-ellipsis">{{ title }}</view>
      <view
        class="iox-picker__confirm"
        hover-class="iox-picker__confirm--hover"
        hover-stay-time="70"
        @tap="emit('confirm')"
      >
        {{ confirmButtonText }}
      </view>
    </view>
    <view v-if="loading" class="iox-picker__loading">
      <iox-loading color="#1989fa"/>
    </view>
    <view
      class="iox-picker__columns"
      :style="'height: ' + itemHeight * visibleItemCount + 'px'"
      @touchmove.stop="noop"
    >
      <iox-picker-column
        class="iox-picker__column"
        v-for="(item, index) in (isSimple(columns) ? [columns] : columns)"
        :key="index"
        custom-class="column-class"
        :initial-options="isSimple(columns) ? item : item.values"
        :value-key="valueKey"
        :default-index="item.defaultIndex || defaultIndex"
        :item-height="itemHeight"
        :visible-item-count="visibleItemCount"
        active-class="active-class"
        @change="onChange(index)"
        ref="columns"
      />
      <view class="iox-picker__mask" :style="'background-size: 100% ' + (itemHeight * visibleItemCount - itemHeight) / 2 + 'px'" />
      <view
        class="iox-picker__frame iox-hairline--top-bottom"
        :style="'height: ' + itemHeight + 'px'"
      />
    </view>
    <view
      v-if="toolbarPosition === 'bottom' && showToolbar"
      class="iox-picker__toolbar toolbar-class"
    >
      <view
        class="iox-picker__cancel"
        hover-class="iox-picker__cancel--hover"
        hover-stay-time="70"
        @tap="emit('cancel')"
      >
        {{ cancelButtonText }}
      </view>
      <view v-if="title" class="iox-picker__title iox-ellipsis">{{ title }}</view>
      <view
        class="iox-picker__confirm"
        hover-class="iox-picker__confirm--hover"
        hover-stay-time="70"
        @tap="emit('confirm')"
      >
        {{ confirmButtonText }}
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';

interface Column {
  values: object[];
  defaultIndex?: number;
}

const classPrefix = 'iox-picker';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['active-class', 'toolbar-class', 'column-class'],
  // #endif
})
export default class IoxPicker extends mixins(Base) {
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
  })
  showToolbar?: boolean;

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
    type: String,
    default: 'text',
  })
  valueKey!: string;

  @Prop({
    type: String,
    default: 'top',
  })
  toolbarPosition!: string;

  @Prop({
    type: Number,
    default: 0,
  })
  defaultIndex!: number;

  @Prop({
    type: Array,
    default: [],
  })
  columns!: Column[];

  simple: any = true;
  children!: Vue[];

  get classPrefix() {
    return classPrefix;
  }

  beforeCreate() {
    this.children = [];
  }

  //hooks
  mounted() {
    this.onColumnsChanged(this.columns);
  }

  //methods
  noop() {
    // empty method
  }

  @Watch('columns')
  onColumnsChanged(newVal?: Column[]) {
    const columns = newVal || [];
    this.simple = columns.length && !columns[0].values;
    this.children = this.$refs.columns as Vue[];

    if (Array.isArray(this.children) && this.children.length) {
      this.setColumns().catch(() => {});
    }
  }

  setColumns() {
    const columns = this.simple ? [{ values: this.columns }] : this.columns;
    const stack = columns.map((column: Column, index: number) =>
      this.setColumnValues(index, column.values)
    );
    return Promise.all(stack);
  }

  emit(type: 'cancel' | 'confirm') {
    if (this.simple) {
      this.$emit(type, {
        value: this.getColumnValue(0),
        index: this.getColumnIndex(0),
      });
    } else {
      this.$emit(type, {
        value: this.getValues(),
        index: this.getIndexes(),
      });
    }
  }

  onChange(index: number) {
    if (this.simple) {
      this.$emit('change', {
        value: this.getColumnValue(0),
        index: this.getColumnIndex(0),
      });
    } else {
      this.$emit('change', {
        value: this.getValues(),
        index
      });
    }
  }

  // get column instance by index
  getColumn(index: number) {
    return this.children[index];
  }

  // get column value by index
  getColumnValue(index: number) {
    const column: any = this.getColumn(index);
    return column && column.getValue();
  }

  // set column value by index
  setColumnValue(index: number, value: any) {
    const column: any = this.getColumn(index);

    if (column == null) {
      return Promise.reject(new Error('setColumnValue: 对应列不存在'));
    }

    return column.setValue(value);
  }

  // get column option index by column index
  getColumnIndex(columnIndex: number) {
    return ((this.getColumn(columnIndex) || {}) as any).currentIndex;
  }

  // set column option index by column index
  setColumnIndex(columnIndex: number, optionIndex: number) {
    const column: any = this.getColumn(columnIndex);

    if (column == null) {
      return Promise.reject(new Error('setColumnIndex: 对应列不存在'));
    }

    return column.setIndex(optionIndex);
  }

  // get options of column by index
  getColumnValues(index: number) {
    return ((this.children[index] || {}) as any).options;
  }

  // set options of column by index
  setColumnValues(index: number, options: any[], needReset = true) {
    const column: any = this.children[index];

    if (column == null) {
      return Promise.reject(new Error('setColumnValues: 对应列不存在'));
    }

    const isSame = JSON.stringify(column.options) === JSON.stringify(options);

    if (isSame) {
      return Promise.resolve();
    }

    return column.setThen({ options }).then(() => {
      if (needReset) {
        column.setIndex(0);
      }
    });
  }

  // get values of all columns
  getValues() {
    return this.children.map(
      (child: any) => child.getValue()
    );
  }

  // set values of all columns
  setValues(values: any[] = []) {
    const stack = values.map((value, index) =>
      this.setColumnValue(index, value)
    );
    return Promise.all(stack);
  }

  // get indexes of all columns
  getIndexes(): number[] {
    return this.children.map(
      (child: any) =>
        child.currentIndex
    );
  }

  // set indexes of all columns
  setIndexes(indexes: number[]) {
    const stack = indexes.map((optionIndex, columnIndex) =>
      this.setColumnIndex(columnIndex, optionIndex)
    );
    return Promise.all(stack);
  }

  isSimple(columns: Column[]) {
    return columns.length && !columns[0].values;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-picker/iox-picker.less';

</style>