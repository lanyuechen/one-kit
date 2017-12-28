import * as d3 from 'd3';

const PADDING_INNER = 0;
const PADDING_OUTER = 0;

class Coordinate {
  constructor(option, width, height) {
    const { type, x, y, paddingInner, paddingOuter } = option;

    this.width = width;
    this.height = height;
    this.paddingInner = paddingInner || PADDING_INNER;
    this.paddingOuter = paddingOuter || PADDING_OUTER;
    this.xScale = this.scale(x, [0, width]);
    this.yScale = this.scale(y, [height, 0]);
  }

  scale(d, range) {
    if (d.type === 'category') {
      return d3.scaleBand()
        .domain(d.data.map((dd, i) => i))
        .range(range)
        .paddingInner(this.paddingInner)
        .paddingOuter(this.paddingOuter);
    } else if (d.type === 'value') {
      return d3.scaleLinear()
        .domain([d.min, d.max])
        .range(range);
    }
  }

  x(v) {
    return this.xScale(v);
  }

  y(v) {
    return this.yScale(v);
  }

  bandWidth() {
    return this.xScale.bandwidth();
  }
}

export default Coordinate;