import * as THREE from 'three';

class Cylinder extends THREE.Mesh {
  constructor({ radius, height, material, x, y, h }) {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    super(geometry, material);
    this.position.set(x, y, h);
  }
}

export default Cylinder;
