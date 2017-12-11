const PREFIX = '_';

class Lazy {
  constructor(params) {
    Object.entries(params).map(([ key, val ]) => {
      this.setFunc(key, val);
    });
  }

  setFunc(key, defaultVal) {
    this[PREFIX + key] = defaultVal;
    this[key] = (val) => {
      if (typeof(val) !== 'undefined') {
        this[PREFIX + key] = val;
        return this;
      }
      return this[PREFIX + key];
    };
  }
}

export default Lazy;
