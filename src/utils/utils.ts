export function isDef(value: any): boolean {
  return value !== undefined && value !== null;
}

export function isObj(x: any): boolean {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function isNumber(value: string) {
  return /^\d+(\.\d+)?$/.test(value);
}

export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function nextTick(fn: Function) {
  setTimeout(() => {
    fn();
  }, 1000 / 30);
}

let systemInfoCache: WechatMiniprogram.GetSystemInfoSyncResult;
export function getSystemInfoSync(): WechatMiniprogram.GetSystemInfoSyncResult {
  if (!systemInfoCache) {
    systemInfoCache = wx.getSystemInfoSync();
  }

  return systemInfoCache;
}

export function addUnit(value?: string | number | null): string | undefined {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumber(value) ? `${value}px` : value;
}

export function compareVersion(v1: string, v2: string) {
  const vr1 = v1.split('.');
  const vr2 = v2.split('.');
  const len = Math.max(vr1.length, vr2.length);

  while (vr1.length < len) {
    vr1.push('0');
  }
  while (vr2.length < len) {
    vr2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(vr1[i]);
    const num2 = parseInt(vr2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

export function requestAnimationFrame(cb: Function) {
  const systemInfo = getSystemInfoSync();

  if (systemInfo.platform === 'devtools') {
    return nextTick(cb);
  }

  return uni
    .createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(() => {
      cb();
    });
}