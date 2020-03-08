<template>
  <view>
    <iox-overlay
      v-if="overlay"
      :show="show"
      :z-index="zIndex"
      :custom-style="overlayStyle"
      :duration="duration"
      @click="onClickOverlay"
    />
    <view
      v-if="transitionInited"
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
  </view>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import * as utils from "../../utils/utils";
import bem from "../../utils/bem";
import Base from "../../mixins/base";
import transition, { Duration } from "../../mixins/transition";

type Transition = string | boolean | { type: string; duration: Duration };

const classPrefix = "iox-popup";
@Component
export default class Ioxpopup extends mixins(Base, transition) {
  // props
  @Prop({
    type: Boolean,
    default: false
  })
  show!: boolean;

  @Prop({
    type: Boolean,
    default: false
  })
  round!: boolean;

  @Prop({
    type: Boolean,
    default: false
  })
  closeable!: boolean;

  @Prop({
    type: String,
    default: ""
  })
  overlayStyle!: string;

  @Prop({
    type: [String, Boolean, Object],
    default: "fade"
  })
  transition!: Transition;

  @Prop({
    type: Number,
    default: 100
  })
  zIndex!: number;

  @Prop({
    type: Boolean,
    default: true
  })
  overlay!: boolean;

  @Prop({
    type: String,
    default: "cross"
  })
  closeIcon!: string;

  @Prop({
    type: String,
    default: "top-right"
  })
  closeIconPosition!: string;

  @Prop({
    type: Boolean,
    default: true
  })
  closeOnClickOverlay!: boolean;

  @Prop({
    type: String,
    default: "center"
  })
  position!: string;

  @Prop({
    type: Boolean,
    default: true
  })
  safeAreaInsetBottom!: boolean;

  @Prop({
    type: Boolean,
    default: false
  })
  safeAreaInsetTop!: boolean;

  // watchs
  @Watch("show")
  showChanged(newVal: boolean, oldVal: boolean) {
    this.showTransition = newVal;
  }

  @Watch("transition")
  transitionChanged(newVal?: Transition, oldVal?: Transition) {
    this._updateTransition();
  }

  @Watch("position")
  positionChanged(newVal?: any, oldVal?: any) {
    this._updateTransition();
  }

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
    const classes = bem("popup", [
      this.position,
      {
        round: this.round,
        safe: this.safeAreaInsetBottom,
        safeTop: this.safeAreaInsetTop
      }
    ]);
    return `custom-class ${this.customClass || ''} ${classes} ${this.transitionClasses}`;
  }

  get mainStyle() {
    return (
      `z-index: ${this.zIndex}; -webkit-transition-duration: ${this.transitionCurrentDuration}ms; transition-duration: ${this.transitionCurrentDuration}ms;`
      + `${this.transitionDisplay ? "" : "display: none;"} ${this.customStyle}`
    );
  }

  get spinnerClass() {
    return `${this.classPrefix + "__close-icon"} ${this.classPrefix
      + "__close-icon--"
      + this.closeIconPosition} `;
  }

  protected created() {
    // init transition
    this._updateTransition();
  }

  private _updateTransition() {
    const show = this.show;

    // old
    let type = this.transitionType;
    let duration = this.transitionDuration;

    const newVal = this.transition;
    if (newVal === false) {
      duration = 0;
      type = this.position;
    } else if (newVal === true) {
      // default
      duration = 300;
      type = this.position;
    } else if (typeof newVal === "string") {
      duration = 300;
      type = newVal;
    } else if (typeof newVal === "object") {
      type = newVal.type;
      duration = newVal.duration;
    }
    this.transitionType = type;
    this.transitionDuration = duration;
    this.showTransition = show;
  }

  onClickCloseIcon() {
    this.$emit("close");
  }

  onClickOverlay() {
    this.$emit("click-overlay");

    if (this.closeOnClickOverlay) {
      this.$emit("close");
    }
  }
}
</script>

<style lang="less">
@import "../../style/widget/iox-popup/iox-popup.less";
</style>
