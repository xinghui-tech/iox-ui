<template>
  <view :class="mainClass" :style="mainStyle">
    <view
      v-for="(item, index) in itemListData"
      :key="index"
      :class="[bem('dropdown-menu__item', { disabled: item.disabled })]"
      @tap="onTitleTap(index)"
    >
      <view
        :class="[item.titleClass, bem('dropdown-menu__title', { active: item.showPopup, down: item.showPopup === (direction === 'down') })]"
        :style="item.showPopup ? 'color:' + activeColor : ''"
      >
        <view class="iox-ellipsis">
          {{ displayTitle(item) }}
        </view>
      </view>
    </view>

    <slot />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';
import { addUnit } from '../../utils/utils';

let Menus: IoxDrowdownMenu[] = [];

const classPrefix = 'iox-dropdown-menu';
@Component({
  name: 'iox-dropdown-menu',
  behaviors: ['uni://form-field'],
})
export default class IoxDrowdownMenu extends mixins(Base, Emitter) {
  @Prop({
    type: String,
  })
  activeColor?: string;

  @Prop({
    type: Boolean,
    default: true
  })
  overlay!: boolean;

  @Prop({
    type: Number,
    default: 10,
  })
  zIndex!: number;

  @Prop({
    type: Number,
    default: 200,
  })
  duration!: number;

  @Prop({
    type: String,
    default: 'down',
  })
  direction!: 'up' | 'down';

  @Prop({
    type: Boolean,
    default: true,
  })
  closeOnClickOverlay!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  closeOnClickOutside!: boolean;

  itemListData: any[] = [];
  children!: Vue[];
  windowHeight: number|undefined = 0;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.classPrefix} ${this.classPrefix}--top-bottom`;
  }

  beforeCreate() {
    Menus.push(this);
  }

  destroyed() {
    Menus = Menus.filter((item) => item !== this);
  }

  created() {
    const { windowHeight } = wx.getSystemInfoSync();
    this.windowHeight = windowHeight;

    this.children = [];
    this.$on('item-attached', (item: Vue) => {
      this.children.push(item);
      (item as any).parent = this;
      (item as any).index = this.children.length - 1;
      (item as any).updateDataFromParent();
      this.updateItemListData();
    });
    this.$on('item-detached', (item: Vue) => {
      const index: number = (item as any).index;
      this.children = this.children.filter((c: any) => c.index !== index)
        .map((c: any, i) => {
          c.index = i;
          return c;
        }
      );
      this.updateItemListData();
    });
  }

  updateItemListData() {
    this.itemListData = this.children.map((child: any) => {
      const { title, value, options, titleClass, disabled, showPopup } = child;

      return { title, value, options, titleClass, disabled, showPopup };
    });
  }

  @Watch('activeColor')
  @Watch('overlay')
  @Watch('duration')
  @Watch('direction')
  @Watch('closeOnClickOverlay')
  updateChildrenData() {
    this.children.forEach((child: Vue) => {
      (child as any).updateDataFromParent();
    });
  }

  toggleItem(active: number) {
    this.children.forEach((item: any, index: number) => {
      const { showPopup } = item;
      if (index === active) {
        item.toggle();
      } else if (showPopup) {
        item.toggle(false, { immediate: true });
      }
    });
  }

  close() {
    this.children.forEach((child: any) => {
      child.toggle(false, { immediate: true });
    });
  }

  onTitleTap(index: number) {
    const child: any = this.children[index];

    if (!child.disabled) {
      Menus.forEach((menuItem) => {
        if ( menuItem && menuItem.closeOnClickOutside && menuItem !== this ) {
          menuItem.close();
        }
      });

      this.toggleItem(index);
    }
  }

  getChildWrapperStyle() {
    const { zIndex, direction } = this;

    return this.getRect('.iox-dropdown-menu').then(
      (rect) => {
        const { top = 0, bottom = 0 } = rect as NodeInfo;
        const offset = direction === 'down' ? bottom : this.windowHeight! - top;

        let wrapperStyle = `z-index: ${zIndex};`;

        if (direction === 'down') {
          wrapperStyle += `top: ${addUnit(offset)};`;
        } else {
          wrapperStyle += `bottom: ${addUnit(offset)};`;
        }

        return wrapperStyle;
      }
    );
  }

  displayTitle(item: any) {
    if (item.title) {
      return item.title;
    }

    const match = item.options.filter((option: any) => {
      return option.value === item.value;
    });
    const displayTitle = match.length ? match[0].text : '';
    return displayTitle;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-dropdown-menu/iox-dropdown-menu.less';

</style>