<template>
  <view :class="mainClass" :style="mainStyle" >
    <scroll-view scroll-y class="iox-tree-select__nav">
      <iox-sidebar :active-key="mainActiveIndex" @change="onClickNav" custom-class="iox-tree-select__nav__inner">
        <iox-sidebar-item
          v-for="(item, index) in items"
          :key="index"
          :custom-class="mainItemClasses"
          :active-class="mainActiveClasses"
          :disabled-class="mainDisabledClasses"
          :badge="item.badge"
          :dot="item.dot"
          :title="item.text"
          :disabled="item.disabled"
        />
      </iox-sidebar>
    </scroll-view>
    <scroll-view scroll-y class="iox-tree-select__content">
      <slot name="content" />
      <view
        v-for="(item, index) in subItems"
        :key="index"
        :class="['iox-ellipsis', contentItemClasses, bem('tree-select__item', { active: isActive(activeId, item.id), disabled: item.disabled }), isActive(activeId, item.id) ? contentActiveClasses : '', item.disabled ? contentDisabledClasses : '' ]"
        data-item="item"
        @tap="onSelectItem(item)"
      >
        {{ item.text }}
        <iox-icon
          v-if="isActive(activeId, item.id)"
          :name="selectedIcon"
          size="16px"
          class="iox-tree-select__selected"
        />
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { addUnit } from '../../utils/utils';

const classPrefix = 'iox-tree-select';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: [
    'main-item-class',
    'content-item-class',
    'main-active-class',
    'content-active-class',
    'main-disabled-class',
    'content-disabled-class',
  ],
  // #endif
})
export default class IoxTreeSelect extends mixins(Base) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  mainItemClass?: string;

  @Prop({type: String})
  contentItemClass?: string;

  @Prop({type: String})
  mainActiveClass?: string;

  @Prop({type: String})
  contentActiveClass?: string;

  @Prop({type: String})
  mainDisabledClass?: string;

  @Prop({type: String})
  contentDisabledClass?: string;
  // #endif

  @Prop({
    type: Array,
  })
  items!: any[];

  @Prop({
    type: [Number, String, Array],
  })
  activeId?: number | string | (number|string)[];

  @Prop({
    type: Number,
    default: 0,
  })
  mainActiveIndex!: number;

  @Prop({
    type: [Number, String],
    default: 300,
  })
  height!: number | string;

  @Prop({
    type: Number,
    default: Infinity,
  })
  max!: number;

  @Prop({
    type: String,
    default: 'check',
  })
  selectedIcon!: string;

  subItems: any[] = [];

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    return `height: ${ addUnit(this.height) } ${this._rootStyles}`;
  }

  get mainItemClasses() {
    let cls = 'main-item-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.mainItemClass || '');
    // #endif

    return cls;
  }

  get mainActiveClasses() {
    let cls = 'main-active-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.mainActiveClass || '');
    // #endif

    return cls;
  }

  get contentItemClasses() {
    let cls = `content-item-class`;
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.contentItemClass || '');
    // #endif

    return cls;
  }

  get contentActiveClasses() {
    let cls = `content-active-class`;
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.contentActiveClass || '');
    // #endif

    return cls;
  }

  get contentDisabledClasses() {
    let cls = 'content-disabled-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.contentDisabledClass || '');
    // #endif

    return cls;
  }

  get mainDisabledClasses() {
    let cls = 'main-disabled-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.mainDisabledClass || '');
    // #endif

    return cls;
  }

  created() {
    this.updateSubItems();
  }

  // 当一个子项被选择时
  onSelectItem(item: any) {
    const isArray = Array.isArray(this.activeId);
    // 判断有没有超出右侧选择的最大数
    const isOverMax = isArray && (this.activeId as (string|number)[]).length >= this.max;
    // 判断该项有没有被选中, 如果有被选中，则忽视是否超出的条件
    const isSelected = isArray ? (this.activeId as (string|number)[]).indexOf(item.id) > -1
      : this.activeId === item.id;

    if (!item.disabled && (!isOverMax || isSelected)) {
      this.$emit('click-item', item);
    }
  }

  // 当一个导航被点击时
  onClickNav(index: number) {
    const item = this.items[index];
    if (!item.disabled) {
      this.$emit('click-nav', index);
    }
  }

  // 更新子项列表
  @Watch('items')
  @Watch('mainActiveIndex')
  updateSubItems() {
    const { items, mainActiveIndex } = this;
    const { children = [] } = items[mainActiveIndex] || {};

    return this.subItems = children;
  }

  isActive(activeList: any, itemId: any) {
    if (Array.isArray(activeList)) {
      return activeList.indexOf(itemId) > -1;
    }

    return activeList === itemId;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-tree-select/iox-tree-select.less';

</style>