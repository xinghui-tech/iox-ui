
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
export function wrapFunc(func: Function): symbol {
  const ref = Symbol();

  (globalFunctions as any)[ref] = func;

  return ref;
}

export function extractFunc(ref: symbol): Function {
  return (globalFunctions as any)[ref];
}

export function releaseFunc(ref: symbol): void {
  delete (globalFunctions as any)[ref];
} 
