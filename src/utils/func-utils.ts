
// Hooks a provider up with a reactive source, so the provider is reactive.
// See https://vuejs.org/v2/guide/reactivity.html#How-Changes-Are-Tracked.
export function makeReactive(target: any, source: any,
  keys?: string | string[] | {[key: string]: string}): any {
  let map: {[k: string]: string} = {};
  if (keys) {
    if (typeof keys === 'string') {
      // string
      map[keys] = keys;
    } else if (Array.isArray(keys)){
      // array
      keys.map(k => {
        map[k] = k;
      });
    } else {
      // object
      map = {...keys};
    }
  } else {
    // all properties
    Object.keys(source).forEach(k => {
      map[k] = k;
    });
  }

  Object.keys(map).forEach(k => {
    const prop = map[k];
    Object.defineProperty(target, prop, {
      enumerable: true,
      get: () => source[k],
      set: (val) => { source[k] = val; },
    });
  });
  return target;
}

const globalFunctions: Record<keyof any, Function> = {};
let seq = 0;
export function wrapFunc(func: Function): string {
  const ref = `__fuc_r${seq++}`;

  globalFunctions[ref] = func;

  return ref;
}

export function extractFunc(ref: string): Function {
  return globalFunctions[ref];
}

export function releaseFunc(ref?: string | null): void {
  if (!ref) {
    return;
  }
  delete globalFunctions[ref];
} 
