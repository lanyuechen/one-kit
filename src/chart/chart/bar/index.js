import React, { Component } from 'react';
import _ from 'lodash';

import Board from '../../board';
import Bar from '../../components/bar';
import Coordinate from '../../coordinate';

class BarChart extends Component {
  static defaultProps = {
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
    series: [{
      name: '当期值',
      data: [
        [0, 14],
        [1, 22]
      ]
    }]
  };

  constructor(props) {
    super(props);
    this.coord = new Coordinate({
      padding: props.padding
    });
  }

  render() {
    const { series, padding } = this.props;

    return (
      <Board padding={padding}>
        <Bar series={series} coord={this.coord} />
      </Board>
    )
  }
}

export default BarChart;