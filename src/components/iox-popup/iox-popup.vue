<template>
  <block>
    <iox-overlay
      v-if="overlay"
      :show="show"
      :z-index="zIndex"
      :custom-style="overlayStyle"
      :duration="duration"
      @click="onClickOverlay"
    />
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
  </block>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import Base from "../../mixins/base";
import { transition } from "../../mixins/transition";

const classPrefix = "iox-popup";
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class',
    'close-icon-class',
    'custom-class'
  ]
  // #endif
})
export default class IoxPopup extends mixins(Base, transition(false)) {
  // props
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
    type: String,
  })
  transition?: string;

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
    default: "close"
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

  // data
  originDuration?: number | null = null;

  // watchs
  @Watch("transition")
  transitionChanged(newVal?: string, oldVal?: string) {
    this._updateTransition();
  }

  @Watch("position")
  positionChanged(newVal?: string, oldVal?: string) {
    this._updateTransition();
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes = this.bem("popup", [
      this.position,
      {
        round: this.round,
        safe: this.safeAreaInsetBottom,
        safeTop: this.safeAreaInsetTop
      }
    ]);
    return `custom-class ${this.classes} ${classes}`;
  }

  get mainStyle() {
    return `z-index: ${this.zIndex}; -webkit-transition-duration: ${this.currentDuration}ms; transition-duration: ${this.currentDuration}ms;`
      + `${this.display ? "" : "display: none;"} ${this.customStyle || ''}`;
  }

  get spinnerClass() {
    return `${this.classPrefix}__close-icon ${this.classPrefix}__close-icon--${this.closeIconPosition}`;
  }

  protected created() {
    // init transition
    this._updateTransition();
  }

  private _updateTransition() {
      const { transition, position, duration } = (this as any);

      const updateData: { [key: string]: any } = {
        name: transition || position,
      };

      if (transition === 'none') {
        updateData.duration = 0;
        this.originDuration = duration;
      } else if (this.originDuration != null) {
        updateData.duration = this.originDuration;
      }

      for (const key in updateData) {
        if (Object.prototype.hasOwnProperty.call(updateData, key)) {
          (this as any)[key] = updateData[key];
        }
      }
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
