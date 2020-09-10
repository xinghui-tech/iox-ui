<script lang="ts">
import Vue from "vue";
import { logger } from "@zhuyin/common";
import defaultConfig from "./config";


export default Vue.extend({
  mpType: 'app',
  globalData: {
    config: defaultConfig
  },
  onLaunch(options: App.LaunchShowOption) {
    const fontUrl = `${defaultConfig.urls.baseResUrl}/assets/fonts/fontawesome-webfont.woff`;
    wx.loadFontFace({
      global: true,
      family: 'FontAwesome',
      source: `url("${fontUrl}")`,
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
page {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 0 0 100rpx;
  color: #323233;
  font-size: 16px;
  background: #f7f8fa;
  -webkit-font-smoothing: antialiased;
}

.demo-margin-left {
  margin-left: 10px;
}

.demo-margin-right {
  margin-right: 10px;
}

.demo-margin-bottom {
  display: block;
  margin-bottom: 15px;
}
</style>
