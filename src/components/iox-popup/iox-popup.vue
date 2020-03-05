<template>
  <iox-overlay
    v-if="overlay"
    :show="show"
    :z-index="zIndex"
    :custom-style="overlayStyle"
    :duration="duration"
    @click="onClickOverlay"
  >
    <view
      v-if="inited"
      :class="mainClass"
      :style="mainStyle"
      @transitionend="onTransitionEnd"
    >
      <slot />
      <iox-icon
        v-if="closeable"
        :name="closeIcon"
        :class="spinnerClass"
        @tap="onClickCloseIcon"
      />
    </view>
  </iox-overlay>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import * as utils from '../../utils/utils';
import bem from '../../utils/bem';
import base, { props } from '../../mixins/base';
import transition from '../../mixins/transition';

import ioxOverlay from '@/components/iox-overlay/iox-overlay.vue';
import ioxIcon from '@/components/iox-icon/iox-icon.vue';



const classPrefix = 'iox-popup';
@Component({
  mixins: [props],
  components: {
    ioxOverlay,
    ioxIcon
  }
})
export default class Ioxpopup extends mixins(base,transition) {
  classes: String[] = [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class'
  ]

  @Prop({
    type:Boolean,
    default:null
  })
  round!:boolean;

  @Prop({
    type:Boolean,
    default:null
  })
  closeable!:boolean;

  @Prop({
    type:String,
    default:''
  })
  overlayStyle!:string;

  @Prop({
    type:String,
    default:''
  })
  transition!:string;
  @Watch('transition')
  transitionChange(newVal?:any,oldVal?:any){
    this.observeClass()
  }

  @Prop({
    type:Number,
    default:100
  })
  zIndex!:number;

  @Prop({
    type:Boolean,
    default:true
  })
  overlay!:boolean;

  @Prop({
    type:String,
    default:'cross'
  })
  closeIcon!:string;

  @Prop({
    type:String,
    default:'top-right'
  })
  closeIconPosition!:string;

  @Prop({
    type:Boolean,
    default:true
  })
  closeOnClickOverlay!:boolean;

  @Prop({
    type:String,
    default:'center'
  })
  position!:string;
  @Watch('position')
  positionChange(newVal?:any,oldVal?:any){
    this.observeClass()
  }

  @Prop({
    type:Boolean,
    default:true
  })
  safeAreaInsetBottom!:boolean;

  @Prop({
    type:Boolean,
    default:false
  })
  safeAreaInsetTop!:boolean;


  get utils() {
    return utils;
  }
  get bem() {
    return bem;
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.customClass || ''} ${this.classes} ${bem('popup', [this.position, { round: this.round, safe: this.safeAreaInsetBottom, safeTop: this.safeAreaInsetTop }])}`;
  }

  get mainStyle() {
    return `${'z-index:'+  this.zIndex + '-webkit-transition-duration:'+ this.currentDuration + 'ms'} ${'transition-duration:'+ this.currentDuration + 'ms'} ${this.display ? '' : 'display: none;'} ${this.customStyle}`;
  }

  get spinnerClass() {
    return `${this.classPrefix + '__close-icon'} ${this.classPrefix + '__close-icon--'+this.closeIconPosition} `;
  }

  private created() {
    this.observeClass();
  }


  onClickCloseIcon() {
    this.$emit('close');
  }

  onClickOverlay() {
    this.$emit('click-overlay');

    if (this.closeOnClickOverlay) {
      this.$emit('close');
    }
  }

  observeClass() {
    const transition = this.transition;
    const position= this.position;

    const updateData: { [key: string]: any } = {
      name: transition || position
    };

    if (transition === 'none') {
      updateData.duration = 0;
      this.duration = updateData.duration;
    }

    this.name = updateData.name;
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-popup/iox-popup.less';

</style>