<template>
  <view :class="mainClass" :style="mainStyle">
    <iox-sticky
      :disabled="!sticky"
      :z-index="zIndex"
      :offset-top="offsetTop"
      :container="container"
      @scroll="onTouchScroll"
    >
      <view :class="[bem('tabs__wrap', { scrollable }), (type === 'line' && border ? 'iox-hairline--top-bottom' : '' )]">
        <slot name="nav-left" />

        <scroll-view
          :scroll-x="scrollable"
          scroll-with-animation
          :scroll-left="scrollLeft"
          :class="navWrapClasses"
          :style="color ? 'border-color: ' + color : ''"
        >
          <view :class="navClasses"
            :style="'' + tabCardTypeBorderStyle(color, type)">
            <view v-if="type === 'line'" class="iox-tabs__line" :style="lineStyle" />
            <view
              v-for="(item, index) in tabs"
              :key="index"
              :data-index="index"
              :class="[tabClasses(index === currentIndex, ellipsis), uuidTabClass, bem('tabs__tab', { active: index === currentIndex, disabled: item.disabled, complete: !ellipsis })]"
              :style="'' + tabStyle(index === currentIndex, ellipsis, color, type, item.disabled, titleActiveColor, titleInactiveColor, swipeThreshold, scrollable)"
              @tap="onTap"
            >
              <view :class="ellipsis ? 'iox-ellipsis' : ''" :style="item.titleStyle">
                {{ item.title }}
                <iox-info
                  v-if="item.info !== null || item.dot"
                  :info="item.info"
                  :dot="item.dot"
                  custom-class="iox-tabs__tab__title__info"
                />
              </view>
            </view>
          </view>
        </scroll-view>

        <slot name="nav-right" />
      </view>
    </iox-sticky>

    <view
      class="iox-tabs__content"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <view
        :class="[bem('tabs__track', [{ animated }]), 'iox-tabs__track']"
        :style="'' + trackStyles({ duration, currentIndex, animated })"
      >
        <slot />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import Touch from '../../mixins/touch';
import { isDef, addUnit, nextSequence } from '../../utils/utils';
import { wrapFunc, releaseFunc } from '../../utils/func-utils';


const classPrefix = 'iox-tabs';
@Component({
  name: 'iox-tabs',
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['nav-class', 'nav-wrap-class', 'tab-class', 'tab-active-class', 'line-class', 'custom-class'],
  // #endif
})
export default class IoxTabs extends mixins(Base, Touch) {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  navClass?: string;

  @Prop({type: String})
  navWrapClass?: string;

  @Prop({type: String})
  tabClass?: string;

  @Prop({type: String})
  tabActiveClass?: string;

  @Prop({type: String})
  lineClass?: string;
  // #endif

  @Prop({
    type: Boolean,
  })
  sticky?: boolean;

  @Prop({
    type: Boolean,
  })
  border?: boolean;

  @Prop({
    type: Boolean,
  })
  swipeable?: boolean;

  @Prop({
    type: String,
  })
  titleActiveColor?: string;

  @Prop({
    type: String,
  })
  titleInactiveColor?: string;

  @Prop({
    type: String,
  })
  color?: string;

  @Prop({
    type: Boolean,
  })
  animated?: boolean;

  @Prop({
    type: Number,
    default: 40,
  })
  lineWidth!: number;

  @Prop({
    type: [Number, String],
    default: -1,
  })
  lineHeight!: number | string;

  @Prop({
    type: [String, Number],
    default: 0,
  })
  active!: string | number;

  @Prop({
    type: String,
    default: 'line',
  })
  // line or card
  type!: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  ellipsis!: boolean;

  @Prop({
    type: Number,
    default: 0.3,
  })
  duration!: number;

  @Prop({
    type: Number,
    default: 1,
  })
  zIndex!: number;

  @Prop({
    type: Number,
    default: 5,
  })
  swipeThreshold!: number

  @Prop({
    type: Number,
    default: 0,
  })
  offsetTop!: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  lazyRender!: boolean;

  tabs: any[] = [];
  lineStyle = '';
  scrollLeft = 0;
  scrollable = false;
  trackStyle = '';
  currentIndex: number | null = null;
  container: string | null = null;
  children!: Vue[];

  uuidClass = `${this.classPrefix}__uuid${nextSequence()}`;
  uuidTabClass = `${this.classPrefix}__tab__uuid${nextSequence()}`;
  uuidNavClass = `${this.classPrefix}__nav__uuid${nextSequence()}`;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes = this.bem('tabs', [this.type]);
    return `${this.uuidClass} ${classes} ${this._rootClasses}`;
  }

  get navClasses() {
    let cls = 'nav-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.navClass || '');
    // #endif

    return `${this.uuidNavClass} ${this.bem('tabs__nav', [this.type, { complete: !this.ellipsis }])} ${cls}`;
  }

  get navWrapClasses() {
    let cls = 'nav-wrap-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.navWrapClass || '');
    // #endif

    return `${this.bem('tabs__scroll', [this.type])} ${cls}`;
  }

  get lineClasses() {
    let cls = 'line-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.lineClass || '');
    // #endif

    return cls;
  }

  @Watch('color')
  onColorChanged() {
    this.setLine();
  }

  @Watch('animated')
  onAnimatedChanged() {
    this.children.forEach((child: Vue, index: number) =>
      (child as any).updateRender(index === this.currentIndex, this)
    );
  }

  @Watch('lineWidth')
  @Watch('lineHeight')
  onLineWHChanged() {
    this.setLine();
  }

  @Watch('active')
  onActiveChanged(newVal: string | number) {
    if (newVal !== this.getCurrentName()) {
      this.setCurrentIndexByName(newVal);
    }
  }

  @Watch('swipeThreshold')
  onSwipeThresholdChanged(newVal: number) {
    if (newVal !== this.getCurrentName()) {
      this.scrollable = this.children.length > newVal || !this.ellipsis;
    }
  }

  created() {
    this.children = [];
    this.$on('tab-attached', (tab: Vue) => {
      this.children.push(tab);
      (tab as any).index = this.children.length - 1;
      this.updateTabs();
    });
    this.$on('tab-detached', (tab: Vue) => {
      const index: number = (tab as any).index;
      this.children = this.children.filter((c: any) => c.index !== index)
        .map((c: any, i) => {
          c.index = i;
          return c;
        }
      );
      this.updateTabs();
    });
  }

  mounted() {
    this.$nextTick(() => {
      this.setLine();
      this.scrollIntoView();
    });
  }

  updateContainer() {
    if (this.container) {
      releaseFunc(this.container);
    }
    let selector = '.iox-tabs';
    // #ifdef MP-ALIPAY
    selector = `.${this.uuidClass}`;
    // #endif

    this.container = wrapFunc(() => {
      let c: UniApp.NodesRef;
      // #ifdef MP-ALIPAY
      c = uni.createSelectorQuery().in(this).select(selector);
      // #endif
      // #ifdef MP-ALIPAY
      c = uni.createSelectorQuery().in(this).select(selector);
      // #endif
      return c;
    });
  }

  updateTabs() {
    const { children = [] } = this;
    this.tabs = children.map((child: any) => {
      const {dot, info, title, disabled, titleStyle} = child;

      return {dot, info, title, disabled, titleStyle};
    });
    this.scrollable = this.children.length > this.swipeThreshold || !this.ellipsis,

    this.setCurrentIndexByName(this.getCurrentName() || this.active);
  }

  trigger(eventName: string, child?: Vue) {
    const { currentIndex } = this;

    const currentChild: any = child || this.children[currentIndex || 0];

    if (!isDef(currentChild)) {
      return;
    }

    this.$emit(eventName, {
      index: currentChild.index,
      name: currentChild.computedName,
      title: currentChild.title,
    });
  }

  onTap(event: Event) {
    const { index } = (event.currentTarget as any).dataset;
    const child: any = this.children[index];

    if (child.disabled) {
      this.trigger('disabled', child);
    } else {
      this.setCurrentIndex(index);
      this.$nextTick(() => {
        this.trigger('click');
      });
    }
  }

  // correct the index of active tab
  setCurrentIndexByName(name: string | number) {
    const { children = [] } = this;
    const matched = children.filter(
      (child: Vue) => (child as any).computedName === name
    );

    if (matched.length) {
      this.setCurrentIndex((matched[0] as any).index);
    }
  }

  setCurrentIndex(currentIndex: number) {
    const { children = [] } = this;

    if (!isDef(currentIndex) || currentIndex >= children.length || currentIndex < 0) {
      return;
    }

    children.forEach((item: any, index: number) => {
      const active = index === currentIndex;
      if (active !== item.active || !item.inited) {
        item.updateRender(active, this);
      }
    });

    if (currentIndex === this.currentIndex) {
      return;
    }

    const shouldEmitChange = this.currentIndex !== null;
    this.currentIndex = currentIndex;

    this.$nextTick(() => {
      this.setLine();
      this.scrollIntoView();
      this.updateContainer();

      this.trigger('input');
      if (shouldEmitChange) {
        this.trigger('change');
      }
    });
  }

  getCurrentName() {
    const activeTab: any = this.children[this.currentIndex || 0];

    if (activeTab) {
      return activeTab.computedName;
    }
  }

  setLine(skipTransition?: boolean) {
    if (this.type !== 'line') {
      return;
    }

    const {
      color,
      duration,
      currentIndex,
      lineWidth,
      lineHeight,
    } = this;

    let selector = '.iox-tabs__tab';
    // #ifdef MP-ALIPAY
    selector = `.${this.uuidTabClass}`;
    // #endif

    this.getRect(selector, true).then(
      (rects: UniApp.NodeInfo | UniApp.NodeInfo[] = []) => {
        const rect = (rects as UniApp.NodeInfo[])[currentIndex || 0];
        if (rect == null) {
          return;
        }
        const height = lineHeight !== -1 ?
            `height: ${addUnit(lineHeight)}; border-radius: ${addUnit(lineHeight)};`
            : '';

        let left = (rects as UniApp.NodeInfo[]).slice(0, currentIndex||0)
                        .reduce((prev, curr) => prev + curr.width!, 0);

        left += (rect.width! - lineWidth) / 2;

        const transition = skipTransition ? ''
          : `transition-duration: ${duration}s; -webkit-transition-duration: ${duration}s;`;

        this.lineStyle = `
          ${height}
          width: ${addUnit(lineWidth)};
          background-color: ${color};
          -webkit-transform: translateX(${left}px);
          transform: translateX(${left}px);
          ${transition}
        `;
      }
    );
  }

  // scroll active tab into view
  scrollIntoView() {
    const { currentIndex, scrollable } = this;

    if (!scrollable) {
      return;
    }

    let tabSelector = '.iox-tabs__tab';
    // #ifdef MP-ALIPAY
    tabSelector = `.${this.uuidTabClass}`;
    // #endif

    let navSelector = '.iox-tabs__nav';
    // #ifdef MP-ALIPAY
    navSelector = `.${this.uuidNavClass}`;
    // #endif

    Promise.all([
      this.getRect(tabSelector, true),
      this.getRect(navSelector),
    ]).then(
      ([tabRects, navRect]: [
        UniApp.NodeInfo | UniApp.NodeInfo[],
        UniApp.NodeInfo | UniApp.NodeInfo[]
      ]) => {
        const tabRect = (tabRects as UniApp.NodeInfo[])[currentIndex || 0];
        const offsetLeft = (tabRects as UniApp.NodeInfo[]).slice(0, currentIndex || 0)
          .reduce((prev, curr) => prev + curr.width!, 0);

        this.scrollLeft = offsetLeft - ((navRect as UniApp.NodeInfo).width! - (tabRect as UniApp.NodeInfo).width!) / 2;
      }
    );
  }

  onTouchScroll(event: TouchEvent) {
    this.$emit('scroll', event.detail);
  }

  onTouchStart(event: TouchEvent) {
    if (!this.swipeable) return;

    this.touchStart(event);
  }

  onTouchMove(event: TouchEvent) {
    if (!this.swipeable) return;

    this.touchMove(event);
  }

  // watch swipe touch end
  onTouchEnd() {
    if (!this.swipeable) return;

    const { direction, deltaX, offsetX } = this;
    const minSwipeDistance = 50;

    if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
      const index = this.getAvaiableTab(deltaX);
      if (index !== -1) {
        this.setCurrentIndex(index);
      }
    }
  }

  getAvaiableTab(direction: number) {
    // eslint-disable-next-line prefer-const
    let { tabs, currentIndex } = this;
    const step = direction > 0 ? -1 : 1;

    currentIndex = currentIndex || 0;
    for (
      let i = step;
      currentIndex + i < tabs.length && currentIndex + i >= 0;
      i += step
    ) {
      const index = currentIndex + i;

      if (index >= 0 && index < tabs.length && tabs[index] && !tabs[index].disabled) {
        return index;
      }
    }

    return -1;
  }

  tabClasses(active?: boolean, ellipsis?: boolean) {
    const classes: string[] = [];
    // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
    classes.push('tab-class');
    // #endif
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    classes.push(this.tabClass || '');
    // #endif

    if (active) {
      // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
      classes.push('tab-active-class');
      // #endif
      // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
      classes.push(this.tabActiveClass || '');
      // #endif
    }

    if (ellipsis) {
      classes.push('iox-ellipsis');
    }

    return classes.join(' ');
  }

  tabStyle(
    active?: boolean,
    ellipsis?: boolean,
    color?: string,
    type?: string,
    disabled?: boolean,
    activeColor?: string,
    inactiveColor?: string,
    swipeThreshold = 5,
    scrollable?: boolean
  ) {
    const styles = [];
    const isCard = type === 'card';
    // card theme color
    if (color && isCard) {
      styles.push('border-color:' + color);

      if (!disabled) {
        if (active) {
          styles.push('background-color:' + color);
        } else {
          styles.push('color:' + color);
        }
      }
    }

    const titleColor = active ? activeColor : inactiveColor;
    if (titleColor) {
      styles.push('color:' + titleColor);
    }

    if (scrollable && ellipsis) {
      styles.push('flex-basis:' + 88 / swipeThreshold + '%');
    }

    return styles.join(';');
  }

  tabCardTypeBorderStyle(color?: string, type?: string) {
    const isCard = type === 'card';
    const styles = [];
    if (isCard && color) {
      styles.push('border-color:' + color);
    }
    return styles.join(';');
  }

  trackStyles(data: any) {
    if (!data.animated) {
      return '';
    }

    return [
      'transform: translate3d(' + -100 * data.currentIndex + '%, 0, 0)',
      '-webkit-transition-duration: ' + data.duration + 's',
      'transition-duration: ' + data.duration + 's'
    ].join(';');
  }

  destroy() {
    if (this.container) {
      releaseFunc(this.container);
    }
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-tabs/iox-tabs.less';

</style>