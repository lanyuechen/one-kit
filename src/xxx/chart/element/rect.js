import React, { Component } from 'react';

class Rect extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { x, y, width, height } = this.props.rect;

    return (
      <rect x={x} y={y} width={width} height={height} />
    )
  }
}

export default Rect;