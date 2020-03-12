<script lang="ts">
import Vue from "vue";
import { logger } from "@zhuyin/common";


export default Vue.extend({
  mpType: 'app',
  globalData: {
  },
  onLaunch(options: App.LaunchShowOption) {
    wx.loadFontFace({
      global: true,
      family: 'FontAwesome',
      source: 'url("https://w-test.zhuyin.club/assets/fonts/fontawesome-webfont.woff")',
      success: console.log,
      fail: console.warn
    });
    logger.log("App Launch");
  },
  onShow() {
    logger.log("App Show");
  },
  onHide() {
    logger.log("App Hide");
  },
  onPageNotFound(options: App.PageNotFoundOption) {
    logger.warn(`page not found: ${options.path}/${options.query}`);
  },
  computed: {
  },
  watch: {
  },
  methods: {
  }
});
</script>

<style lang="less">
/*每个页面公共css */
@import 'style/index.less';

</style>
