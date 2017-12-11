function deepMerge(target, source) {
  if (typeof(target) !== 'object' || typeof(source) !== 'object') {
    return source;
  }

  const keys = Object.keys(source);
  const result = Object.keys(target).reduce((p, n) => {
    if (keys.indexOf(n) === -1) {
      p[n] = target[n];
    }
    return p;
  }, {});
  for (let key of keys) {
    if (typeof(target[key]) === 'object' && typeof(source[key]) === 'object') {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

export default deepMerge;
