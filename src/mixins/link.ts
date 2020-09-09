import Vue from 'vue';

export default Vue.extend({
  props: {
    url: String,
    linkType: {
      type: String,
      default: 'navigateTo',
    },
  },
  methods: {
    jumpLink(urlKey = 'url') {
      const url = (this as any)[urlKey];
      if (url) {
        (wx as any)[this.linkType]({ url });
      }
    },
  },
});