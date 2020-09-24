<template>
  <view
    v-if="showWrapper"
    :class="mainClass"
    :style="mainStyle"
  >
    <iox-popup
      :show="showPopup"
      :custom-style="'position: absolute; ' + popupStyle"
      overlay-style="position: absolute;"
      :overlay="overlay"
      :position="direction === 'down' ? 'top' : 'bottom'"
      :duration="transition ? duration : 0"
      :close-on-click-overlay="closeOnClickOverlay"
      @enter="onOpen"
      @leave="onClose"
      @close="toggle"
      @after-enter="onOpened"
      @after-leave="onClosed"
    >
      <iox-cell
        v-for="item in options"
        :key="item.value"
        :class="[bem('dropdown-item__option', { active: item.value === value } )]"
        clickable
        :icon="item.icon"
        @tap="onOptionTap(item)"
      >
        <view
          slot="title"
          class="iox-dropdown-item__title"
          :style="item.value === value  ? 'color:' + activeColor : ''"
        >
          {{ item.text }}
        </view>
        <iox-icon
          v-if="item.value === value"
          name="check"
          class="iox-dropdown-item__icon"
          :color="activeColor"
        />
      </iox-cell>

      <slot />
    </iox-popup>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Model, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Emitter from '../../mixins/emitter';

type Option = {
  icon?: string;
  value: any;
  text: string;
};

const classPrefix = 'iox-dropdown-item';
@Component({
  name: 'iox-dropdown-item',
  behaviors: ['uni://form-field'],
})
export default class IoxDropdownItem extends mixins(Base, Emitter) {
  @Model('change', { type: [String, Number] })
  readonly value?: string | number;

  @Prop({
    type: String,
  })
  title?: string;

  @Prop({
    type: Boolean,
  })
  disabled?: boolean;

  @Prop({
    type: String,
  })
  titleClass?: string;

  @Prop({
    type: Array,
    default: [],
  })
  options!: Option[];

  @Prop({
    type: String,
  })
  popupStyle?: string;

  transition = true;
  showPopup = false;
  showWrapper = false;
  displayTitle = '';
  direction: 'up' | 'down' = 'down';
  parent?: Vue;
  wrapperStyle = '';

  overlay = true;
  duration = 200;
  activeColor: string | null = null;
  closeOnClickOverlay = true;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes = this.bem('dropdown-item', this.direction);
    return `custom-class ${classes}`;
  }

  get mainStyle() {
    return `${this.wrapperStyle} ${this.customStyle || ''}`;
  }

  @Watch('value')
  @Watch('title')
  @Watch('titleClass')
  @Watch('options')
  rerender() {
    this.$nextTick(() => {
      this.parent && (this.parent as any).updateItemListData();
    });
  }

  updateDataFromParent() {
    if (this.parent) {
      const {
        overlay,
        duration,
        activeColor,
        closeOnClickOverlay,
        direction,
      } = this.parent as any;
      this.overlay = overlay;
      this.duration = duration;
      this.activeColor = activeColor;
      this.closeOnClickOverlay = closeOnClickOverlay;
      this.direction = direction;
    }
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
    this.showWrapper = false;
  }

  onOptionTap(option: Option) {
    const { value } = option;

    const shouldEmitChange = this.value !== value;
    if (shouldEmitChange) {
      this.$emit('input', value);
      this.$emit('change', value);
    }

    this.showPopup = false;
    this.$emit('close');

    this.rerender();
  }

  toggle(show: boolean, options: {immediate?: boolean} = {}) {
    const { showPopup } = this;

    if (typeof show !== 'boolean') {
      show = !showPopup;
    }

    if (show === showPopup) {
      return;
    }

    this.transition = !options.immediate;
    this.showPopup = show;

    if (show) {
      (this.parent as any).getChildWrapperStyle().then((wrapperStyle: string) => {
        this.wrapperStyle = wrapperStyle;
        this.showWrapper = true;
        this.rerender();
      });
    } else {
      this.rerender();
    }
  }

  beforeMount() {
    this.$$dispatch('iox-dropdown-menu', 'item-attached', this);
  }

  destroyed() {
    this.$$dispatch('iox-dropdown-menu', 'item-detached', this);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-dropdown-item/iox-dropdown-item.less';

</style>