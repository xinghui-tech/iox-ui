<template>
  <iox-transition
    name="slide-down"
    :show="isShow"
    custom-class="iox-notify__container"
    :custom-style="'z-index:'+zIndex+';top:'+[addUnit(top)]+';'"
    @tap="onTap"
  >
    <view
      :class="['iox-notify' , 'iox-notify--'+type]"
      :style="'background:'+background+';color:'+color+';'"
    >
      <view
        v-if="safeAreaInsetTop"
        :style="'height:'+statusBarHeight+'px;'"
      />
      <text>{{ message }}</text>
    </view>
  </iox-transition>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { addUnit } from '../../utils/utils';
import { WHITE } from '../../utils/color';

declare namespace NotifyOptions {
  type show= boolean
  type type= 'primary' | 'success' | 'danger' | 'warning'
  type color= string
  type zIndex= number
  type top= number
  type message= string
  type duration= number
  type background= string
  type safeAreaInsetTop= boolean
}

const classPrefix = 'iox-notify';
@Component
export default class IoxNotify extends mixins(Base) {

  @Prop({
    type: Boolean,
  })
  show?: NotifyOptions.show;

  @Prop() message?: string;
  @Prop() background?: string;
  @Prop() top?: NotifyOptions.top;

  @Prop({
    type: String,
    default: 'danger',
  })
  type?: NotifyOptions.type;

  @Prop({
    type: String,
    default: WHITE,
  })
  color?: NotifyOptions.color;

  @Prop({
    type: Number,
    default: 3000,
  })
  duration?: NotifyOptions.duration;

  @Prop({
    type: Number,
    default: 110,
  })
  zIndex?: NotifyOptions.zIndex;

  @Prop({
    type: Boolean,
    default: false,
  })
  safeAreaInsetTop?: NotifyOptions.safeAreaInsetTop;



  isShow = false;
  statusBarHeight = 0;
  timer?: number;


  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.classPrefix} custom-class`;
  }

  @Watch('show')
  onShowChanged(newVal: boolean) {
    this.isShow = newVal;
  }

  @Watch('isShow')
  onIsShowChanged(newVal: boolean, oldVal: boolean) {
    if (newVal === oldVal) {
      return;
    }

    if (newVal) {
      this.showFun();
    } else {
      // clear timer
      this.hideFun();
    }
  }

  created() {
    const { statusBarHeight } = wx.getSystemInfoSync();
    this.statusBarHeight = statusBarHeight;
  }

  mounted() {
    const { statusBarHeight } = wx.getSystemInfoSync();
    this.statusBarHeight = statusBarHeight;
  }

  protected addUnit(values: string | number | null, unit = 'px'): string | undefined  {
    return addUnit(values);
  }

  showFun() {
    const { duration } = this as any;
    clearTimeout(this.timer);
    this.$emit('opened');
    if (duration > 0 && duration !== Infinity) {
      this.timer = setTimeout(() => {
        this.hideFun();
      }, duration);
    }
  }

  hideFun() {
    clearTimeout(this.timer);
    this.$emit('close');
  }

  onTap(event: TouchEvent) {
    this.$emit('click', event);
  }


}
</script>

<style lang="less">
@import '../../style/widget/iox-notify/iox-notify.less';

</style>