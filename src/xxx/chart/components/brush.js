import React, { Component } from 'react';
import * as d3 from 'd3';

class Brush extends Component {
  constructor(props) {
    super(props);

    const { width, height } = this.props;

    this.brush = d3.brushX()
      .extent([[0, 0], [width, height]])
      .on('brush end', this.brushed);

    this.zoom = d3.zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on("zoom", this.zoomed);
  }

  componentDidMount() {
    const { width } = this.props;
    d3.select(this.refs.brush)
      .call(this.brush)
      .call(this.brush.move, [0, width]);
  }

  brushed = () => {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") {   // ignore brush-by-zoom
      return;
    }
    const { onBrushed } = this.props;

    const s = d3.event.selection;

    onBrushed && onBrushed(s);
  };

  zoomed = () => {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") {   // ignore zoom-by-brush
      return;
    }
    const { onZoomed } = this.props;

    const t = d3.event.transform;

    onZoomed && onZoomed(t);
  };

  render() {
    return (
      <g ref="brush">

      </g>
    )
  }
}

export default Brush;