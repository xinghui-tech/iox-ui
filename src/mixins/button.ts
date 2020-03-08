import Vue from 'vue';

export default Vue.extend({
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    businessId: Number,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    ariaLabel: String
  }
});
