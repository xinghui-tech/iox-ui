import Vue from 'vue';
import { logger } from '@zhuyin/common';

import App from './App.vue';
import { VueApp } from 'vue/types/vue';

Vue.config.productionTip = false;

/* init front sdk */
// logger level
logger.level = process.env.NODE_ENV === 'development' ? 'VERBOSE' : 'WARN';

// $app() mixin
Vue.mixin({
  methods: {
    $app(): VueApp {
      return app as VueApp;
    },
  }
});

const app = new App();

app.$mount();
