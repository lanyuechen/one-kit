class PolyFit {
  constructor(arr, m) {
    const x = [], y = [];
    arr.map(d => {
      x.push(d[0]);
      y.push(d[1]);
    });
    this.x = x;
    this.y = y;
    this.m = m;
    this.xAvg = PolyFit.average(x);
    this.poly = PolyFit.fit(x, y, arr.length, [], m);
  }

  /**
   * 函数功能：最小二乘法曲线拟合
   * 方程:Y = a(0) + a(1) * (X - X1) + a(2) * (X - X1)^2 + ... + a(m) * (X - X1)^m X1为X的平均数
   * @param x 实型一维数组,长度为 n. 存放给定 n 个数据点的 X 坐标
   * @param y 实型一维数组,长度为 n.存放给定 n 个数据点的 Y 坐标
   * @param n 变量。给定数据点的个数
   * @param a 实型一维数组，长度为 m.返回 m-1 次拟合多项式的 m 个系数
   * @param m 拟合多项式的项数，即拟合多项式的最高次数为 m-1. 要求 m<=n 且m<=20。若 m>n 或 m>20，
   * 则本函数自动按 m=min{n,20} 处理.
   * @return 多项式系数存储数组
   */
  static fit(x, y, n, a, m) {
    var i, j, k;
    var z, p, c, g, q = 0, d1, d2;
    var s = new Array(20);
    var t = new Array(20);
    var b = new Array(20);
    var dt = new Array(3);
    for (i = 0; i <= m - 1; i++) {
      a[i] = 0.0;
    }
    if (m > n) {
      m = n;
    }
    if (m > 20) {
      m = 20;
    }
    z = 0.0;
    for (i = 0; i <= n - 1; i++) {
      z = z + x[i] / (1.0 * n);
    }
    b[0] = 1.0;
    d1 = 1.0 * n;
    p = 0.0;
    c = 0.0;
    for (i = 0; i <= n - 1; i++) {
      p = p + (x[i] - z);
      c = c + y[i];
    }
    c = c / d1;
    p = p / d1;
    a[0] = c * b[0];
    if (m > 1) {
      t[1] = 1.0;
      t[0] = -p;
      d2 = 0.0;
      c = 0.0;
      g = 0.0;
      for (i = 0; i <= n - 1; i++) {
        q = x[i] - z - p;
        d2 = d2 + q * q;
        c = c + y[i] * q;
        g = g + (x[i] - z) * q * q;
      }
      c = c / d2;
      p = g / d2;
      q = d2 / d1;
      d1 = d2;
      a[1] = c * t[1];
      a[0] = c * t[0] + a[0];
    }
    for (j = 2; j <= m - 1; j++) {
      s[j] = t[j - 1];
      s[j - 1] = -p * t[j - 1] + t[j - 2];
      if (j >= 3)
        for (k = j - 2; k >= 1; k--) {
          s[k] = -p * t[k] + t[k - 1] - q * b[k];
        }
      s[0] = -p * t[0] - q * b[0];
      d2 = 0.0;
      c = 0.0;
      g = 0.0;
      for (i = 0; i <= n - 1; i++) {
        q = s[j];
        for (k = j - 1; k >= 0; k--) {
          q = q * (x[i] - z) + s[k];
        }
        d2 = d2 + q * q;
        c = c + y[i] * q;
        g = g + (x[i] - z) * q * q;
      }
      c = c / d2;
      p = g / d2;
      q = d2 / d1;
      d1 = d2;
      a[j] = c * s[j];
      t[j] = s[j];
      for (k = j - 1; k >= 0; k--) {
        a[k] = c * s[k] + a[k];
        b[k] = t[k];
        t[k] = s[k];
      }
    }
    dt[0] = 0.0;
    dt[1] = 0.0;
    dt[2] = 0.0;
    for (i = 0; i <= n - 1; i++) {
      q = a[m - 1];
      for (k = m - 2; k >= 0; k--) {
        q = a[k] + q * (x[i] - z);
      }
      p = q - y[i];
      if (Math.abs(p) > dt[2]) {
        dt[2] = Math.abs(p);
      }
      dt[0] = dt[0] + p * p;
      dt[1] = dt[1] + Math.abs(p);
    }
    return a;
  }

  /**
   * 对X轴数据节点求平均值
   * @param x 存储X轴节点的数组
   * @return number
   */
  static average(x) {
    if (!x || x.length === 0) {
      return 0;
    }
    const sum = x.reduce((p, n) => p + n, 0);
    return sum / x.length;
  }

  /**
   * 由X值获得Y值
   * @param x 当前X轴输入值
   * @param xAvg X的平均值
   * @param a 存储多项式系数的数组
   * @param m 存储多项式的最高次数的数组
   */
  static ff(x, xAvg, a, m) {
    let y = 0;
    let l = 0;
    for (let i = 0; i < m; i++) {
      l = a[0];
      if (i > 0) {
        y += a[i] * Math.pow((x - xAvg), i);
      }
    }
    return (y + l);
  }

  f(x) {
    return PolyFit.ff(x, this.xAvg, this.poly, this.m);
  }

  result() {
    return [this.xAvg, this.poly, this.m];
  }
}

export default PolyFit;