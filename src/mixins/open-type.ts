import Vue from 'vue';

export default Vue.extend({
  props: {
    openType: {
      type: String,
    },
  },
  methods: {
    onGetUserInfo(event: CustomEvent<WechatMiniprogram.GetUserInfoSuccessCallbackResult>) {
      this.$emit('getuserinfo', event);
    },

    onContact(event: CustomEvent<any>) {
      this.$emit('contact', event);
    },

    onGetPhoneNumber(event: CustomEvent<any>) {
      this.$emit('getphonenumber', event);
    },

    onError(event: CustomEvent<any>) {
      this.$emit('error', event);
    },

    onLaunchApp(event: CustomEvent<any>) {
      this.$emit('launchapp', event);
    },

    onOpenSetting(event: CustomEvent<WechatMiniprogram.OpenSettingSuccessCallbackResult>) {
      this.$emit('opensetting', event);
    },
  }
});
