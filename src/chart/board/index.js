import React, { Component } from 'react';
import Coordinate from '../coordinate';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { padding } = this.props;
    return (
      <g transform={`translate(${padding.left}, ${padding.top})`}>
        {this.props.children}
      </g>
    )
  }
}

export default Board;