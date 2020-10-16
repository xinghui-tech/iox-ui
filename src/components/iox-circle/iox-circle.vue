<template>
  <view :class="mainClass" :style="mainStyle">
    <canvas class="iox-circle__canvas" :type="type" 
      :style="canvasStyle"
      canvas-id="iox-circle" />
    <view v-if="!text" class="iox-circle__text">
      <slot></slot>
    </view>
    <cover-view v-else class="iox-circle__text">{{ text }}</cover-view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { BLUE, WHITE } from '../../utils/color';
import { getSystemInfoSync, addUnit, isObj } from '../../utils/utils';
import adaptor from './canvas';

type CanvasContext = UniApp.CanvasContext;

function format(rate: number) {
  return Math.min(Math.max(rate, 0), 100);
}
const PERIMETER = 2 * Math.PI;
const BEGIN_ANGLE = -Math.PI / 2;
const STEP = 1;

const classPrefix = 'iox-circle';
@Component
export default class IoxCircle extends mixins(Base) {
  @Prop({
    type: String,
  })
  text?: string;

  @Prop({
    type: String,
    default: 'round'
  })
  lineCap!: "butt" | "round" | "square";

  @Prop({
    type: Number,
    default: 0,
  })
  value!: number;

  @Prop({
    type: Number,
    default: 50,
  })
  speed!: number;

  @Prop({
    type: Number,
    default: 100,
  })
  size!: number;

  @Prop({
    type: String,
  })
  fill?: string;

  @Prop({
    type: String,
    default: WHITE,
  })
  layerColor!: string;

  @Prop({
    type: [String, Object],
    default: BLUE,
  })
  color!: string | Record<string, string>;

  @Prop({
    type: String,
    default: '',
  })
  type!: string;

  @Prop({
    type: Number,
    default: 4,
  })
  strokeWidth!: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  clockwise!: boolean;

  currentValue = this.value;
  hoverColor: string | Record<string, string> | CanvasGradient = BLUE;
  inited = false;
  interval?: number | null;

  get classPrefix() {
    return classPrefix;
  }

  get canvasStyle() {
    return `width: ${ addUnit(this.size) }; height: ${ addUnit(this.size) }`;
  }

  //hooks
  created() {
    this.currentValue = this.value;
    this.$nextTick(() => {
      this.setHoverColor().then(() => {
        this.drawCircle(this.currentValue);
      });
    });
  }

  destroyed() {
    this.clearInterval();
  }

  getContext() {
    const { type, size } = this;

    if (type === '') {
      const ctx = uni.createCanvasContext('iox-circle', this);
      return Promise.resolve(ctx);
    }

    const dpr = getSystemInfoSync().pixelRatio;

    return new Promise<CanvasContext & CanvasRenderingContext2D>((resolve) => {
      uni.createSelectorQuery()
        .in(this)
        .select('.iox-circle__canvas')
        .fields({node: true} as any, () => {})
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext(type);
    
          if (!this.inited && canvas.height === size && canvas.width === size) {
            this.inited = true;
            canvas.height = size * dpr;
            canvas.width = size * dpr;
            ctx.scale(dpr, dpr);
          }
    
          resolve(adaptor(ctx));
        });
    });
  }

  @Watch('color')
  setHoverColor() {
    const { color, size } = this;

    if (isObj(color)) {
      return this.getContext().then(context => {
        const LinearColor = (context as any).createLinearGradient(size, 0, 0, 0);
        Object.keys(color)
          .sort((a, b) => parseFloat(a) - parseFloat(b))
          .map((key) =>
            LinearColor.addColorStop(parseFloat(key) / 100, (color as any)[key])
          );
        this.hoverColor = LinearColor;
      });
    }

    this.hoverColor = color;
    return Promise.resolve();
  }

  presetCanvas(context: CanvasContext | (CanvasContext & CanvasRenderingContext2D), 
    strokeStyle: any, beginAngle: any, endAngle: any, fill?: any) {
    const { strokeWidth, lineCap, clockwise, size } = this;
    const position = size / 2;
    const radius = position - strokeWidth / 2;

    context.setStrokeStyle(strokeStyle);
    context.setLineWidth(strokeWidth);
    context.setLineCap(lineCap);

    context.beginPath();
    context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
    context.stroke();

    if (fill) {
      context.setFillStyle(fill);
      context.fill();
    }
  }

  renderLayerCircle(context: CanvasContext | (CanvasContext & CanvasRenderingContext2D)) {
    const { layerColor, fill } = this;
    this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
  }

  renderHoverCircle(context: CanvasContext | (CanvasContext & CanvasRenderingContext2D),
    formatValue: number) {
    const { clockwise } = this;
    // 结束角度
    const progress = PERIMETER * (formatValue / 100);
    const endAngle = clockwise ? BEGIN_ANGLE + progress
      : 3 * Math.PI - (BEGIN_ANGLE + progress);

    this.presetCanvas(context, this.hoverColor, BEGIN_ANGLE, endAngle);
  }

  @Watch('size')
  onSizeChanged(val: number) {
    this.drawCircle(val);
  }

  drawCircle(currentValue: number) {
    const { size } = this;

    this.getContext().then((context) => {
      context.clearRect(0, 0, size, size);
      this.renderLayerCircle(context);

      const formatValue = format(currentValue);
      if (formatValue !== 0) {
        this.renderHoverCircle(context, formatValue);
      }

      context.draw();
    });
  }

  @Watch('value')
  reRender() {
    // tofector 动画暂时没有想到好的解决方案
    const { value, speed } = this;

    if (speed <= 0 || speed > 1000) {
      this.drawCircle(value);
      return;
    }

    this.clearInterval();
    this.currentValue = this.currentValue || 0;
    this.interval = setInterval(() => {
      if (this.currentValue !== value) {
        if (this.currentValue < value) {
          this.currentValue += STEP;
        } else {
          this.currentValue -= STEP;
        }
        this.drawCircle(this.currentValue);
      } else {
        this.clearInterval();
      }
    }, 1000 / speed);
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  toJSON() {
    // console.log('toJSON(): should not be invoked. fix debug exception from UNIAPP.');
    return 'iox-circle';
  }
  // #endif
}
</script>

<style lang="less">
@import '../../style/widget/iox-circle/iox-circle.less';

</style>