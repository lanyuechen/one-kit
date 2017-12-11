

export default class Curve {
  constructor(params) {
    const { start, end } = params;
    this.curve = new THREE.SplineCurve([
      new THREE.Vector2(start[0], start[1]),
      new THREE.Vector2(end[0], end[1])
    ])
  }
}
