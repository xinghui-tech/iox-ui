import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class OpenType extends Vue {
  @Prop({
    type: String,
  })
  openType?: string;

  onGetUserInfo(event: CustomEvent<WechatMiniprogram.GetUserInfoSuccessCallbackResult>) {
    this.$emit('getuserinfo', event.detail);
  }

  onContact(event: CustomEvent<any>) {
    this.$emit('contact', event.detail);
  }

  onGetPhoneNumber(event: CustomEvent<any>) {
    this.$emit('getphonenumber', event.detail);
  }

  onError(event: CustomEvent<any>) {
    this.$emit('error', event.detail);
  }

  onLaunchApp(event: CustomEvent<any>) {
    this.$emit('launchapp', event.detail);
  }

  onOpenSetting(event: CustomEvent<WechatMiniprogram.OpenSettingSuccessCallbackResult>) {
    this.$emit('opensetting', event.detail);
  }
}
