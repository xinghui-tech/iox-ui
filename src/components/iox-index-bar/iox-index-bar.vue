<template>
  <view
    :class="mainClass"
    :style="mainStyle"
  >
    <slot />

    <view
      v-if="showSidebar"
      :class="[uuidSidebarClass, 'iox-index-bar__sidebar']"
      @touchmove.stop="onTouchMove"
      @touchend="onTouchStop"
      @touchcancel="onTouchStop"
    >
      <view
        v-for="(item, index) in indexList"
        :key="index"
        class="iox-index-bar__index"
        :style="'z-index: ' + (zIndex + 1) + '; color: ' + (activeAnchorIndex === index ? highlightColor : '')"
        :data-index="index"
        @tap="onClick(index)"
      >
        {{ item }}
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { nextSequence } from '../../utils/utils';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Base from '../../mixins/base';
import pagescroll from '../../mixins/page-scroll';
import { GREEN } from '../../utils/color';

type IPageScrollOption = WechatMiniprogram.Page.IPageScrollOption;

const indexList = () => {
  const indexList: string[] = [];
  const charCodeOfA = 'A'.charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }

  return indexList;
};

const PageScroll = pagescroll(function (this: Vue, event?: IPageScrollOption) {
  (this as any).scrollTop = event!.scrollTop || 0;
  (this as any).onScroll(event);
});

const classPrefix = 'iox-index-bar';
@Component({
  name: 'iox-index-bar'
})
export default class IoxIndexBar extends mixins(Base, PageScroll) {
  @Prop({
    type: Boolean,
    default: true,
  })
  sticky!: boolean;

  @Prop({
    type: Number,
    default: 1
  })
  zIndex?: number;

  @Prop({
    type: String,
    default: GREEN
  })
  highlightColor!: string;

  @Prop({
    type: Number,
    default: 0
  })
  stickyOffsetTop!: number;

  @Prop({
    type: Array,
    default: () => indexList(),
  })
  indexList!: string[];

  // data
  scrollTop = 0;
  children!: Vue[];
  timer?: number;
  sidebar: {height: number; top: number} = {height: 0, top: 0};
  showSidebar = false;
  height = 0;
  top = 0;
  scrollToAnchorIndex: number | null = null;
  activeAnchorIndex = -1;

  uuidClass = `${this.classPrefix}__uuid${nextSequence()}`;
  uuidSidebarClass = `${this.classPrefix}__sidebar__uuid${nextSequence()}`;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.uuidClass} ${this.classPrefix} ${this._rootClasses}`;
  }

  created() {
    this.scrollTop = 0;
    this.children = [];
    this.$on('anchor-attached', (anchor: Vue) => {
      this.children.push(anchor);
      (anchor as any).parent = this;
      (anchor as any).index = this.children.length - 1;
      this.updateData();
    });
    this.$on('anchor-detached', (anchor: Vue) => {
      const index: number = (anchor as any).index;
      this.children = this.children.filter((c: any) => c.index !== index)
        .map((c: any, i) => {
          c.index = i;
          return c;
        }
      );
      this.updateData();
    });
  }

  updateData() {
    this.$nextTick(() => {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.showSidebar = !!this.children.length;
      this.timer = setTimeout(() => {
        this.setRect().then(() => {
          this.onScroll();
        });
      }, 0);
    });
  }

  setRect() {
    return Promise.all([
      this.setAnchorsRect(),
      this.setListRect(),
      this.setSiderbarRect(),
    ]);
  }

  setAnchorsRect() {
    return Promise.all(
      this.children.map((anchor: Vue) => {
        let selector = '.iox-index-anchor-wrapper';
        // #ifdef MP-ALIPAY
        selector = `.${this.uuidClass}`;
        // #endif
        return  (anchor as Base).getRect(selector)
          .then(rect => {
            (anchor as any).height = (rect as UniApp.NodeInfo).height;
            (anchor as any).top = (rect as UniApp.NodeInfo).top! + this.scrollTop;
          }
        );
      })
    );
  }

  setListRect() {
    let selector = '.iox-index-bar';
    // #ifdef MP-ALIPAY
    selector = `.${this.uuidClass}`;
    // #endif
    return this.getRect(selector).then(
      (rect) => {
        this.height = (rect as UniApp.NodeInfo).height!;
        this.top = (rect as UniApp.NodeInfo).top! + this.scrollTop;
      }
    );
  }

  setSiderbarRect() {
    let selector = '.iox-index-bar__sidebar';
    // #ifdef MP-ALIPAY
    selector = `.${this.uuidSidebarClass}`;
    // #endif
    return this.getRect(selector).then((rect) => {
      this.sidebar = {
        height: (rect as UniApp.NodeInfo).height!,
        top: (rect as UniApp.NodeInfo).top!,
      };
    });
  }

  setDiffData({ target, data }: {target: Base; data: any}) {
    const diffData: any = {};

    Object.keys(data).forEach((key) => {
      if ((target as any)[key] !== data[key]) {
        diffData[key] = data[key];
      }
    });

    if (Object.keys(diffData).length) {
      target.setThen(diffData);
    }
  }

  getAnchorRect(anchor: Base) {
    let selector = '.iox-index-anchor-wrapper';
    // #ifdef MP-ALIPAY
    selector = `.${(anchor as any).uuidClass}`;
    // #endif
    return anchor.getRect(selector)
      .then((rect) => ({
        height: (rect as UniApp.NodeInfo).height,
        top: (rect as UniApp.NodeInfo).top,
      }));
  }

  getActiveAnchorIndex() {
    const { children, scrollTop } = this;
    const { sticky, stickyOffsetTop } = this;

    for (let i = this.children.length - 1; i >= 0; i--) {
      const c: any = children[i];
      const preAnchorHeight = i > 0 ? (children[i] as any).height : 0;
      const reachTop = sticky ? preAnchorHeight + stickyOffsetTop : 0;

      if (reachTop + scrollTop >= c.top) {
        return i;
      }
    }

    return -1;
  }

  onScroll() {
    const { children = [], scrollTop } = this;

    if (!children.length) {
      return;
    }

    const { sticky, stickyOffsetTop, zIndex, highlightColor } = this;

    const active = this.getActiveAnchorIndex();

    this.setDiffData({
      target: this,
      data: {
        activeAnchorIndex: active,
      },
    });

    if (sticky) {
      let isActiveAnchorSticky = false;

      if (active !== -1) {
        isActiveAnchorSticky = (children[active] as any).top <= stickyOffsetTop + scrollTop;
      }

      children.forEach((item, index) => {
        if (index === active) {
          let wrapperStyle = '';
          let anchorStyle = `
            color: ${highlightColor};
          `;

          if (isActiveAnchorSticky) {
            wrapperStyle = `
              height: ${(children[index] as any).height}px;
            `;

            anchorStyle = `
              position: fixed;
              top: ${stickyOffsetTop}px;
              z-index: ${zIndex};
              color: ${highlightColor};
            `;
          }

          this.setDiffData({
            target: item as Base,
            data: {
              active: true,
              anchorStyle,
              wrapperStyle,
            },
          });
        } else if (index === active - 1) {
          const currentAnchor: any = children[index];

          const currentOffsetTop = currentAnchor.top;
          const targetOffsetTop = index === children.length - 1 ? this.top
              : (children[index + 1] as any).top;

          const parentOffsetHeight = targetOffsetTop - currentOffsetTop;
          const translateY = parentOffsetHeight - currentAnchor.height;

          const anchorStyle = `
            position: relative;
            transform: translate3d(0, ${translateY}px, 0);
            z-index: ${zIndex};
            color: ${highlightColor};
          `;

          this.setDiffData({
            target: item as Base,
            data: {
              active: true,
              anchorStyle,
            },
          });
        } else {
          this.setDiffData({
            target: item as Base,
            data: {
              active: false,
              anchorStyle: '',
              wrapperStyle: '',
            },
          });
        }
      });
    }
  }

  onClick(index: number) {
    this.scrollToAnchor(index);
  }

  onTouchMove(event: TouchEvent) {
    const sidebarLength = this.children.length;
    const touch = event.touches[0];
    const itemHeight = this.sidebar.height / sidebarLength;
    let index = Math.floor((touch.clientY - this.sidebar.top) / itemHeight);

    if (index < 0) {
      index = 0;
    } else if (index > sidebarLength - 1) {
      index = sidebarLength - 1;
    }

    this.scrollToAnchor(index);
  }

  onTouchStop() {
    this.scrollToAnchorIndex = null;
  }

  scrollToAnchor(index: number) {
    if (typeof index !== 'number' || this.scrollToAnchorIndex === index) {
      return;
    }

    this.scrollToAnchorIndex = index;

    const anchor = this.children.find((item: any) =>
        item.anchor === this.indexList[index]
    );

    if (anchor) {
      (anchor as any).scrollIntoView(this.scrollTop);
      this.$emit('select', (anchor as any).anchor);
    }
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-index-bar/iox-index-bar.less';

</style>