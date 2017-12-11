export const MERCATOR_K = 20037508.34;
export const MERCATOR_ASPECT = 0.9;

class Projection {

  static lngLat2Mercator([ lng, lat ]) {
    const x = lng * MERCATOR_K / 180;
    let y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    y = y * MERCATOR_K / 180;

    return [ x, y ];
  }
}

export default Projection;
