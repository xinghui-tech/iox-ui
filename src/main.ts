import esverify from './utils/es-shim';
import Vue from 'vue';

import App from './App.vue';
import { VueApp } from 'vue/types/vue';

Vue.config.productionTip = false;

// es shim info
esverify();

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
