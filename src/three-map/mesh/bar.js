import * as THREE from 'three';

class Bar extends THREE.Mesh {
  constructor({ width, height, depth, material, x, y, h }) {
    const geometry = new THREE.CubeGeometry(width, height, depth, 1, 1, 1);
    super(geometry, material);
    this.position.set(x, y, h);
  }
}

export default Bar;
