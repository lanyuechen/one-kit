import * as THREE from 'three';
import Lazy from 'lib/lazy';

class GeoParser extends Lazy {
  constructor(params) {
    super(params);
  }

  toShape() {
    const shapes = [];

    this.coordinate().geoJson().features.map(d => {
      switch(d.geometry && d.geometry.type) {
        case 'Polygon':
          shapes.push(...this.polygon2Shape(d.geometry.coordinates));
          break;
        case 'MultiPolygon':
          shapes.push(...this.multiPolygon2Shape(d.geometry.coordinates));
          break;
        default:
      }
    });

    return shapes;
  }

  polygon2Shape(coordinates) {
    let shapes = [], points = [];
    coordinates.map(d => {
      d.map(dd => {
        const [ lng, lat ] = this.coordinate().toXYZ(dd);
        const vector2 = new THREE.Vector2(lng, lat);
        points.push(vector2)
      });
      const shape = new THREE.Shape(points);
      shapes.push(shape);
      points = [];
    });
    return shapes;
  }

  multiPolygon2Shape(coordinates) {
    let shapes = [];
    coordinates.map(d => {
      shapes.push(...this.polygon2Shape(d));
    });
    return shapes;
  }
}

export default GeoParser;
