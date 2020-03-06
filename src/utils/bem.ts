const PREFIX = 'iox-';

function join(name: string, mods: (string|number)[]) {
  name = PREFIX + name;
  mods = mods.map(function (mod) {
    return name + '--' + mod;
  });
  mods.unshift(name);
  return mods.join(' ');
}

function traversing(mods: (string|number)[], conf?: any) {
  if (!conf) {
    return;
  }

  if (typeof conf === 'string' || typeof conf === 'number') {
    mods.push(conf);
  } else if (Array.isArray(conf)) {
    conf.forEach(function (item) {
      traversing(mods, item);
    });
  } else if (typeof conf === 'object') {
    Object.keys(conf).forEach(function (key) {
      conf[key] && mods.push(key);
    });
  }
}

function bem(name: string, conf?: any) {
  const mods: (string|number)[] = [];
  traversing(mods, conf);
  return join(name, mods);
}

export default bem;
