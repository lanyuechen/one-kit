import React, { Component } from 'react';

class Rect extends Component {
  static defaultProps = {
    fill: '#000'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { x, y, width, height, fill } = this.props;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
      />
    )
  }
}

export default Rect;