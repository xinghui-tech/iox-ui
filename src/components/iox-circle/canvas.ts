type CanvasContext = WechatMiniprogram.CanvasContext;

export default function adaptor(
  ctx: CanvasRenderingContext2D
): CanvasContext & CanvasRenderingContext2D {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return Object.assign(ctx, {
    setStrokeStyle(val: any) {
      ctx.strokeStyle = val;
    },
    setLineWidth(val: any) {
      ctx.lineWidth = val;
    },
    setLineCap(val: any) {
      ctx.lineCap = val;
    },
    setFillStyle(val: any) {
      ctx.fillStyle = val;
    },
    setFontSize(val: any) {
      ctx.font = String(val);
    },
    setGlobalAlpha(val: any) {
      ctx.globalAlpha = val;
    },
    setLineJoin(val: any) {
      ctx.lineJoin = val;
    },
    setTextAlign(val: any) {
      ctx.textAlign = val;
    },
    setMiterLimit(val: any) {
      ctx.miterLimit = val;
    },
    setShadow(offsetX: number, offsetY: number, blur: any, color: any) {
      ctx.shadowOffsetX = offsetX;
      ctx.shadowOffsetY = offsetY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = color;
    },
    setTextBaseline(val: any) {
      ctx.textBaseline = val;
    },
    createCircularGradient() {},
    draw() {},
  });
}
