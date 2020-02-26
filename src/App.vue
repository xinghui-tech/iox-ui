<script lang="ts">
import Vue from "vue";
import { logger } from "@zhuyin/common";


export default Vue.extend({
  mpType: 'app',
  globalData: {
  },
  onLaunch(options: App.LaunchShowOption) {
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

<style>
/*每个页面公共css */
</style>
