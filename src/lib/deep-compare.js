function deepCompare(a, b) {
  if (typeof(a) !== typeof(b)) {
    return false;
  }
  if (typeof(a) === 'object') {
    if (!a || !b) {
      return a === b;
    }
    if (Array.isArray(a) ^ Array.isArray(b)) {
      return false;
    }
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (let k of keysA) {
      if (!deepCompare(a[k], b[k])) {
        return false;
      }
    }
  } else {
    return a === b;
  }
  return true;
}

export default deepCompare;