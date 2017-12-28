import React, { Component } from 'react';
import * as d3 from 'd3';

class XAxis extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { option, scale } = this.props;
    this.axis = d3.axisBottom(scale)
      .tickFormat((d, i) => {
        return option.x.data[i];
      });
    d3.select(this.refs.axis)
      .call(this.axis);
  }

  componentDidUpdate() {
    this.updateAxis();
  }

  updateAxis = () => {
    const { scale } = this.props;
    this.axis.scale(scale);
    d3.select(this.refs.axis)
      .call(this.axis);
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.scale !== this.props.scale) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <g ref="axis">

      </g>
    )
  }
}

export default XAxis;