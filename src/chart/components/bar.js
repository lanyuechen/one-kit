import React, { Component } from 'react';

import { range } from '../lib/common';
import Rect from './rect';

class Bar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { series, coord } = this.props;

    const gap = 0.5;

    const seriesLength = series.length;
    const dataLength = _.get(series, [0, 'data', 'length'], 0);
    const bandWidth = 580 / dataLength;
    const barWidth = bandWidth / seriesLength;
    const gapWidth = barWidth * gap;

    return (
      <g>
        {range(dataLength).map((d, i) => (
          <g key={i}>
            {range(seriesLength).map((dd, j) => (
              <Rect
                key={j}
                x={bandWidth * i + barWidth * j + gapWidth / 2}
                y={0}
                width={barWidth - gapWidth}
                height={200}
              />
            ))}
          </g>
        ))}
      </g>
    )
  }
}

export default Bar;