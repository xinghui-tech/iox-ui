import Vue from 'vue';

type IPageScrollOption = WechatMiniprogram.Page.IPageScrollOption;
type Scroller = (event?: IPageScrollOption) => void;
type TrivialInstance = WechatMiniprogram.Page.TrivialInstance & {
  ioxPageScroller?: Scroller[];
};

function getCurrentPage(): TrivialInstance {
  const pages = getCurrentPages();
  return (pages[pages.length - 1] as any) || ({} as TrivialInstance);
}

function onPageScroll(event?: IPageScrollOption) {
  const { ioxPageScroller = [] } = getCurrentPage();

  ioxPageScroller.forEach((scroller: Scroller) => {
    if (typeof scroller === 'function') {
      scroller(event);
    }
  });
}

export default (scroller: Scroller) => {
  return Vue.extend({
    mounted() {
      const page = getCurrentPage();

      if (Array.isArray(page.ioxPageScroller)) {
        page.ioxPageScroller.push(scroller.bind(this));
      } else {
        page.ioxPageScroller = typeof page.onPageScroll === 'function' ?
            [page.onPageScroll.bind(page), scroller.bind(this)]
            : [scroller.bind(this)];
      }

      page.onPageScroll = onPageScroll;
    },
    destroyed() {
      const page = getCurrentPage();
      page.ioxPageScroller = (page.ioxPageScroller || []).filter(
        (item: any) => item !== scroller
      );
    },
  });
};
