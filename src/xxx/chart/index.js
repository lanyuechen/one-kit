import React, { Component } from 'react';
import * as d3 from 'd3';

import Coordinate from './coordinate';
import Ele from './element';
import Brush from './components/brush';

const BRUSH_HEIGHT = 20;

class Chart extends Component {
  constructor(props) {
    super(props);

    const { option, rect } = props;

    if (option.brush) {
      this.scale = d3.scaleLinear().domain([0, rect.width]).range([0, rect.width]);
      this.brushScale = this.scale.copy();
    }
  }

  handleBrushed = (s) => {
    const brush = this.refs.brush;
    if (!brush) {
      return;
    }

    s = s || this.brushScale.range();
    this.scale.domain(s.map(this.brushScale.invert, this.brushScale));

    this.forceUpdate();

    //d3.select(this.refs.rect).call(
    //  brush.zoom.transform,
    //  d3.zoomIdentity
    //    .scale(width / (s[1] - s[0]))
    //    .translate(-s[0], 0)
    //);
  };

  handleZoomed = (t) => {
    //this.scale.domain(t.rescaleX(this.brushScale).domain());
    //context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
  };

  render() {
    let { option, rect: { x, y, width, height } } = this.props;

    let x2 = x, y2 = y;
    if (option.brush) {
      x2 = this.scale(0);
      width = this.scale(width) - x2;
      height = height - BRUSH_HEIGHT;
    } else {
      x2 = 0;
      y2 = 0;
    }

    const coord = new Coordinate(option.coordinate, Math.abs(width), Math.abs(height));

    return (
      <g transform={`translate(${x}, ${y})`}>
        <g transform={`translate(${x2}, ${y2})`}>
          {option.children && option.children.map((d, i) => {
            let rect = {
              x: coord.x(i),
              y: coord.y(100),
              width: coord.bandWidth(),
              height: coord.y(0) - coord.y(100)
            };

            if (d.type === 'chart') {
              return (
                <Chart
                  key={i}
                  option={d}
                  rect={rect}
                />
              );
            }
            rect = {...rect, y: coord.y(d), height: coord.y(0) - coord.y(d)};
            return (
              <Ele
                key={i}
                rect={rect}
                option={option}
                data={d}
              />
            );
          })}

        </g>

        {option.brush && (
          <g transform={`translate(0, ${height})`}>
            <Brush
              ref="brush"
              width={width}
              height={BRUSH_HEIGHT}
              onBrushed={this.handleBrushed}
              onZoomed={this.handleZoomed}
            />
          </g>
        )}
      </g>
    );
  }
}

export default Chart;