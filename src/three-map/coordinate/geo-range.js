import * as THREE from 'three';

export function geoRange(geoJson) {
  const ranges = [];

  geoJson.features.map(d => {
    switch(d.geometry && d.geometry.type) {
      case 'Polygon':
        ranges.push(...polygonRange(d.geometry.coordinates));
        break;
      case 'MultiPolygon':
        ranges.push(...multiPolygonRange(d.geometry.coordinates));
        break;
      default:
    }
  });

  return getRange(ranges);
}

export function polygonRange(coordinates) {
  const ranges = [];
  coordinates.map(d => {
    ranges.push(...getRange(d));
  });
  return getRange(ranges);
}

export function multiPolygonRange(coordinates) {
  let ranges = [];
  coordinates.map(d => {
    ranges.push(...polygonRange(d));
  });
  return ranges;
}

function getRange(points) {
  return points.reduce((p, n) => {
    p[0][0] = Math.min(p[0][0], n[0]);
    p[0][1] = Math.min(p[0][1], n[1]);
    p[1][0] = Math.max(p[1][0], n[0]);
    p[1][1] = Math.max(p[1][1], n[1]);
    return p;
  }, [[180, 90], [-180, -90]]);
}
