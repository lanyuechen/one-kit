import Lazy from 'lib/lazy';
import { geoRange } from './geo-range';
import Projection, { MERCATOR_K, MERCATOR_ASPECT } from './projection';

class Coordinate extends Lazy {
  /**
   * 构造函数
   * @param params object 参数对象
   *   width 视口宽度
   *   height 视口高度
   *   geoJson 地图数据
   *   range 地图区域
   *   center 地图中心
   */
  constructor(params) {
    super(params);

    !this.range && this.setFunc('range', geoRange(params.geoJson));
    !this.center && this.setFunc('center', [
      (this._range[0][0] + this._range[1][0]) / 2,
      (this._range[0][1] + this._range[1][1]) / 2
    ]);
  }

  toXYZ([ lng, lat, h]) {
    const [ x, y ] = Projection.lngLat2Mercator([ lng, lat ]);
    const [ c0, c1 ] = Projection.lngLat2Mercator(this.center());

    const kx = (c0 + MERCATOR_K) / (MERCATOR_K * 2);
    const ky = (c1 + MERCATOR_K) / (MERCATOR_K * 2);
    const len = Math.min(this.width(), this.height());

    const l = ((x + MERCATOR_K) / (MERCATOR_K * 2) - kx) * len;
    const t = ((y + MERCATOR_K) / (MERCATOR_K * 2) - ky) * len * MERCATOR_ASPECT;

    return [ l, t, h ];
  }
}

export default Coordinate;
