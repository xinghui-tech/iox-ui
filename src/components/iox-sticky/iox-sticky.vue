<template>
  <view :class="mainClass"
    :style="mainStyle">
    <view :class="wrapClass"
      :style="wrapStyle">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import { nextSequence } from '../../utils/utils';
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import pagescroll from '../../mixins/page-scroll';
import { extractFunc } from '../../utils/func-utils';

type IPageScrollOption = WechatMiniprogram.Page.IPageScrollOption;

const PageScroll = pagescroll(function (this: Vue, event?: IPageScrollOption) {
  if ((this as any).scrollTop !== null) {
    return;
  }
  (this as any).onScroll(event);
});

const classPrefix = 'iox-sticky';
// FIXME for uniapp framework, page which using iox-sticky must have function onPageScroll() {}.
@Component
export default class IoxSticky extends mixins(Base, PageScroll) {

  @Prop({
    type: Number,
    default: 99,
  })
  zIndex!: number;

  @Prop({
    type: Number,
    default: 0,
  })
  offsetTop!: number;

  @Prop({
    type: Boolean,
  })
  disabled?: boolean;

  @Prop({
    type: String,
    default: null
  })
  container?: string;

  @Prop({
    type: Number,
    default: null
  })
  scrollTop?: number | null;

  // data
  height = 0;
  fixed = false;
  transform = 0;
  currentScrollTop: null | number = null;

  uuidClass = `${this.classPrefix}__uuid${nextSequence()}`;

  get classPrefix() {
    return classPrefix;
  }

  get mainStyle() {
    const { fixed, height, zIndex } = this;
    return `${this.containerStyle({ fixed, height, zIndex })} ${this._rootStyles}`;
  }

  get mainClass() {
    return `${this.uuidClass} ${this.classPrefix} ${this._rootClasses}`;
  }

  get wrapClass() {
    return this.bem('sticky-wrap', { fixed: this.fixed });
  }

  get wrapStyle() {
    const { fixed, offsetTop, transform, zIndex} = this;
    return this.wrapStyles({ fixed, offsetTop, transform, zIndex });
  }

  mounted() {
    this.onScroll();
  }

  @Watch('offsetTop')
  @Watch('disabled')
  @Watch('container')
  onScrollerChanged() {
    this.onScroll();
  }

  @Watch('scrollTop')
  onScrollTopChanged(val: number) {
    this.onScroll({ scrollTop: val });
  }

  onScroll(val: any = {}) {
    const { scrollTop } = val;
    const { container, offsetTop, disabled } = this;

    if (disabled) {
      this.setDataAfterDiff({
        fixed: false,
        transform: 0,
      });
      return;
    }

    this.currentScrollTop = scrollTop || this.currentScrollTop;

    let selector = '.iox-sticky';
    // #ifdef MP-ALIPAY
    selector = `.${this.uuidClass}`;
    // #endif

    if (container) {
      Promise.all([this.getRect(selector), this.getContainerRect()]).then(
        ([root, container]) => {
          if (offsetTop + (root as UniApp.NodeInfo).height! > container.height! + container.top!) {
            this.setDataAfterDiff({
              fixed: false,
              transform: container.height! - (root as UniApp.NodeInfo).height!,
            });
          } else if (offsetTop >= (root as UniApp.NodeInfo).top!) {
            this.setDataAfterDiff({
              fixed: true,
              height: (root as UniApp.NodeInfo).height,
              transform: 0,
            });
          } else {
            this.setDataAfterDiff({ fixed: false, transform: 0 });
          }
        }
      );

      return;
    }


    this.getRect(selector).then(root => {
      if (offsetTop >= (root as UniApp.NodeInfo).top!) {
        this.setDataAfterDiff({ fixed: true, height: (root as UniApp.NodeInfo).height! });
        this.transform = 0;
      } else {
        this.setDataAfterDiff({ fixed: false });
      }
    });
  }

  setDataAfterDiff(data: any) {
    this.$nextTick(() => {
      const diff = Object.keys(data).reduce((prev: any, key) => {
        if (data[key] !== (this as any)[key]) {
          prev[key] = data[key];
        }

        return prev;
      }, {});

      for (const key in diff) {
        if (Object.prototype.hasOwnProperty.call(diff, key)) {
          (this as any)[key] = diff[key];
        }
      }

      this.$emit('scroll', {
        scrollTop: this.scrollTop,
        isFixed: data.fixed || this.fixed,
      });
    });
  }

  getContainerRect(): Promise<UniApp.NodeInfo> {
    if (!this.container) {
      return Promise.reject('no container.');
    }
    const nodesRef: UniApp.NodesRef = extractFunc(this.container)();

    return new Promise((resolve) =>
      nodesRef.boundingClientRect(()=>{}).exec(resolve)
    );
  }

  wrapStyles(data: any) {
    let style = '';

    if (data.transform) {
      style += 'transform: translate3d(0, ' + data.transform + 'px, 0);';
    }

    if (data.fixed) {
      style += 'top: ' + data.offsetTop + 'px;';
    }

    if (data.zIndex) {
      style += 'z-index: ' + data.zIndex + ';';
    }

    return style;
  }

  containerStyle(data: any) {
    let style = '';

    if (data.fixed) {
      style += 'height: ' + data.height + 'px;';
    }

    if (data.zIndex) {
      style += 'z-index: ' + data.zIndex + ';';
    }

    return style;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-sticky/iox-sticky.less';

</style>