/**
 * 三角形变换
 * p = k1 * A + k2 * B + k3 * C, k1 + k2 + k3 = 1
 * 三角形ABC,对应点坐标分别为p1, p2, p3
 */

class Triangle {
  constructor(source, target) {
    this.source = source;
    this.target = target;
    this.s = Triangle.square(source[0], source[1], source[2]);
  }

  /**
   * 返回线段长度的平方
   * @param p1 点1
   * @param p2 点2
   * @returns {number}
   */
  static len2(p1, p2) {
    return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
  }

  /**
   * 计算三角形面积
   * @param p1 点1
   * @param p2 点2
   * @param p3 点3
   * @returns {number}
   */
  static square(p1, p2, p3) {
    const c2 = Triangle.len2(p1, p2);   //AB边长的平方
    const b2 = Triangle.len2(p1, p3);   //AC边长的平方
    const a2 = Triangle.len2(p2, p3);   //BC边长的平方
    const b = Math.sqrt(b2);
    const c = Math.sqrt(c2);
    const cosA = (b2 + c2 - a2) / (2 * b * c);
    const sinA = Math.sqrt(1 - cosA * cosA);
    return b * c * sinA / 2;
  }

  k1(p) {
    return Triangle.square(this.source[1], this.source[2], p) / this.s;
  }

  k2(p) {
    return Triangle.square(this.source[0], this.source[2], p) / this.s;
  }

  k3(p) {
    return Triangle.square(this.source[0], this.source[1], p) / this.s;
  }

  parse(p) {
    const [ p1, p2, p3 ] = this.target;
    const k = [
      this.k1(p),
      this.k2(p),
      this.k3(p)
    ];
    return {
      in: k[0] + k[1] + k[2] <= 1.001,
      k,
      result: [
        k[0] * p1[0] + k[1] * p2[0] + k[2] * p3[0],
        k[0] * p1[1] + k[1] * p2[1] + k[2] * p3[1]
      ]
    }
  }
}

export default Triangle;